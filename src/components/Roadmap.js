import React from 'react';
import './Roadmap.css';
import roadmapImage from '../assets/roadmap-image.png';

function Roadmap() {
  return (
    <div className="roadmap-section">
      <div className="roadmap-container">
        <img src={roadmapImage} alt="Roadmap" className="roadmap-image" />
      </div>
    </div>
  );
}

export default Roadmap;
