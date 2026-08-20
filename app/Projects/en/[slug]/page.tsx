import { notFound } from 'next/navigation'
import { projectsConfig } from '@/lib/projectsConfig'
import { getProjectImages } from '@/lib/getProjectImages'
import ProjectDetail from '@/components/ProjectDetail'

export function generateStaticParams() {
  return projectsConfig.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsConfig.find((p) => p.id === slug)
  if (!project) return {}
  return {
    title: `${project.title.en} — Emery Dittmer`,
    description: project.description.en,
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projectsConfig.find((p) => p.id === slug)
  if (!project) notFound()

  const { cover, gallery } = getProjectImages(slug)

  return (
    <ProjectDetail
      project={project}
      locale="en"
      coverImage={cover}
      galleryImages={gallery}
    />
  )
}
