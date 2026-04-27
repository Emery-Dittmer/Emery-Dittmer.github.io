import React from 'react';
import CertificationCard from './CertificationCard';

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
import SwimLaneVisualisation from './SwimLaneVisualisation';
import NetworkDiagram from './NetworkDiagram';
import CollapsibleSkillSection from './CollapsibleSkillSection';
import CollapsibleSection from './CollapsibleSection';
import ExperienceSection from './ExperienceSection';
import { skillsConfig } from '@/lib/skillsConfig';

export default function Skills({
  locale = 'en',
}: {
  locale?: Locale;
}) {
  const titleCopy = {
    en: 'Skills',
    fr: 'Compétences',
  }
  const subtitleCopy = {
    en: 'Explore the tools, languages, and techniques I work with across data, design, and development. Hover or click any node to see connections, and dive into the detail sections below.',
    fr: "Explorez les outils, langages et techniques que j'utilise en analyse de données, design et développement. Survolez ou cliquez un nœud pour voir les connexions, et consultez les détails ci-dessous.",
  }
  const sectionTitles = {
    network:    { en: 'Skills × Roles Network',  fr: 'Réseau Compétences × Rôles' },
    swimlane:   { en: 'Skills Overview',          fr: 'Vue d\'ensemble des compétences' },
    experience: { en: 'Work Experience',          fr: 'Expérience professionnelle' },
    tools:      { en: 'Tools & Certifications',   fr: 'Outils & Certifications' },
    details:    { en: 'Skill Details',            fr: 'Détails des compétences' },
  }

  const title = titleCopy[locale]
  const subtitle = subtitleCopy[locale]

  return (
    <>
      {/* Page top spacing + divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800" />
      </div>

      {/* Page title + subtitle */}
      <h3 className="h2 text-center">{title}</h3>
      <p className="text-center text-gray-400 text-base max-w-2xl mx-auto mt-4 px-4 leading-relaxed">
        {subtitle}
      </p>

      {/* ── All collapsible sections ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 pb-24 space-y-4">

        {/* Skills Network Diagram */}
        <CollapsibleSection title={sectionTitles.network[locale]} defaultOpen>
          <NetworkDiagram />
        </CollapsibleSection>

        {/* Swim Lane Visualisation */}
        <CollapsibleSection title={sectionTitles.swimlane[locale]} defaultOpen>
          <SwimLaneVisualisation />
        </CollapsibleSection>

        {/* Work Experience */}
        <CollapsibleSection title={sectionTitles.experience[locale]}>
          <ExperienceSection />
        </CollapsibleSection>

        {/* Tools & Certifications */}
        <CollapsibleSection title={sectionTitles.tools[locale]}>
          <div className="flex justify-center">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start w-full max-w-4xl">
              {certsByLocale[locale].map((sectionData) => (
                <div key={sectionData.section}>
                  <h2 className="section-title">{sectionData.section}</h2>
                  <div className="grid grid-cols-2 gap-auto">
                    {sectionData.certification.map((certification) => (
                      <CertificationCard key={certification.name} {...certification} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CollapsibleSection>

        {/* Skill Details */}
        <CollapsibleSection title={sectionTitles.details[locale]}>
          {skillsConfig.lanes.flatMap(lane =>
            lane.skills.map(skill => (
              <CollapsibleSkillSection
                key={skill.id}
                id={skill.id}
                skillName={skill.name}
                laneTitle={lane.title}
                laneColor={lane.color}
                contributions={skill.contributions}
              />
            ))
          )}
        </CollapsibleSection>

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
          'image': figma,
          'company': 'Web design',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Afinity Designer',
          'image': afinity,
          'company': 'Graphic Design',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Penpot',
          'image': penpot,
          'company': 'Web design',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Power BI',
          'image': powerbi,
          'company': 'Data Visualisation',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Tableau',
          'image': tableau,
          'company': 'Data Visualisation',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Looker Studio',
          'image': looker,
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
          'image': python,
          'company': 'Issued by: Microsoft',
          'link': 'Flexible Coding',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'VBA',
          'image': vba,
          'company': 'Automation with Excel',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'R',
          'image': r,
          'company': 'Flexible Coding',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'SQL',
          'image': sql,
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
          'image': excel,
          'company': 'Spreadsheet',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Alteryx',
          'image': alteryx,
          'company': 'Low Code tool',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'Orange',
          'image': orange,
          'company': 'Low code tool',
          'link': 'https://www.credly.com/users/emery-dittmer/badges',
          'linktxt': '',
          h: 50,
          year: '',
        },
        {
          'name': 'ESRI',
          'image': esri,
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
