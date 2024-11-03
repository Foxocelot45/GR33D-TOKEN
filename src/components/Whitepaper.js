import React from 'react';
import './Whitepaper.css';

function Whitepaper() {
  return (
    <div className="whitepaper-container">
      <div className="whitepaper-content">
        <h2>Whitepaper</h2>
        <p>Consult or download our Whitepaper to discover all the details of our project.</p>
        <a href="/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="download-link">
          Download the Whitepaper
        </a>
      </div>
    </div>
  );
}

export default Whitepaper;
