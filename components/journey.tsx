import Image from 'next/image'

import FeatImage01 from '@/public/images/SF.jpeg'
import FeatImage02 from '@/public/images/Montreal.jpg'
import FeatImage03 from '@/public/images/Ottawa.jpg' 
import FeatImage04 from '@/public/images/Montreal2.jpg' 
import { Locale } from '@/lib/i18n'

export default function Zigzag({ locale = 'en' }: { locale?: Locale }) {
  const copy = {
    en: {
      pill: 'Reach goals that matter',
      title: "Emery's Journey",
      intro: 'My journey from california to data science is not a conventional one',
      items: [
        {
          tag: 'Early Growth',
          title: '1995 - Starting in California',
          body:
            'I grew up in california, surfing the waves, working and learning French',
          bullets: [
            'Reach adulthood',
            'Learn determination, patience & an analytical mindset',
            'Find a passion in surfing',
            'Become a waiter and learn',
            'Obtain French & English high schhol diploma',
          ],
        },
        {
          tag: 'Discover',
          title: '2015 - Montreal & McGill',
          body:
            'After several rounds of applications I decided to come to McGill University in Montreal for a degree in Bio-organic Chemistry.',
          bullets: [
            'Discover a new country',
            ' Discover a pasion for data & analytics',
            'Fall in love',
          ],
        },
        {
          tag: 'Professional Growth ',
          title: '2019 - Moving to Ottawa',
          body:
            'I moved to Ottawa to start a new life in Canada. Chemistry was not my calling but many were looking for oppotunities with optimization and analytics.',
          bullets: [
            'Become supply chain Manager',
            'Survive the global pandemic',
            'Become a data consultant at PwC',
          ],
        },
        {
          tag: 'New Skills',
          title: '2022 - Montreal & McGill (Again)',
          body:
            'After working I decided to augment my skills to learn and grow within data & analytics.',
          bullets: [
            'Complete a Master of Management Analytics',
            'Complete a professional capstone project',
            'Pivot professional career',
          ],
        },
      ],
    },
    fr: {
      pill: 'Atteindre des objectifs qui comptent',
      title: "Le parcours d’Emery",
      intro: 'Mon parcours de la Californie à la science des données n’est pas conventionnel.',
      items: [
        {
          tag: 'Premiers pas',
          title: '1995 - Débuts en Californie',
          body:
            'J’ai grandi en Californie, à surfer, travailler et apprendre le français.',
          bullets: [
            'Atteindre l’âge adulte',
            'Apprendre la détermination, la patience et un esprit analytique',
            'Découvrir une passion pour le surf',
            'Devenir serveur et apprendre',
            'Obtenir un diplôme de fin d’études secondaires en français et en anglais',
          ],
        },
        {
          tag: 'Découvrir',
          title: '2015 - Montréal et McGill',
          body:
            'Après plusieurs séries de candidatures, j’ai choisi l’Université McGill à Montréal pour un diplôme en chimie bio-organique.',
          bullets: [
            'Découvrir un nouveau pays',
            'Découvrir une passion pour la data et l’analytique',
            'Tomber amoureux',
          ],
        },
        {
          tag: 'Épanouissement professionnel',
          title: '2019 - Déménagement à Ottawa',
          body:
            'J’ai déménagé à Ottawa pour commencer une nouvelle vie au Canada. La chimie n’était pas ma vocation, mais de nombreuses opportunités existaient en optimisation et analytique.',
          bullets: [
            'Devenir responsable de la chaîne d’approvisionnement',
            'Traverser la pandémie mondiale',
            'Devenir consultant data chez PwC',
          ],
        },
        {
          tag: 'Nouvelles compétences',
          title: '2022 - Montréal et McGill (à nouveau)',
          body:
            'Après avoir travaillé, j’ai décidé d’élargir mes compétences pour apprendre et évoluer en data et analytique.',
          bullets: [
            'Obtenir un Master en Management Analytics',
            'Réaliser un projet de fin d’études professionnel',
            'Réorienter ma carrière',
          ],
        },
      ],
    },
  }
  const t = copy[locale]

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4">{t.pill}</div>
            <h1 className="h2 mb-4">{t.title}</h1>
            <p className="text-xl text-gray-400">{t.intro}</p>
          </div>

          {/* Items */}
          <div className="grid gap-20">

            {/* 1st item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <Image className="max-w-full mx-auto md:max-w-none h-auto" src={FeatImage01} width={540} height={405} alt="Features 01" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">{t.items[0].tag}</div>
                  <h3 className="h3 mb-3">{t.items[0].title}</h3>
                  <p className="text-xl text-gray-400 mb-4">{t.items[0].body}</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[0].bullets[0]}</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[0].bullets[1]}</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[0].bullets[2]}</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[0].bullets[3]}</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[0].bullets[4]}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                <Image className="max-w-full mx-auto md:max-w-none h-auto" src={FeatImage02} width={540} height={405} alt="Features 02" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">{t.items[1].tag}</div>
                  <h3 className="h3 mb-3">{t.items[1].title}</h3>
                  <p className="text-xl text-gray-400 mb-4">{t.items[1].body}</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[1].bullets[0]}</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[1].bullets[1]}</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[1].bullets[2]}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <Image className="max-w-full mx-auto md:max-w-none h-auto" src={FeatImage03} width={540} height={405} alt="Features 03" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">{t.items[2].tag}</div>
                  <h3 className="h3 mb-3">{t.items[2].title}</h3>
                  <p className="text-xl text-gray-400 mb-4">{t.items[2].body}</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[2].bullets[0]}</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[2].bullets[1]}</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[2].bullets[2]}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>


            {/* 4th item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                <Image className="max-w-full mx-auto md:max-w-none h-auto" src={FeatImage04} width={540} height={405} alt="Features 02" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">{t.items[3].tag}</div>
                  <h3 className="h3 mb-3">{t.items[3].title}</h3>
                  <p className="text-xl text-gray-400 mb-4">{t.items[3].body}</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[3].bullets[0]}</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[3].bullets[1]}</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>{t.items[3].bullets[2]}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
