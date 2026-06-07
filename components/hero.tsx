'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image';
import EmeryHeadshot from '@/assets/images/emery_headshot_2026.jpg';
import { Github, Project, Resume, Linkedin } from '@/assets/icons/';
import { Locale } from '@/lib/i18n';
import WindCanvas from '@/components/wind-canvas';

const ROLES = {
  en: ['Product Owner', 'Project Manager', 'Data Scientist', 'Technical Lead', 'Delivery Driver'],
  fr: ['Product Owner', 'Chef de projet', 'Data Scientist', 'Lead technique', 'Pilote de livraison'],
}

export default function Hero({ locale = 'en' }: { locale?: Locale }) {
  const roles = ROLES[locale]
  const [roleIdx, setRoleIdx] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cycle = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIdx(i => (i + 1) % roles.length)
        setVisible(true)
      }, 350)
    }, 2600)
    return () => clearInterval(cycle)
  }, [roles.length])

  const copy = {
    en: {
      heading: "Hello, I'm Emery",
      intro: "I'm a",
      body:
        'Equal parts Data Scientist and Project Manager — I build predictive models, lead data-driven teams, and turn complex data into decisions that actually ship.',
      projects: 'Projects',
      resume: 'Resume',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
    fr: {
      heading: 'Bonjour, je suis Emery',
      intro: 'Je suis',
      body:
        'Data Scientist et chef de projet à parts égales — je construis des modèles prédictifs, dirige des équipes data et transforme des données complexes en décisions qui se concrétisent.',
      projects: 'Projets',
      resume: 'CV',
      github: 'GitHub',
      linkedin: 'LinkedIn',
    },
  }
  const t = copy[locale]

  return (
    <section className="relative overflow-hidden">
      <WindCanvas particleCount={26} speed={1.1} maxOpacity={0.12} lifeSeconds={10} />
      <div className="max-w-6xl mx-auto pb-16 px-4 md:pb-16 relative wrapper">
        {/* Wrap the entire content in a div with a class */}
        <div className="flex flex-col md:flex-row items-center justify-center mt-16">
          {/* Headshot of Emery */}
          <div className="flex items-center justify-center md:mr-8 mb-8 md:mb-0" data-aos="fade-up">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={EmeryHeadshot}
                alt="Headshot of Emery"
                fill
                className="object-cover object-[center_20%] scale-125"
              />
            </div>
          </div>

          {/* Text */}
          <div className="max-w-md md:w-1/2 text-center md:text-left">
            <h1 className="h1 mb-2" data-aos="fade-up">
              {t.heading}
            </h1>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-6 text-base text-gray-400" data-aos="fade-up" data-aos-delay="100">
              <span>{t.intro}</span>
              <span
                className="inline-block min-w-[160px] font-semibold text-purple-400 transition-opacity duration-300"
                style={{ opacity: visible ? 1 : 0 }}
              >
                {roles[roleIdx]}
              </span>
            </div>
            <p className="text-xl text-gray-400 mb-8" data-aos="fade-up" data-aos-delay="200">
              {t.body}
            </p>
            <div className="max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center" data-aos="fade-up" data-aos-delay="400">
              <div className="grid grid-cols-2 gap-4">
                <a className="btn text-white bg-purple-600 hover:bg-purple-700 w-full sm:w-auto" href={`/Projects/${locale}`}>
                  <div className="flex items-center space-x-2">
                    <Project/>
                    <span className="ml-2">{t.projects}</span>
                  </div>
                </a>
                <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto" href="https://github.com/Emery-Dittmer/Emery-Dittmer.github.io/blob/main/assets/docs/Dittmer%20Emery%20Resume.pdf" download="Dittmer Emery Resume.pdf">
                  <div className="flex items-center space-x-2">
                    <Resume/>
                    <span className="ml-2">{t.resume}</span>
                  </div>
                </a>
                <a className="btn text-white bg-gray-700 hover:bg-gray-800 w-full sm:w-auto" href="https://github.com/Emery-Dittmer" download="Dittmer Emery Resume.pdf">
                  <div className="flex items-center space-x-2">
                    <Github/>
                    <span className="ml-2">{t.github}</span>
                  </div>
                </a>
                <a className="btn text-white bg-purple-600 hover:bg-purple-700 w-full sm:w-auto" href="https://www.linkedin.com/in/emery-dittmer/">
                  <div className="flex items-center space-x-2">
                    <Linkedin/>
                    <span className="ml-2">{t.linkedin}</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* End of wrapping div */}
      </div>
    </section>
  );
}
