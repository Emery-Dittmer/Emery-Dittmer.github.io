import React from 'react';
import Certifications from './certifications'; // Make sure to provide the correct path

// Import your certification data from certificationData.js
import certificationData from './certificationData'; // Adjust the path as needed

function Test() {
  return (
    <div className="App">
      {/* Pass the certificationData as a prop to the Certifications component */}
      <Certifications data={certificationData} />
    </div>
  );
}

export default Test;