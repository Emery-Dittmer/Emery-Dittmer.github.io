import { notFound } from 'next/navigation'
import { projectsConfig } from '@/lib/projectsConfig'
import { getProjectImages } from '@/lib/getProjectImages'
import ProjectDetail from '@/components/ProjectDetail'

export function generateStaticParams() {
  return projectsConfig.map((p) => ({ slug: p.id }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projectsConfig.find((p) => p.id === params.slug)
  if (!project) return {}
  return {
    title: `${project.title.en} — Emery Dittmer`,
    description: project.description.en,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsConfig.find((p) => p.id === params.slug)
  if (!project) notFound()

  const { cover, gallery } = getProjectImages(params.slug)

  return (
    <ProjectDetail
      project={project}
      locale="en"
      coverImage={cover}
      galleryImages={gallery}
    />
  )
}
