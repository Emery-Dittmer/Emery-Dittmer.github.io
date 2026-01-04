import Card from "@/components/shared/card";
import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/assets/icons";
import WebVitals from "@/components/shared/web-vital";
import ComponentGrid from "@/components/shared/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import EmeryHeadshot from '@/assets/images/emery_dittmer alt.jpg';
import movie from "@/assets/projects/movies.png";
import network from "@/assets/projects/network.png";

import windturbine from "@/assets/projects/windturbine.png";
import fraud_risk from "@/assets/projects/fraudtool.png";

import accrual_forecast from "@/assets/projects/financialmodel.png";
import reversal_finder from "@/assets/projects/journalentry.png";

import workshop from "@/assets/projects/workshopicon.png";
import inventory_drain from "@/assets/projects/supplyforecast.png";

import Demand_supply from "@/assets/projects/demandinvtory.png";

import { Locale } from "@/lib/i18n";

export default function Cards({ locale = "en" }: { locale?: Locale }) {
  const copy = {
    en: {
      title: "Some Past Examples",
    },
    fr: {
      title: "Quelques exemples passés",
    },
  };
  const t = copy[locale];
  return (
    <>
              {/* Section header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="py-12 md:py-20 border-t border-gray-800">
        <h3 className="h2 text-center">{t.title}</h3>
      <div className="flex items-center justify-center">
        <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-2 gap-5 px-5 md:grid-cols-3 xl:px-0 ">
          {featuresByLocale[locale].map(({ title, description, large,company,mediaSrc,linkUrl,linkText }) => (
            <Card
              key={title}
              title={title}
              description={description}
              large={large}
              company={company}
              mediaSrc={mediaSrc}
              linkUrl={linkUrl}
              linkText={linkText}
            />
          ))}
        </div>
      </div>
      </div>
      </div>
    </>
  );
}

const featuresByLocale = {
  en: [
    {
      title: 'Wind Turbine Blade Recycling Facility',
      company: 'Academic Project',
      description: 'A team and I investigated the optimal location of wind turbine recycling facilities throughout Ontario. We aimed to minimize the fixed cost of facility construction with the variable cost of transportation. This methodology lays the groundwork for future research and Canada\'s leadership in the global green economy. ',
      linkText: 'See the report here',
      linkUrl:'https://github.com/Emery-Dittmer/Emery-Dittmer.github.io/blob/main/assets/docs/turbine_recycling.pdf' ,
      large: false,
      mediaSrc: windturbine
    },
    {
      title: 'Developed a Fraud Risk Detection Tool',
      company: 'Professional Project',
      description: 'I helped build a financial risk and fraud tool using financial data expertise and a custom excel VBA workbook. The code allowed companies to self-evaluate or externally evaluate their processes. A standardized report generated a risk score with dynamic highlights.*',
      linkText: '',
      linkUrl:'' ,
      large: false,
      mediaSrc: fraud_risk
    },
    {
      title: 'Large Government Department Financial Model' ,
      company: 'Professional Project',
      description: 'I helped develop a financial prediction tool to plan 50 years of capital asset replacements. A BI dashboard helped to display the accrual ceiling and budget requirements. The government department saved an estimated $500 million in redundant assets over the next 50 years.*',
      picture: '',
      linkText: '',
      linkUrl:'' ,
      large: false,
      mediaSrc: accrual_forecast
    },
    {
      title: 'Network Analysis',
      company: 'Academic Project',
      description: 'A team and I investigated the network within the USPTO advice network. We uncovered that many recipriocal networks exist but that these networks do not have divisoona along race or gender lines.',
      linkText: 'See the report here',
      linkUrl:'https://github.com/Emery-Dittmer/Emery-Dittmer.github.io/blob/main/assets/docs/Networkanalysis.pdf' ,
      large: false,
      mediaSrc: network
    },
    {
      title: 'Movie theatre Revenue Forecasting',
      company: 'Academic Project',
      description: 'A team and I investigated the optimal pricing models for movie theatres post pandemic and various revenue strategies. The different strategies demonstrated increased marginal growth form a pure ticket revenue and concenssion persepectove',
      linkText: 'See the report here',
      linkUrl:'https://github.com/Emery-Dittmer/Emery-Dittmer.github.io/blob/main/assets/docs/Revenue%20managment.pdf' ,
      large: false,
      mediaSrc: movie
    },  
    {
      title: 'Journal Entry Reversal Finder' ,
      company: 'Professional Project',
      description:  'I developed an Alteryx workflow that detected journal entry reversals and produced a report. Audit procedures are complex but detecting and matching reversed journal entries saves teams time and money.*',
      picture: '',
      linkText: '',
      linkUrl:'' ,
      large: false,
      mediaSrc: reversal_finder
    },
    {
      title: 'Advising Workshop Effectiveness Analytics ' ,
      company: 'Professional Project',
      description: 'I prepared a dashboard and report using data from advisor workshops. The dashboard segmented the number of people attending the workshops by location, subject, and other marketing factors. The insights allowed RBC to increase workshop value and effectiveness by changing to a geographic and demographic approach to the times and subjects offered.*',
      picture: '',
      linkText: '',
      linkUrl:'' ,
      large: false,
      mediaSrc: workshop
    },
    {
      title:  'Supply Forecasting Tool' ,
      company: 'Professional Project',
      description: 'I developed a forecasting tool to track inventory and alert of critical supply shortages. I was responsible for critical substrate and rare earth coating materials.  The tool queried from several SQL databases of inventory, manufacturing usage, orders, and sales forecasting to keep track of critical supplies and upcoming shortages. The program would visualize the forecasted needs and send automated alerts for material needs when inventory is too low.*',
      picture: '',
      linkText: '',
      linkUrl:'' ,
      large: false,
      mediaSrc: inventory_drain
    },
    {
      title: 'Demand and Inventory Balancing Model' ,
      company: 'Professional Project',
      description: 'Working on POS data and inventory availability, I built a model that minimized the inventory requirements for the predicted sales of products such as razors, toothbrushes, and coffee machines. I was able to reallocate inventory space to higher volatility and profit items. This increased annual revenue.*',
      picture: '',
      linkText: '',
      linkUrl:'' ,
      large: false,
      mediaSrc: Demand_supply
    }
  ],
  fr: [
    {
      title: 'Installation de recyclage de pales d’éoliennes',
      company: 'Projet académique',
      description: 'Mon équipe et moi avons étudié l’emplacement optimal des installations de recyclage de pales d’éoliennes en Ontario. Nous cherchions à minimiser le coût fixe de construction tout en prenant en compte le coût variable de transport. Cette méthodologie pose les bases de recherches futures et du leadership du Canada dans l’économie verte mondiale.',
      linkText: 'Voir le rapport',
      linkUrl:'https://github.com/Emery-Dittmer/Emery-Dittmer.github.io/blob/main/assets/docs/turbine_recycling.pdf' ,
      large: false,
      mediaSrc: windturbine
    },
    {
      title: 'Développement d’un outil de détection du risque de fraude',
      company: 'Projet professionnel',
      description: 'J’ai aidé à concevoir un outil de risque financier et de fraude en m’appuyant sur mon expertise en données financières et sur un classeur Excel VBA personnalisé. Le code permettait aux entreprises d’évaluer leurs processus en interne ou en externe. Un rapport standardisé générait un score de risque avec des mises en évidence dynamiques.*',
      linkText: '',
      linkUrl:'' ,
      large: false,
      mediaSrc: fraud_risk
    },
    {
      title: 'Modèle financier pour un grand ministère' ,
      company: 'Projet professionnel',
      description: 'J’ai aidé à développer un outil de prévision financière pour planifier 50 ans de remplacements d’actifs. Un tableau de bord BI a permis d’afficher le plafond d’amortissement et les besoins budgétaires. Le ministère a économisé environ 500 millions de dollars en actifs redondants sur les 50 prochaines années.*',
      picture: '',
      linkText: '',
      linkUrl:'' ,
      large: false,
      mediaSrc: accrual_forecast
    },
    {
      title: 'Analyse de réseau',
      company: 'Projet académique',
      description: 'Mon équipe et moi avons étudié le réseau de conseil de l’USPTO. Nous avons constaté l’existence de nombreux réseaux réciproques, sans divisions selon la race ou le genre.',
      linkText: 'Voir le rapport',
      linkUrl:'https://github.com/Emery-Dittmer/Emery-Dittmer.github.io/blob/main/assets/docs/Networkanalysis.pdf' ,
      large: false,
      mediaSrc: network
    },
    {
      title: 'Prévision des revenus de salles de cinéma',
      company: 'Projet académique',
      description: 'Mon équipe et moi avons étudié les modèles de tarification optimaux pour les salles de cinéma après la pandémie et diverses stratégies de revenus. Ces stratégies ont montré une croissance marginale des recettes de billetterie et des concessions.',
      linkText: 'Voir le rapport',
      linkUrl:'https://github.com/Emery-Dittmer/Emery-Dittmer.github.io/blob/main/assets/docs/Revenue%20managment.pdf' ,
      large: false,
      mediaSrc: movie
    },  
    {
      title: 'Détection d’écritures d’extourne' ,
      company: 'Projet professionnel',
      description:  'J’ai développé un workflow Alteryx qui détectait les extournes d’écritures comptables et produisait un rapport. Les procédures d’audit sont complexes, mais détecter et rapprocher les extournes fait gagner du temps et de l’argent.*',
      picture: '',
      linkText: '',
      linkUrl:'' ,
      large: false,
      mediaSrc: reversal_finder
    },
    {
      title: 'Analyses de l’efficacité d’ateliers de conseil' ,
      company: 'Projet professionnel',
      description: 'J’ai préparé un tableau de bord et un rapport à partir des données d’ateliers de conseillers. Le tableau de bord segmentait les participants par lieu, sujet et facteurs marketing. Les insights ont permis à RBC d’améliorer la valeur et l’efficacité des ateliers en adoptant une approche géographique et démographique pour les horaires et sujets proposés.*',
      picture: '',
      linkText: '',
      linkUrl:'' ,
      large: false,
      mediaSrc: workshop
    },
    {
      title:  'Outil de prévision des approvisionnements' ,
      company: 'Projet professionnel',
      description: 'J’ai développé un outil de prévision pour suivre les stocks et alerter sur les pénuries critiques. J’étais responsable de matériaux de substrat critiques et de revêtements de terres rares. L’outil interrogeait plusieurs bases SQL (stock, fabrication, commandes et prévisions de ventes) pour anticiper les besoins. Il visualisait les besoins prévus et envoyait des alertes automatiques lorsque l’inventaire était trop bas.*',
      picture: '',
      linkText: '',
      linkUrl:'' ,
      large: false,
      mediaSrc: inventory_drain
    },
    {
      title: 'Modèle d’équilibrage demande et stocks' ,
      company: 'Projet professionnel',
      description: 'À partir des données de vente POS et de la disponibilité des stocks, j’ai construit un modèle qui minimisait les besoins en stock pour les ventes prévues de produits (rasoirs, brosses à dents, machines à café). J’ai pu réallouer l’espace d’inventaire vers des articles plus volatils et à forte marge. Cela a augmenté les revenus annuels.*',
      picture: '',
      linkText: '',
      linkUrl:'' ,
      large: false,
      mediaSrc: Demand_supply
    }
  ],
};
