import React from 'react';
import CertificationCard from './CertificationCard'; // Import the CertificationCard component
import Image from "next/image";


import iridian from "@/assets/companies/iridian_logo.png";
import philips from "@/assets/companies/philips_logo.png";
import kpi from "@/assets/companies/kpi_dig_logo.png";
import pwc from "@/assets/companies/pwc_logo.png";
import rbc from "@/assets/companies/rbc_logo.png";
import mcgill from "@/assets/companies/McGill_University.png";
import { Locale } from '@/lib/i18n';



export default function Companies({
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
    }>;
  }>;
}) {
  const titleCopy = {
    en: 'Previous Companies',
    fr: 'Entreprises précédentes',
  }
  const title = titleCopy[locale]

  return (
    <>
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="py-12 md:py-10 border-t border-gray-800"></div></div>
    <h3 className="h2 text-center">{title}</h3>
    <div className="flex items-center justify-center">
      <div className="text-center my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-auto md:grid-cols-1 xl:px-0">
        <div className="certifications max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none">
          {certsByLocale[locale].map((sectionData) => (
            <div className="certifications-section" key={sectionData.section}>
              <h2 className="section-title">{sectionData.section}</h2>
              <div className="certifications-grid grid grid-cols-2 gap-auto">
                {sectionData.certification.map((certification) => (
                  <div className="certification-item" key={certification.name}>
                  <CertificationCard key={certification.name} {...certification} />
                  </div>
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
      'section': 'Manufacturing',
      'certification': [
        {
          'name': 'Philips Canada',
          'image': philips, // Update with the correct image import
          'company': 'POS Analyst',
          'link': '',
          'linktxt': '',
          h: 50,
          year: '2018',
        },
        {
          'name': 'Iridian Spectral Technologies',
          'image': iridian, // Update with the correct image import
          'company': 'Supply Cahin Manager',
          'link': '',
          'linktxt': '',
          h: 50,
          year: '2019-2020',
        },

      ]
    },
    {
      'section': 'Finance',
      'certification': [
        {
          'name': 'Royal Bank of Canada',
          'image': rbc, // Update with the correct image import
          'company': 'Career Launch Associate (2020-2021)',
          'link': '',
          'linktxt': '',
          h: 50,
          year: '2020-2021',
        },
        {
          'name': 'Price waterhouse Coopers',
          'image': pwc, // Update with the correct image import
          'company': 'Automation & Analytcs Associate (2021-2023)',
          'link': '',
          'linktxt': '',
          h: 50,
          year: '2020-2023',
        },
      ]
    },
    {
      'section': 'Consulting & Academic',
      'certification': [
        {
          'name': 'KPI Digital',
          'image': kpi, // Update with the correct image import
          'company': 'UI/UX expert (academic project)',
          'link': '',
          'linktxt': '',
          h: 50,
          year: '2022-2023',
        },
        {
          'name': 'McGill University',
          'image': mcgill, // Update with the correct image import
          'company': 'Research Assitant (2023)',
          'link': '',
          'linktxt': '',
          h: 50,
          year: '2023',
        }
      ]
    },
    // Add more sections and certification data as needed
  ],
  fr: [
    {
      'section': 'Fabrication',
      'certification': [
        {
          'name': 'Philips Canada',
          'image': philips,
          'company': 'Analyste POS',
          'link': '',
          'linktxt': '',
          h: 50,
          year: '2018',
        },
        {
          'name': 'Iridian Spectral Technologies',
          'image': iridian,
          'company': 'Responsable de la chaîne d’approvisionnement',
          'link': '',
          'linktxt': '',
          h: 50,
          year: '2019-2020',
        },

      ],
    },
    {
      'section': 'Finance',
      'certification': [
        {
          'name': 'Royal Bank of Canada',
          'image': rbc,
          'company': 'Associé Career Launch (2020-2021)',
          'link': '',
          'linktxt': '',
          h: 50,
          year: '2020-2021',
        },
        {
          'name': 'Price waterhouse Coopers',
          'image': pwc,
          'company': 'Associé en automatisation et analytique (2021-2023)',
          'link': '',
          'linktxt': '',
          h: 50,
          year: '2020-2023',
        },
      ],
    },
    {
      'section': 'Conseil et académique',
      'certification': [
        {
          'name': 'KPI Digital',
          'image': kpi,
          'company': 'Expert UI/UX (projet académique)',
          'link': '',
          'linktxt': '',
          h: 50,
          year: '2022-2023',
        },
        {
          'name': 'McGill University',
          'image': mcgill,
          'company': 'Assistant de recherche (2023)',
          'link': '',
          'linktxt': '',
          h: 50,
          year: '2023',
        },
      ],
    },
  ],
};
  
