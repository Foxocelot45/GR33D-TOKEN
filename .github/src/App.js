import React from 'react';
import './App.css';
import logo from './logo.png';

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

      <footer>
        <a href="https://x.com/TheGr33dyzClub" target="_blank" rel="noopener noreferrer">Twitter</a>
        <a href="https://t.co/e6Z9lyHC2k" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://t.me/+XWXpQfDJoUhmZDlk" target="_blank" rel="noopener noreferrer">Telegram</a>
      </footer>
    </div>
  );
}

export default App;

