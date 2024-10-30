import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './components/AboutUs/AboutUs.css';
import logo from './logo.jpeg';
import AboutUs from './components/AboutUs/AboutUs';

function Home() {
  return (
    <div className="hero">
      <h1>Greedy's Club</h1>
      <p>Represents a pioneering crypto community evolving into a comprehensive blockchain ecosystem with transparency, security, and scalability.</p>
      <div className="buttons">
        <Link to="/about" className="btn">About Us</Link>
        <Link to="/roadmap" className="btn">Roadmap</Link>
        <a href="whitepaper.pdf" className="btn" target="_blank" rel="noopener noreferrer">Whitepaper</a>
        <Link to="/staking" className="btn">Staking</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <img src={logo} alt="Greedy's Club Logo" className="logo" />
          <nav>
            <Link to="/about">About Us</Link>
            <Link to="/roadmap">Roadmap</Link>
            <a href="whitepaper.pdf" target="_blank" rel="noopener noreferrer">Whitepaper</a>
            <Link to="/dex" className="disabled">DEX/AMM (Soon)</Link>
            <Link to="/staking">Staking</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          {/* Vous pouvez ajouter d'autres routes ici si nécessaire */}
        </Routes>

        <footer>
          <a href="https://x.com/TheGr33dyzClub" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://t.co/e6Z9lyHC2k" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://t.me/+XWXpQfDJoUhmZDlk" target="_blank" rel="noopener noreferrer">Telegram</a>
        </footer>
      </div>
    </Router>
  );
}

export default App;

