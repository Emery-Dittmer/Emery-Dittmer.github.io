import React from 'react';
import CertificationCard from './CertificationCard'; // Import the CertificationCard component
import Image from "next/image";


import mlb from "@/assets/vis_image/mlb.png";

import adwork from "@/assets/vis_image/adworks.png";

import airnet from "@/assets/vis_image/airnetwork.png";


export default function Visuals({ data }: { data?: Array<{ section: string; certification: Array<{ name: string; image: string; company: string; link: string }> }> }) {
  return (
    <>
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="py-12 md:py-20 border-t border-gray-800"></div></div>
    <h3 className="h2 text-center"> Dashborads </h3>
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
      'section': 'Streamlit',
      'certification': [
        {
          'name': 'MLB Games 2024',
          'image': mlb, // Update with the correct image import
          'company': '2024 MLB Games',
          'link': 'https://emery-dittmer-streamlit-apps-mlbmlb-hibvjx.streamlit.app/?fbclid=IwAR35daHuUIJaOEl53yXrPE4zLhbl0LG6LN_1d8y2b706D6kVgOua4Yz1FoM',
          'linktxt': 'Link',
          h: 50,
          year: '',
        }
      ]
    },
    {
      'section': 'Power BI',
      'certification': [
        {
          'name': 'Adventure Works',
          'image': adwork, // Update with the correct image import
          'company': 'Simulation BI Report',
          'link': '',
          'linktxt': 'Link pending',
          h: 50,
          year: '',
        }
      ]
    },
    {
      'section': 'Tableau',
      'certification': [
        {
          'name': 'Air Network',
          'image': airnet, // Update with the correct image import
          'company': 'Airline Travel',
          'link': 'https://public.tableau.com/views/AirFareTop1000ContiguousStateCity-PairMarketsbackedup/Dashboard1?:language=en-US&:display_count=n&:origin=viz_share_link',
          'linktxt': 'Link',
          h: 50,
          year: '',
        },
      ]
    },
    // Add more sections and certification data as needed
  ];