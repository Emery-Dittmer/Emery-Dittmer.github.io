import React from 'react';
import CertificationCard from './CertificationCard'; // Import the CertificationCard component
import Image from "next/image";


import figma from "@/assets/logos/figma.png";
import penpot from "@/assets/logos/penpot.png";
import afinity from "@/assets/logos/affinity_logo.png";
import powerbi from "@/assets/logos/PowerBI_logo.png";
import tableau from "@/assets/logos/tableau_logo.png";
import looker from "@/assets/logos/looker_logo.png";


import python from "@/assets/logos/python-logo-notext.png";
import vba from "@/assets/logos/vba_logo.png";
import r from "@/assets/logos/rlogo.png";
import sql from "@/assets/logos/logo-mysql.png";

import excel from "@/assets/logos/excel_logo.png";
import alteryx from "@/assets/logos/Alteryx_Logo.png";
import orange from "@/assets/logos/orange_logo.png";
import esri from "@/assets/logos/Esri_Logo.png";
import { Locale } from '@/lib/i18n';

export default function Skills({
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
    }>;
  }>;
}) {
  const titleCopy = {
    en: 'Skills',
    fr: 'Compétences',
  }
  const title = titleCopy[locale]
  return (
    <>
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="py-12 md:py-20 border-t border-gray-800"></div></div>
    <h3 className="h2 text-center">{title}</h3>
    <div className="flex items-center justify-center">
      <div className="text-center my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-auto md:grid-cols-1 xl:px-0">
        <div className="certifications max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none">
          {certsByLocale[locale].map((sectionData) => (
            <div className="certifications-section" key={sectionData.section}>
              <h2 className="section-title">{sectionData.section}</h2>
              <div className="certifications-grid grid grid-cols-2 gap-auto">
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
      'section': 'Visulization Tools',
      'certification': [
        {
          'name': 'Figma',
          'image': figma, // Update with the correct image import
          'company': 'Web design',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Afinity Designer',
          'image': afinity, // Update with the correct image import
          'company': 'Graphic Design',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Penpot',
          'image': penpot, // Update with the correct image import
          'company': 'Web design',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Power BI',
          'image': powerbi, // Update with the correct image import
          'company': 'Data Visualisation',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Tableau',
          'image': tableau, // Update with the correct image import
          'company': 'Data Visualisation',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Looker Studio',
          'image': looker, // Update with the correct image import
          'company': 'Data Visualisation',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
      ]
    },
    {
      'section': 'Coding Skills',
      'certification': [
        {
          'name': 'Python',
          'image': python, // Update with the correct image import
          'company': 'Issued by: Microsoft',
          'link': 'Flexible Coding',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'VBA',
          'image': vba, // Update with the correct image import
          'company': 'Automation with Excel',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'R',
          'image': r, // Update with the correct image import
          'company': 'Flexible Coding',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'SQL',
          'image': sql, // Update with the correct image import
          'company': 'Database Querry',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
      ]
    },
    {
      'section': 'Buisness Analytics',
      'certification': [
        {
          'name': 'Excel',
          'image': excel, // Update with the correct image import
          'company': 'Spreadsheet',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Alteryx',
          'image': alteryx, // Update with the correct image import
          'company': 'Low Code tool',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Orange',
          'image': orange, // Update with the correct image import
          'company': 'Low code tool',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'ESRI',
          'image': esri, // Update with the correct image import
          'company': 'Geospacial Technologies',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
      ]
    },
    // Add more sections and certification data as needed
  ],
  fr: [
    {
      'section': 'Outils de visualisation',
      'certification': [
        {
          'name': 'Figma',
          'image': figma,
          'company': 'Conception web',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Afinity Designer',
          'image': afinity,
          'company': 'Design graphique',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Penpot',
          'image': penpot,
          'company': 'Conception web',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Power BI',
          'image': powerbi,
          'company': 'Visualisation de données',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Tableau',
          'image': tableau,
          'company': 'Visualisation de données',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Looker Studio',
          'image': looker,
          'company': 'Visualisation de données',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
      ],
    },
    {
      'section': 'Compétences en programmation',
      'certification': [
        {
          'name': 'Python',
          'image': python,
          'company': 'Délivré par : Microsoft',
          'link': 'Flexible Coding',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'VBA',
          'image': vba,
          'company': 'Automatisation avec Excel',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'R',
          'image': r,
          'company': 'Programmation flexible',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'SQL',
          'image': sql,
          'company': 'Requêtes de base de données',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
      ],
    },
    {
      'section': 'Analyse d’affaires',
      'certification': [
        {
          'name': 'Excel',
          'image': excel,
          'company': 'Tableur',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Alteryx',
          'image': alteryx,
          'company': 'Outil low-code',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Orange',
          'image': orange,
          'company': 'Outil low-code',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'ESRI',
          'image': esri,
          'company': 'Technologies géospatiales',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
      ],
    },
  ],
};
  
