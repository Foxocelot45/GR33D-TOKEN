import React from 'react';
import './Whitepaper.css';

function Whitepaper() {
  return (
    <div className="whitepaper-container">
      <div className="whitepaper-content">
        <h2>Whitepaper</h2>
        <p>Consultez ou téléchargez notre Whitepaper pour découvrir tous les détails de notre projet.</p>
        <a href="/whitepaper.pdf" target="_blank" rel="noopener noreferrer" className="download-link">
          Télécharger le Whitepaper
        </a>
      </div>
    </div>
  );
}

export default Whitepaper;
