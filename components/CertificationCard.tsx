import React from 'react';
import Image, { StaticImageData } from 'next/image';

function CertificationCard({
  name,
  image,
  company,
  link,
  linktxt,
  h,
  year,
}: {
  name: string;
  image: StaticImageData;
  company: string;
  link: string;
  linktxt: string;
  h: number;
  year: string;
}) {
  return (
    <div className="certification-card">
      <div className="image-container">
        <Image src={image} alt={name} height={h} unoptimized />
      </div>
      
      <div className="certification-details">
        <h3 className="certification-name two-line ">{name}</h3>
        <p className="certification-company">{company}</p>
        <p className="certification-year">{year}</p>
        <a
          href={link}
          className="certification-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linktxt}
        </a>

        
      </div>
    </div>
  );
}

export default CertificationCard;
