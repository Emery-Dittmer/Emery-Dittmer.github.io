import React from 'react';
import CertificationCard from './CertificationCard'; // Import the CertificationCard component
import Image from "next/image";


import alteryx_advanced from "@/assets/certifications/Alteryx_Designer_Advanced.png";
import alteryx_core from "@/assets/certifications/Alteryx_Designer_Core.png";
import inclusive_mindset from "@/assets/certifications/Inclusive_Mindset.png";
import CAPM from "@/assets/certifications/CAPM.png";
import power_BI from "@/assets/certifications/Power_BI_Cert.png";
import azure_fundamentals from "@/assets/certifications/Azure_fundamentals.png";
import Tableau_specialist from "@/assets/certifications/Tableau-Specialist.png";



export default function Certifications({ data }: { data?: Array<{ section: string; certification: Array<{ name: string; image: string; company: string; link: string; linktxt:string; h:number; }> }> }) {
  return (
    <>
    <div className="max-w-sm mx-auto grid mx-auto">
    <div className="py-1 md:py-2 border-t border-gray-800"></div></div>
    <h3 className="h2 text-center"> Certifications </h3>
    <div className="flex items-center justify-center">
      <div className="text-center my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-auto md:grid-cols-1 xl:px-0">
        <div className="certifications max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none">
          {certs.map((sectionData) => (
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


const certs = [
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
      'section': 'Analytics',
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
      ]
    },
    {
      'section': 'Visualization',
      'certification': [
        {
          'name': 'Microsoft Certified: Power BI Data Analyst Associates',
          'image': power_BI, // Update with the correct image import
          'company': 'Issued by: Microsoft',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
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
          'name': 'Microsoft Certified: Azure Fundamentals',
          'image': azure_fundamentals, // Update with the correct image import
          'company': 'Issued by: Microsoft',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': 'View Details',
          h: 100,
          year: '2023',
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
      ]
    },
    // Add more sections and certification data as needed
  ];
  