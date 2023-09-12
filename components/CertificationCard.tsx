import React from 'react';

function CertificationCard({
  name,
  image,
  company,
  link,
}: {
  name: string;
  image: string;
  company: string;
  link: string;
}) {
  return (
    <div className="certification-card">
      <div className="image-container">
        {image}
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
