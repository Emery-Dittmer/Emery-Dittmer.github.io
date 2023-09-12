import Card from "@/components/shared/card";
import Balancer from "react-wrap-balancer";
import { DEPLOY_URL } from "@/lib/constants";
import { Github, Twitter } from "@/assets/icons";
import WebVitals from "@/components/shared/web-vital";
import ComponentGrid from "@/components/shared/component-grid";
import Image from "next/image";
import { nFormatter } from "@/lib/utils";
import EmeryHeadshot from '@/assets/images/emery_dittmer alt.jpg';
import windturbine from "@/assets/projects/windturbine.png";
import fraud_risk from "@/assets/projects/fraudtool.png";

import accrual_forecast from "@/assets/projects/financialmodel.png";
import reversal_finder from "@/assets/projects/journalentry.png";

import workshop from "@/assets/projects/workshopicon.png";
import inventory_drain from "@/assets/projects/supplyforecast.png";

import Demand_supply from "@/assets/projects/demandinvtory.png";





export default async function Cards() {
  return (
    <>
              {/* Section header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="py-12 md:py-20 border-t border-gray-800">
        <h3 className="h2 text-center"> Some Past Examples </h3>
      <div className="flex items-center justify-center">
        <div className="my-10 grid w-full max-w-screen-xl animate-fade-up grid-cols-2 gap-5 px-5 md:grid-cols-3 xl:px-0 ">
          {features.map(({ title, description, large,company,mediaSrc,linkUrl,linkText }) => (
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

const features = [
  
  {
    title: 'Wind Turbine Blade Recycling Facility',
    company: 'Academic Project',
    description: 'A team and I investigated the optimal location of wind turbine recycling facilities throughout Ontario. We aimed to minimize the fixed cost of facility construction with the variable cost of transportation. This methodology lays the groundwork for future research and Canada\'s leadership in the global green economy. ',
    linkText: 'link text',
    linkUrl:'link' ,
    large: false,
    mediaSrc: <Image
    src = {windturbine}
    alt="Wind Turbine"
    width={100}
    height={40}
    unoptimized
    />,
  },
  {
    title: 'Developed a Fraud Risk Detection Tool',
    company: 'Professional Project',
    description: 'I helped build a financial risk and fraud tool using financial data expertise and a custom excel VBA workbook. The code allowed companies to self-evaluate or externally evaluate their processes. A standardized report generated a risk score with dynamic highlights.*',
    linkText: '',
    linkUrl:'' ,
    large: false,
    mediaSrc: <Image
    src= {fraud_risk}
    alt="Deploy with Vercel"
    width={100}
    height={40}
    unoptimized
    />,
  },
  {
    title: 'Large Government Department Financial Model' ,
    company: 'Professional Project',
    description: 'I helped develop a financial prediction tool to plan 50 years of capital asset replacements. A BI dashboard helped to display the accrual ceiling and budget requirements. The government department saved an estimated $500 million in redundant assets over the next 50 years.*',
    picture: '',
    linkText: 'link text',
    linkUrl:'google.com' ,
    large: false,
    mediaSrc: <Image
    src={accrual_forecast}
    alt="Deploy with Vercel"
    width={100}
    height={40}
    unoptimized
    />,
  },
  {
    title: 'Journal Entry Reversal Finder' ,
    company: 'Professional Project',
    description:  'I developed an Alteryx workflow that detected journal entry reversals and produced a report. Audit procedures are complex but detecting and matching reversed journal entries saves teams time and money.*',
    picture: '',
    linkText: 'link text',
    linkUrl:'' ,
    large: false,
    mediaSrc: <Image
    src={reversal_finder}
    alt="Deploy with Vercel"
    width={100}
    height={40}
    unoptimized
    />,
  },
  {
    title: 'Advising Workshop Effectiveness Analytics ' ,
    company: 'Professional Project',
    description: 'I prepared a dashboard and report using data from advisor workshops. The dashboard segmented the number of people attending the workshops by location, subject, and other marketing factors. The insights allowed RBC to increase workshop value and effectiveness by changing to a geographic and demographic approach to the times and subjects offered.*',
    picture: '',
    linkText: 'link text',
    linkUrl:'' ,
    large: false,
    mediaSrc: <Image
    src={workshop}
    alt="Deploy with Vercel"
    width={100}
    height={40}
    unoptimized
    />,
  },
  {
    title:  'Supply Forecasting Tool' ,
    company: 'Professional Project',
    description: 'I developed a forecasting tool to track inventory and alert of critical supply shortages. I was responsible for critical substrate and rare earth coating materials.  The tool queried from several SQL databases of inventory, manufacturing usage, orders, and sales forecasting to keep track of critical supplies and upcoming shortages. The program would visualize the forecasted needs and send automated alerts for material needs when inventory is too low.*',
    picture: '',
    linkText: 'link text',
    linkUrl:'' ,
    large: false,
    mediaSrc: <Image
    src={inventory_drain}
    alt="Deploy with Vercel"
    width={100}
    height={40}
    unoptimized
    />,
  },
  {
    title: 'Demand and Inventory Balancing Model' ,
    company: 'Professional Project',
    description: 'Working on POS data and inventory availability, I built a model that minimized the inventory requirements for the predicted sales of products such as razors, toothbrushes, and coffee machines. I was able to reallocate inventory space to higher volatility and profit items. This increased annual revenue.*',
    picture: '',
    linkText: 'link text',
    linkUrl:'' ,
    large: false,
    mediaSrc: <Image
    src={Demand_supply}
    alt="Deploy with Vercel"
    width={100}
    height={40}
    unoptimized
    />,
  }
 
];
