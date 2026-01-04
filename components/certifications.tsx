'use client'

import React, { useState } from 'react';
import CertificationCard from './CertificationCard'; // Import the CertificationCard component
import Image from "next/image";


import alteryx_advanced from "@/assets/certifications/Alteryx_Designer_Advanced.png";
import alteryx_core from "@/assets/certifications/Alteryx_Designer_Core.png";
import inclusive_mindset from "@/assets/certifications/Inclusive_Mindset.png";
import CAPM from "@/assets/certifications/CAPM.png";
import power_BI from "@/assets/certifications/Power_BI_Cert.png";
import azure_fundamentals from "@/assets/certifications/Azure_fundamentals.png";
import Tableau_specialist from "@/assets/certifications/Tableau-Specialist.png";
import Fabric_eng from "@/assets/certifications/fabric_eng1.png";
import data_iku from "@/assets/certifications/dataiku_logo.jpg";
import PSMI from "@/assets/certifications/PSMI.png";
import databricks_associate from "@/assets/certifications/associate-badge-de.png";
import databricks_fundamentals from "@/assets/certifications/fundamentals-badge-databricks-2x_1.png";
import dataiku_advanced from "@/assets/certifications/advanced desiger.png";
import dataiku_ml_practitioner from "@/assets/certifications/ml practitioner.png";
import { Locale } from '@/lib/i18n';




