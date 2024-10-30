import React from 'react';
import './App.css';
import './AboutUs.css'; // Ajoute ce fichier CSS pour les styles de la section About Us
import logo from './logo.jpeg';

function App() {
  return (
    <div className="App">
      <header>
        <img src={logo} alt="Greedy's Club Logo" className="logo" />
        <nav>
          <a href="#about">About Us</a>
          <a href="#roadmap">Roadmap</a>
          <a href="whitepaper.pdf" target="_blank" rel="noopener noreferrer">Whitepaper</a>
          <a href="#dex" className="disabled">DEX/AMM (Soon)</a>
          <a href="#staking">Staking</a>
        </nav>
      </header>

      <section className="hero">
        <h1>Greedy's Club</h1>
        <p>Represents a pioneering crypto community evolving into a comprehensive blockchain ecosystem with transparency, security, and scalability.</p>
        <div className="buttons">
          <a href="#about" className="btn">About Us</a>
          <a href="#roadmap" className="btn">Roadmap</a>
          <a href="whitepaper.pdf" className="btn" target="_blank" rel="noopener noreferrer">Whitepaper</a>
          <a href="#staking" className="btn">Staking</a>
        </div>
      </section>

      {/* Section About Us */}
      <section id="about" className="about-us-section">
        <div className="content-wrapper">
          <h2>About Us</h2>
          <p>
            The Greedy's Club is a pioneering crypto community with extensive experience in the DeFi world. 
            As early adopters of blockchain technology, we have explored new networks and innovative 
            decentralized finance solutions. Our ecosystem revolves around the $GR33D token, which powers 
            a range of projects including a creator-friendly NFT marketplace, Play2Earn games, and a staking 
            platform offering up to 40% APY.
          </p>
          <p>
            Artists, musicians, and creators of all kinds will have the opportunity to earn royalties on each 
            future resale of their work. Our NFT marketplace is designed to support creative independence, 
            providing artists with a transparent, lifelong revenue stream through each sale.
          </p>
          <p>
            Our vision goes beyond a simple token; we are building a DAO for community-driven decision-making, 
            a DEX/AMM for optimized exchanges, and a multi-chain presence from launch. With a roadmap reaching 
            into 2025, we’re dedicated to security, innovation, and a sustainable ecosystem that rewards loyalty.
          </p>
        </div>
      </section>

      <footer>
        <a href="https://x.com/TheGr33dyzClub" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://t.co/e6Z9lyHC2k" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://t.me/+XWXpQfDJoUhmZDlk" target="_blank" rel="noopener noreferrer">Telegram</a>
      </footer>
    </div>
  );
}

export default App;
