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



export default async function Certifications({ data }: { data: Array<{ section: string; certification: Array<{ name: string; image: string; company: string; link: string }> }> }) {
  return (
    <>
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="py-12 md:py-20 border-t border-gray-800"></div></div>
    <h3 className="h2 text-center"> Certifications </h3>
    <div className="flex items-center justify-center">
      <div className="text-center my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-1 gap-auto md:grid-cols-1 xl:px-0">
        <div className="certifications grid grid-cols-3 gap-auto">
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
      'section': 'Analytics',
      'certification': [
          {'name': 'Alteryx Designer Advanced Certification', 'image': <Image
          src = {alteryx_advanced}
          alt="Wind Turbine"
          width={100}
          height={40}
          unoptimized
          />,'company':'Issued by: Alteryx' , 'link': 'https://www.credly.com/users/emery-dittmer/badges'},
         
          {'name': 'Alteryx Designer Core Certification', 'image': <Image
          src = {alteryx_core}
          alt="Wind Turbine"
          width={100}
          height={40}
          unoptimized
          />,'company':'Issued by: Alteryx' , 'link': 'https://www.credly.com/users/emery-dittmer/badges'},
         
      ]
  },
  {
      'section': 'Visualization',
      'certification': [
          {'name': 'Microsoft Certified: Power BI Data Analyst Associates', 'image': <Image
          src = {power_BI}
          alt="Wind Turbine"
          width={100}
          height={40}
          unoptimized
          />,'company':'Issued by: Microsoft' , 'link': 'https://www.credly.com/users/emery-dittmer/badges'},
          
          {'name': ' Tableau Desktop Specialist', 'image': <Image
          src = {Tableau_specialist}
          alt="Wind Turbine"
          width={100}
          height={40}
          unoptimized
          />,'company':'Issued by: Tableau' , 'link': 'https://www.credly.com/users/emery-dittmer/badges'},
        
          
      ]
  },
  // {
  //     'section': 'Development',
  //     'certification': [
  //         {'name': 'SQL- MySQL for Data Analytcs and Buisness Intelligence', 'image': mysql,'company':'Issued by: Udemy' , 'link': 'https://www.credly.com/users/emery-dittmer/badges'},
  //     ]
  // },
  {
      'section': 'Buisness Essentials',
      'certification': [
          {'name': 'Certified Associate in Project Management (CAPM)', 'image': <Image
          src = {CAPM}
          alt="Wind Turbine"
          width={100}
          height={40}
          unoptimized
          />,'company':'Issued by: Project Management Institute' , 'link': 'https://www.credly.com/users/emery-dittmer/badges'},
          
          {'name': 'Microsoft Certified: Azure Fundamentals', 'image': <Image
          src = {azure_fundamentals}
          alt="Wind Turbine"
          width={100}
          height={40}
          unoptimized
          />,'company':'Issued by: Microsoft' , 'link': 'https://www.credly.com/users/emery-dittmer/badges'},
          
          {'name': 'Inclusive Mindset', 'image': <Image
          src = {inclusive_mindset}
          alt="Wind Turbine"
          width={100}
          height={40}
          unoptimized
          />,'company':'Issued by: PwC' , 'link': 'https://www.credly.com/users/emery-dittmer/badges'}
      ]
  },
]