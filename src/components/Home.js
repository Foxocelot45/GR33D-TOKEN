import React, { useEffect } from 'react';
import './Home.css';

function Home() {
  useEffect(() => {
    const handleScroll = () => {
      const homeText = document.querySelector('.home-text');
      if (homeText) {
        const position = homeText.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (position < windowHeight - 100) {
          homeText.classList.add('scrolled');
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      <h1 className="home-text scroll-reveal">
        Web3. Security. Transparency. Efficiency.
        <br />
        By community, for community.
        <br />
        <span>Join the future. Join the Greedy's Club ecosystem.</span>
      </h1>
    </div>
  );
}

export default Home;
