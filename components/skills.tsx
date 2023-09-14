import React from 'react';
import CertificationCard from './CertificationCard'; // Import the CertificationCard component
import Image from "next/image";


import figma from "@/assets/logos/figma.png";
import penpot from "@/assets/logos/penpot.png";
import afinity from "@/assets/logos/affinity_logo.png";
import powerbi from "@/assets/logos/PowerBI_logo.png";
import tableau from "@/assets/logos/PowerBI_logo.png";
import looker from "@/assets/logos/looker_logo.png";


import python from "@/assets/logos/python-logo-notext.png";
import vba from "@/assets/logos/vba_logo.png";
import r from "@/assets/logos/rlogo.png";
import sql from "@/assets/logos/logo-mysql.png";

import excel from "@/assets/logos/excel_logo.png";
import alteryx from "@/assets/logos/Alteryx_Logo.png";
import orange from "@/assets/logos/orange_logo.png";
import esri from "@/assets/logos/esri_logo.png";

export default function Skills({ data }: { data?: Array<{ section: string; certification: Array<{ name: string; image: string; company: string; link: string }> }> }) {
  return (
    <>
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="py-12 md:py-20 border-t border-gray-800"></div></div>
    <h3 className="h2 text-center"> Skills </h3>
    <div className="flex items-center justify-center">
      <div className="text-center my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-auto md:grid-cols-1 xl:px-0">
        <div className="certifications max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none">
          {certs.map((sectionData) => (
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
      'section': 'Visulization Tools',
      'certification': [
        {
          'name': 'Figma',
          'image': figma, // Update with the correct image import
          'company': 'Web design',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
        },
        {
          'name': 'Afinity Designer',
          'image': afinity, // Update with the correct image import
          'company': 'Graphic Design',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
        },
        {
          'name': 'Penpot',
          'image': penpot, // Update with the correct image import
          'company': 'Web design',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
        },
        {
          'name': 'Power BI',
          'image': powerbi, // Update with the correct image import
          'company': 'Data Visualisation',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
        },
        {
          'name': 'Tableau',
          'image': tableau, // Update with the correct image import
          'company': 'Data Visualisation',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
        },
        {
          'name': 'Looker Studio',
          'image': looker, // Update with the correct image import
          'company': 'Data Visualisation',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
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
        },
        {
          'name': 'VBA',
          'image': vba, // Update with the correct image import
          'company': 'Automation with Excel',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
        },
        {
          'name': 'R',
          'image': r, // Update with the correct image import
          'company': 'Flexible Coding',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
        },
        {
          'name': 'SQL',
          'image': sql, // Update with the correct image import
          'company': 'Database Querry',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
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
        },
        {
          'name': 'Alteryx',
          'image': alteryx, // Update with the correct image import
          'company': 'Low Code tool',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
        },
        {
          'name': 'Orange',
          'image': orange, // Update with the correct image import
          'company': 'Low code tool',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
        },
        {
          'name': 'ESRI',
          'image': esri, // Update with the correct image import
          'company': 'Geospacial Technologies',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
        },
      ]
    },
    // Add more sections and certification data as needed
  ];
  