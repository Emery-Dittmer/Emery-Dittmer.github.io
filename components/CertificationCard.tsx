import React from 'react';
import Image, { StaticImageData } from 'next/image';

function CertificationCard({
  name,
  image,
  company,
  link,
}: {
  name: string;
  image: StaticImageData;
  company: string;
  link: string;
}) {
  return (
    <div className="certification-card">
      <div className="image-container">
      <Image src={image} alt={name} width={100} height={40} unoptimized />
      </div>
      <div className="certification-details">
        <h3 className="certification-name">{name}</h3>
        <p className="certification-company">{company}</p>
        <a
          href={link}
          className="certification-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Details
        </a>
      </div>
    </div>
  );
}

export default CertificationCard;
