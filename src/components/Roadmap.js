import React from 'react';
import './Roadmap.css';
import roadmapImage from '../assets/roadmap-image.png';

function Roadmap() {
  return (
    <div className="roadmap-container">
      <h2 className="roadmap-title">Roadmap</h2>
      <img src={roadmapImage} alt="Greedy's Club Roadmap" className="roadmap-image" />
    </div>
  );
}

export default Roadmap;
