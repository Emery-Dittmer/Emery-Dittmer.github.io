import Image from 'next/image'

import Andrea from '@/assets/recomentations/Adrea.jpg';
import Max from '@/assets/recomentations/Max.jpg';
import Chris from '@/assets/recomentations/Chris.jpg';
import Alex from '@/assets/recomentations/Alex.jpg';
import ylfa from '@/assets/recomentations/ylfa.jpg';
import { Locale } from '@/lib/i18n';

export default function Testimonials({ locale = 'en' }: { locale?: Locale }) {
  const copy = {
    en: {
      title: "Don't take my word for it",
      intro: 'Some of my colleauges have some great feedback',
      items: [
        {
          text:
            'I had the opportunity to work with Emery for the past 10 months. Over that time he proved to be a brilliant individual, a great leader and colleague. Emery has excellent organization, communication and analytical skills. I enjoyed working with Emery and learnt a great deal from him. I believe his go-getter attitude and genuine support for his colleagues brings out the best in everyone on his team resulting in high quality end results. Emery is highly skilled and excels at everything he does and I fully recommend him no matter the position he chooses. He will be a valued asset to any team he works with. ',
          name: 'Adrea Young',
          link: 'https://www.linkedin.com/in/andreayoung11/',
        },
        {
          text:
            'Emery is a collaborative leader who took on the role with diversity and inclusion in mind. I worked with Emery as he led one of the most engaging RBC Connect teams in the history of the program. Emery was able to bring out the best in his teammates by encouraging them to share their voices and listen to other voices. His leadership nudged the entire team to take on leadership roles by leading meetings, setting agendas, and building presentations. I would recommend Emery to any team!',
          name: 'Max Hum',
          link: 'https://www.linkedin.com/in/maxhum/',
        },
        {
          text:
            'Emery is an organized leader who cares about the members reporting under him. His facilitating and communication skills created a cohesive and supportive team, keeping us on track with meetings and deliverables for the Connect Community. His abilities to facilitate meetings encouraged everyone to participate and provide feedback, with a perfect balance of taking lead on the topic at hand to create discussions while never dominating a conversation to give everyone a chance to be heard.\nEmery portrays a professional and calm demeanor, which was beneficial when the team experienced conflict. He resolved any conflict by being transparent with everyone on his reason of thinking, which always considered all perspectives for a fair conclusion. \nI would gladly work with Emery again because of the proactive and positive attitude he brings to any team. ',
          name: 'Chris Cole',
          link: 'https://www.linkedin.com/in/chris-cole3/',
        },
        {
          text:
            'In my time working with Emery, I observed a drive to elevate internal processes and to increase the efficiencies of the supply chain through predictive analytics and database mining. Enthusiastic and always looking to learn more to make a difference at Iridian, Emery proved valuable in establishing strong standards, data analysis and leadership in our supply chain ',
          name: 'Alex Miles',
          link: 'https://www.linkedin.com/in/alex-m-miles/',
        },
        {
          text:
            'I had the opportunity to work with Emery on the project with Reserva Conchal. Emery demonstrated exceptional leadership and data strategy expertise during our time working together. Working in the same team with Emery, I witnessed how Emery led efficient communication and fostered collaboration. He transformed the needs of our client and tailored a brilliant data strategy from tactical data manipulation to extracting valuable insights. Emery is undoubtedly a dedicated professional and a wonderful person to work with',
          name: 'Ying-Fang Liang',
          link: 'https://www.linkedin.com/in/ying-fang-liang/',
        },
      ],
    },
    fr: {
      title: 'Ne me croyez pas sur parole',
      intro: 'Certains de mes collègues ont d’excellents retours',
      items: [
        {
          text:
            'J’ai eu l’occasion de travailler avec Emery pendant 10 mois. Durant cette période, il s’est révélé être une personne brillante, un excellent leader et collègue. Emery possède d’excellentes compétences d’organisation, de communication et d’analyse. J’ai apprécié travailler avec lui et j’ai beaucoup appris de lui. Son attitude proactive et son soutien sincère envers ses collègues permettent à chacun de donner le meilleur de lui-même, ce qui se traduit par des résultats de grande qualité. Emery est très compétent et excelle dans tout ce qu’il entreprend et je le recommande vivement, quel que soit le poste qu’il choisit. Il sera un atout précieux pour toute équipe.',
          name: 'Adrea Young',
          link: 'https://www.linkedin.com/in/andreayoung11/',
        },
        {
          text:
            'Emery est un leader collaboratif qui a pris son rôle à cœur avec la diversité et l’inclusion à l’esprit. J’ai travaillé avec Emery lorsqu’il a dirigé l’une des équipes RBC Connect les plus engagées de l’histoire du programme. Emery a su faire ressortir le meilleur de ses coéquipiers en les encourageant à s’exprimer et à écouter les autres. Son leadership a poussé toute l’équipe à assumer des rôles de leadership en animant des réunions, en définissant des ordres du jour et en construisant des présentations. Je recommanderais Emery à n’importe quelle équipe !',
          name: 'Max Hum',
          link: 'https://www.linkedin.com/in/maxhum/',
        },
        {
          text:
            'Pendant notre collaboration, j’ai observé qu’Emery est un leader organisé qui se soucie des membres qui lui sont rattachés. Ses compétences d’animation et de communication ont créé une équipe cohésive et solidaire, nous permettant de rester sur la bonne voie pour les réunions et les livrables de la communauté Connect. Sa capacité à faciliter les réunions a encouragé tout le monde à participer et à donner du feedback, avec un équilibre parfait entre la prise de leadership sur le sujet et l’écoute, sans jamais monopoliser la conversation afin de donner à chacun la possibilité de s’exprimer.\nEmery adopte une attitude professionnelle et calme, ce qui a été bénéfique lorsque l’équipe a connu des tensions. Il a résolu les conflits en étant transparent sur ses raisonnements, en tenant compte de toutes les perspectives pour parvenir à une conclusion équitable.\nJe travaillerais avec Emery à nouveau avec plaisir pour son attitude proactive et positive qu’il apporte à toute équipe.',
          name: 'Chris Cole',
          link: 'https://www.linkedin.com/in/chris-cole3/',
        },
        {
          text:
            'Pendant la période où j’ai travaillé avec Emery, j’ai observé une volonté d’améliorer les processus internes et d’accroître l’efficacité de la chaîne d’approvisionnement grâce à l’analyse prédictive et au data mining. Enthousiaste et toujours désireux d’en apprendre davantage pour faire la différence chez Iridian, Emery s’est avéré précieux pour établir des standards solides, l’analyse de données et le leadership au sein de notre chaîne d’approvisionnement.',
          name: 'Alex Miles',
          link: 'https://www.linkedin.com/in/alex-m-miles/',
        },
        {
          text:
            'J’ai eu l’occasion de travailler avec Emery sur le projet avec Reserva Conchal. Emery a démontré un leadership exceptionnel et une expertise en stratégie data. En travaillant dans la même équipe, j’ai pu constater comment il a mené une communication efficace et favorisé la collaboration. Il a transformé les besoins de notre client et élaboré une brillante stratégie data, de la manipulation tactique des données jusqu’à l’extraction d’insights précieux. Emery est sans aucun doute un professionnel dévoué et une personne formidable avec qui travailler.',
          name: 'Ying-Fang Liang',
          link: 'https://www.linkedin.com/in/ying-fang-liang/',
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
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h2 className="h2 mb-4">{t.title}</h2>
            <p className="text-xl text-gray-400">{t.intro}</p>
          </div>

          {/* Testimonials */}
          <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-2 lg:gap-6 items-start lg:max-w-none">

            {/* 1st testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <Image className="rounded-full" src={Andrea} width={48} height={48} alt="Testimonial 01" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">{t.items[0].text}</blockquote>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <cite className="text-gray-200 not-italic">{t.items[0].name}</cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href={t.items[0].link}>LinkedIn</a>
              </div>
            </div>

            {/* 2nd testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="200">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <Image className="rounded-full" src={Max} width={48} height={48} alt="Testimonial 02" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">{t.items[1].text}</blockquote>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <cite className="text-gray-200 not-italic">{t.items[1].name}</cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href={t.items[1].link}>LinkedIn</a>
              </div>
            </div>

            {/* 3rd testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <Image className="rounded-full" src={Chris} width={48} height={48} alt="Testimonial 03" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-lg text-gray-400 grow whitespace-pre-line">{t.items[2].text}</blockquote>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <cite className="text-gray-200 not-italic">{t.items[2].name}</cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href={t.items[2].link}>LinkedIn</a>
              </div>
            </div>

            {/* 4th testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <Image className="rounded-full" src={Alex} width={48} height={48} alt="Testimonial 03" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">{t.items[3].text}</blockquote>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <cite className="text-gray-200 not-italic">{t.items[3].name}</cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href={t.items[3].link}>LinkedIn</a>
              </div>
            </div>


            {/* 5th testimonial */}
            <div className="flex flex-col h-full p-6 bg-gray-800" data-aos="fade-up" data-aos-delay="400">
              <div>
                <div className="relative inline-flex flex-col mb-4">
                  <Image className="rounded-full" src={ylfa} width={48} height={48} alt="Testimonial 03" />
                  <svg className="absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600" viewBox="0 0 24 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z" />
                  </svg>
                </div>
              </div>
              <blockquote className="text-lg text-gray-400 grow">{t.items[4].text}</blockquote>
              <div className="text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700">
                <cite className="text-gray-200 not-italic">{t.items[4].name}</cite> - <a className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href={t.items[4].link}>LinkedIn</a>
              </div>
            </div>



          </div>

        </div>
      </div>
    </section>
  )
}
