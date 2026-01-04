import React from 'react';
import CertificationCard from './CertificationCard'; // Import the CertificationCard component
import Image from "next/image";

import bishops from "@/assets/coolstuff/Bishops.png";
import LFSF from "@/assets/coolstuff/LFSF.jpg";
import alteryx from "@/assets/coolstuff/Alteryx.png";
import running from "@/assets/coolstuff/running.png";
import airbnb  from "@/assets/coolstuff/airbnblogo.png";
import bike  from "@/assets/coolstuff/bike.png";
import book  from "@/assets/coolstuff/book.png";
import guitar  from "@/assets/coolstuff/guitar.png";
import data_mangrove from "@/assets/coolstuff/data_mangrove.svg";
import data_sphere from "@/assets/coolstuff/datasphere_lab_logo.jpg";
import { Locale } from '@/lib/i18n';



// import  from "@/assets/coolstuff/";
// import  from "@/assets/coolstuff/";
// import  from "@/assets/coolstuff/";
// import  from "@/assets/coolstuff/";
// import  from "@/assets/coolstuff/";
// import  from "@/assets/coolstuff/";
// import  from "@/assets/coolstuff/";




export default function CoolStuff({
  locale = 'en',
  data,
}: {
  locale?: Locale;
  data?: Array<{
    section: string;
    certification: Array<{
      name: string;
      image: string;
      company: string;
      link: string;
      linktxt: string;
      h: number;
    }>;
  }>;
}) {
  const titleCopy = {
    en: 'Projects',
    fr: 'Projets',
  }
  const title = titleCopy[locale]

  return (
    <>
    <div className="max-w-sm mx-auto grid mx-auto">
    <div className="py-1 md:py-2 border-t border-gray-800"></div></div>
    <h3 className="h2 text-center">{title}</h3>
    <div className="flex items-center justify-center">
      <div className="text-center my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-auto md:grid-cols-1 xl:px-0">
        <div className="certifications max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none">
          {certsByLocale[locale].map((sectionData) => (
            <div className="certifications-section" key={sectionData.section}>
              <h2 className="section-title">{sectionData.section}</h2>
              <div className="certifications-grid grid grid-cols-2 gap-auto max-w-sm">
                {sectionData.certification.map((certification) => (
                  <CertificationCard key={certification.name} {...certification} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}


const certsByLocale = {
  en: [
  // Review and add if needed
  // {
  //     'section': 'Technical',
  //     'certification': [
  //         {'name': ' The Data Science Course 2022: Complete Data Science Bootcamp', 'image': python,'company':'Issued by: Udemy' , 'link': 'https://www.credly.com/users/emery-dittmer/badges'},
  //         {'name': 'Statistics for Data Science and Business Analysis', 'image': mysql,'company':'Issued by: Udemy' , 'link': 'https://www.credly.com/users/emery-dittmer/badges'},   
  //         {'name': 'Data Science and Machine Learning Bootame with R', 'image': rlogo,'company':'Issued by: Udemy' , 'link': 'https://www.credly.com/users/emery-dittmer/badges'},
 
  //     ]
  // },
    {
      'section': 'Keynote / Speaking',
      'certification': [
        {
          'name': 'Speaking Series: Visulization in the modern World',
          'image': data_sphere, // Update with the correct image import
          'company': 'Data Sphere Lab',
          'link': 'https://www.linkedin.com/posts/datasphere-lab_register-here-datasphere-lab-seminar-series-activity-7214609184703582210-hute?',
          'linktxt': 'Link here',
          h: 100,
          year: '2024',
        },
        {
          'name': 'Power Bi Teaching',
          'image': bishops, // Update with the correct image import
          'company': 'Bishops University',
          'link': '',
          'linktxt': '',
          h: 100,
          year: '2023',
        },
        {
          'name': 'Data Mangrove In Costa Rica',
          'image': data_mangrove, // Update with the correct image import
          'company': 'McGill University',
          'link': 'https://observador.cr/inteligencia-artificial-ayudara-a-salvar-monos-de-una-muerte-por-atropello-o-electrocucion/',
          'linktxt': 'Article Here',
          h: 100,
          year: '2023',
        },
        {
          'name': 'History & Civics Guest Lecturer',
          'image': LFSF, // Update with the correct image import
          'company': 'Lycee Francais de San Francisco',
          'link': '',
          'linktxt': '',
          h: 100,
          year: '2020',
        },
        {
          'name': 'Alteryx Q3 User Group Keynote Speaker',
          'image': alteryx, // Update with the correct image import
          'company': 'Alteryx Montreal User Group',
          'link': 'https://www.linkedin.com/feed/update/urn:li:activity:6973765588292616194',
          'linktxt': 'Article Here',
          h: 100,
          year: '2022',
        },
        {
          'name': 'Alteryx Q2 User Group Keynote Speaker',
          'image': alteryx, // Update with the correct image import
          'company': 'Alteryx Toronto User Group',
          'link': '',
          'linktxt': '',
          h: 100,
          year: '2023',
        },
      ]
    },
    {
      'section': 'Sports',
      'certification': [
        {
          'name': 'RBC Race for the Kids',
          'image': running, // Update with the correct image import
          'company': '',
          'link': '',
          'linktxt': '',
          h: 100,
          year: '2020',
        },
      ]
    },
    {
      'section': 'Entrepreneurial Ventures',
      'certification': [
        {
          'name': 'Airbnb Summer Rentals',
          'image': airbnb, // Update with the correct image import
          'company': '',
          'link': '',
          'linktxt': '',
          h: 100,
          year: '2017-18',
        },
        {
          'name': 'Bike Repairs',
          'image': bike, // Update with the correct image import
          'company': 'Self Employed',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 100,
          year: '2015-18',
        }
      ]
    },
    {
      'section': 'Random',
      'certification': [
        {
          'name': 'Self - Teaching Guitar',
          'image': guitar, // Update with the correct image import
          'company': '',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 100,
          year: '',
        },
        {
          'name': 'Reading',
          'image': book, // Update with the correct image import
          'company': '',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 100,
          year: '',
        },
      ]
    },
    // Add more sections and certification data as needed
  ],
  fr: [
    {
      'section': 'Conférences / prises de parole',
      'certification': [
        {
          'name': 'Série de conférences : la visualisation dans le monde moderne',
          'image': data_sphere,
          'company': 'Data Sphere Lab',
          'link': 'https://www.linkedin.com/posts/datasphere-lab_register-here-datasphere-lab-seminar-series-activity-7214609184703582210-hute?',
          'linktxt': 'Lien ici',
          h: 100,
          year: '2024',
        },
        {
          'name': 'Enseignement Power BI',
          'image': bishops,
          'company': 'Bishops University',
          'link': '',
          'linktxt': '',
          h: 100,
          year: '2023',
        },
        {
          'name': 'Mangrove de données au Costa Rica',
          'image': data_mangrove,
          'company': 'McGill University',
          'link': 'https://observador.cr/inteligencia-artificial-ayudara-a-salvar-monos-de-una-muerte-por-atropello-o-electrocucion/',
          'linktxt': 'Article ici',
          h: 100,
          year: '2023',
        },
        {
          'name': 'Conférencier invité en histoire et éducation civique',
          'image': LFSF,
          'company': 'Lycée Français de San Francisco',
          'link': '',
          'linktxt': '',
          h: 100,
          year: '2020',
        },
        {
          'name': 'Conférencier principal Q3 du groupe d’utilisateurs Alteryx',
          'image': alteryx,
          'company': 'Alteryx Montreal User Group',
          'link': 'https://www.linkedin.com/feed/update/urn:li:activity:6973765588292616194',
          'linktxt': 'Article ici',
          h: 100,
          year: '2022',
        },
        {
          'name': 'Conférencier principal Q2 du groupe d’utilisateurs Alteryx',
          'image': alteryx,
          'company': 'Alteryx Toronto User Group',
          'link': '',
          'linktxt': '',
          h: 100,
          year: '2023',
        },
      ],
    },
    {
      'section': 'Sports',
      'certification': [
        {
          'name': 'RBC Race for the Kids',
          'image': running,
          'company': '',
          'link': '',
          'linktxt': '',
          h: 100,
          year: '2020',
        },
      ],
    },
    {
      'section': 'Entreprises entrepreneuriales',
      'certification': [
        {
          'name': 'Locations estivales Airbnb',
          'image': airbnb,
          'company': '',
          'link': '',
          'linktxt': '',
          h: 100,
          year: '2017-18',
        },
        {
          'name': 'Réparation de vélos',
          'image': bike,
          'company': 'Travailleur autonome',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 100,
          year: '2015-18',
        },
      ],
    },
    {
      'section': 'Divers',
      'certification': [
        {
          'name': 'Apprentissage de la guitare en autodidacte',
          'image': guitar,
          'company': '',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 100,
          year: '',
        },
        {
          'name': 'Lecture',
          'image': book,
          'company': '',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 100,
          year: '',
        },
      ],
    },
  ],
};
  