export default function Certifications({
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
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const showLabel = locale === 'fr' ? 'Afficher plus' : 'Show more';
  const hideLabel = locale === 'fr' ? 'Afficher moins' : 'Show less';

  return (
    <>
    <div className="max-w-sm mx-auto grid mx-auto">
    <div className="py-1 md:py-2 border-t border-gray-800"></div></div>
    <h3 className="h2 text-center"> Certifications </h3>
    <div className="flex items-center justify-center">
      <div className="text-center my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-auto md:grid-cols-1 xl:px-0">
        <div className="certifications max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none">
          {certsByLocale[locale].map((sectionData) => {
            const isExpanded = expandedSections[sectionData.section] ?? false;
            const visibleCerts = isExpanded
              ? sectionData.certification
              : sectionData.certification.slice(0, 2);

            return (
            <div className="certifications-section" key={sectionData.section}>
              <h2 className="section-title">{sectionData.section}</h2>
              <div className="certifications-grid grid grid-cols-2 gap-auto max-w-sm">
                {visibleCerts.map((certification) => (
                  <CertificationCard key={certification.name} {...certification} />
                ))}
              </div>
              {sectionData.certification.length > 2 && (
                <button
                  type="button"
                  className="mt-4 text-sm font-semibold text-purple-400 hover:text-purple-200 transition duration-150 ease-in-out"
                  onClick={() => toggleSection(sectionData.section)}
                >
                  {isExpanded ? hideLabel : showLabel}
                </button>
              )}
            </div>
            );
          })}
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
      'section': 'Data Analytics',
      'certification': [
        {
          'name': 'Alteryx Designer Advanced Certification',
          'image': alteryx_advanced, // Update with the correct image import
          'company': 'Issued by: Alteryx',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': 'View Details',
          h: 100,
          year: '2021',
        },
        {
          'name': 'Alteryx Designer Core Certification',
          'image': alteryx_core, // Update with the correct image import
          'company': 'Issued by: Alteryx',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': 'View Details',
          h: 100,
          year: '2021',
        },
        {
          'name': 'Dataiku Core Designer',
          'image': data_iku, // Update with the correct image import
          'company': 'Issued by: Dataiku',
          'link': 'https://verify.skilljar.com/c/r5n822wv4aha',
          'linktxt': 'View Details',
          h: 100,
          year: '2024',
        },
        {
          'name': 'Dataiku Advanced Designer',
          'image': data_iku,
          'company': 'Issued by: Dataiku',
          'link': 'https://verify.skilljar.com/c/47wahcderzwy',
          'linktxt': 'View Details',
          h: 100,
          year: '2024',
        },
        {
          'name': 'Dataiku ML Practitioner',
          'image': data_iku,
          'company': 'Issued by: Dataiku',
          'link': 'https://verify.skilljar.com/c/esd6dm3c6dzi',
          'linktxt': 'View Details',
          h: 100,
          year: '2024',
        },
      ]
    },
    {
      'section': 'Visualization',
      'certification': [
        {
          'name': 'Microsoft Certified: Power BI Data Analyst Associates',
          'image': power_BI, // Update with the correct image import
          'company': 'Issued by: Microsoft',
          'link': 'https://learn.microsoft.com/en-us/users/emerydittmer-5529/credentials/certification/data-analyst-associate?tab=credentials-tab',
          'linktxt': 'View Details',
          h: 100,
          year: '2022',
        },
        {
          'name': 'Tableau Desktop Specialist',
          'image': Tableau_specialist, // Update with the correct image import
          'company': 'Issued by: Tableau',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': 'View Details',
          h: 100,
          year: '2022',
        },
      ]
    },
    {
      'section': 'Data Engineering',
      'certification': [
        {
          'name': 'Databricks Certified Data Engineer Associate',
          'image': databricks_associate,
          'company': 'Issued by: Databricks',
          'link': 'https://credentials.databricks.com/406240f4-b33b-4519-9130-99d952a6d621',
          'linktxt': 'View Details',
          h: 100,
          year: '2025',
        },
        {
          'name': 'Academy Accreditation - Databricks Lakehouse Fundamentals',
          'image': databricks_fundamentals,
          'company': 'Issued by: Databricks',
          'link': 'https://credentials.databricks.com/96344229-e2a6-4b93-ae9f-5a466bbb3884',
          'linktxt': 'View Details',
          h: 100,
          year: '2025',
        },
        {
          'name': 'Microsoft Certified: Azure Fundamentals',
          'image': azure_fundamentals, // Update with the correct image import
          'company': 'Issued by: Microsoft',
          'link': 'https://learn.microsoft.com/en-us/users/emerydittmer-5529/credentials/certification/azure-fundamentals?tab=credentials-tab',
          'linktxt': 'View Details',
          h: 100,
          year: '2023',
        },
        {
          'name': 'Microsoft Certified: Fabric Analytics Engineer Associate',
          'image': Fabric_eng, // Update with the correct image import
          'company': 'Issued by: Microsoft',
          'link': 'https://learn.microsoft.com/en-us/users/emerydittmer-5529/credentials/certification/fabric-analytics-engineer-associate?tab=credentials-tab',
          'linktxt': 'View Details',
          h: 100,
          year: '2024',
        }
      ]
    },
    {
      'section': 'Buisness Essentials',
      'certification': [
        {
          'name': 'Certified Associate in Project Management (CAPM)',
          'image': CAPM, // Update with the correct image import
          'company': 'Issued by: Project Management Institute',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': 'View Details',
          h: 100,
          year: '2021',
        },
        {
          'name': 'Inclusive Mindset',
          'image': inclusive_mindset, // Update with the correct image import
          'company': 'Issued by: PwC',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': 'View Details',
          h: 100,
          year: '2022',
        },
        {
          'name': 'Professional Scrum Master I',
          'image': PSMI, // Update with the correct image import
          'company': 'Issued by: Scrum.org',
          'link': 'https://www.credly.com/badges/efa29987-91ee-472a-867b-8b49bc431665/',
          'linktxt': 'View Details',
          h: 100,
          year: '2024',
        },
      ]
    },
    // Add more sections and certification data as needed
  ],
  fr: [
    {
      'section': 'Analyse de données',
      'certification': [
        {
          'name': 'Alteryx Designer Advanced Certification',
          'image': alteryx_advanced,
          'company': 'Délivré par : Alteryx',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2021',
        },
        {
          'name': 'Alteryx Designer Core Certification',
          'image': alteryx_core,
          'company': 'Délivré par : Alteryx',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2021',
        },
        {
          'name': 'Dataiku Core Designer',
          'image': data_iku,
          'company': 'Délivré par : Dataiku',
          'link': 'https://verify.skilljar.com/c/r5n822wv4aha',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2024',
        },
        {
          'name': 'Dataiku Advanced Designer',
          'image': data_iku,
          'company': 'Délivré par : Dataiku',
          'link': 'https://verify.skilljar.com/c/47wahcderzwy',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2024',
        },
        {
          'name': 'Dataiku ML Practitioner',
          'image': data_iku,
          'company': 'Délivré par : Dataiku',
          'link': 'https://verify.skilljar.com/c/esd6dm3c6dzi',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2024',
        },
      ],
    },
    {
      'section': 'Visualisation',
      'certification': [
        {
          'name': 'Microsoft Certified: Power BI Data Analyst Associates',
          'image': power_BI,
          'company': 'Délivré par : Microsoft',
          'link': 'https://learn.microsoft.com/en-us/users/emerydittmer-5529/credentials/certification/data-analyst-associate?tab=credentials-tab',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2022',
        },
        {
          'name': 'Tableau Desktop Specialist',
          'image': Tableau_specialist,
          'company': 'Délivré par : Tableau',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2022',
        },
      ],
    },
    {
      'section': 'Ingénierie des données',
      'certification': [
        {
          'name': 'Databricks Certified Data Engineer Associate',
          'image': databricks_associate,
          'company': 'Délivré par : Databricks',
          'link': 'https://credentials.databricks.com/406240f4-b33b-4519-9130-99d952a6d621',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2025',
        },
        {
          'name': 'Academy Accreditation - Databricks Lakehouse Fundamentals',
          'image': databricks_fundamentals,
          'company': 'Délivré par : Databricks',
          'link': 'https://credentials.databricks.com/96344229-e2a6-4b93-ae9f-5a466bbb3884',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2025',
        },
        {
          'name': 'Microsoft Certified: Azure Fundamentals',
          'image': azure_fundamentals,
          'company': 'Délivré par : Microsoft',
          'link': 'https://learn.microsoft.com/en-us/users/emerydittmer-5529/credentials/certification/azure-fundamentals?tab=credentials-tab',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2023',
        },
        {
          'name': 'Microsoft Certified: Fabric Analytics Engineer Associate',
          'image': Fabric_eng,
          'company': 'Délivré par : Microsoft',
          'link': 'https://learn.microsoft.com/en-us/users/emerydittmer-5529/credentials/certification/fabric-analytics-engineer-associate?tab=credentials-tab',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2024',
        },
      ],
    },
    {
      'section': 'Essentiels d’affaires',
      'certification': [
        {
          'name': 'Certified Associate in Project Management (CAPM)',
          'image': CAPM,
          'company': 'Délivré par : Project Management Institute',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2021',
        },
        {
          'name': 'Inclusive Mindset',
          'image': inclusive_mindset,
          'company': 'Délivré par : PwC',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2022',
        },
        {
          'name': 'Professional Scrum Master I',
          'image': PSMI,
          'company': 'Délivré par : Scrum.org',
          'link': 'https://www.credly.com/badges/efa29987-91ee-472a-867b-8b49bc431665/',
          'linktxt': 'Voir les détails',
          h: 100,
          year: '2024',
        },
      ],
    },
  ],
};
  
