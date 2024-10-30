import React from 'react';
import './App.css';
import './components/AboutUs/AboutUs.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AboutUs from './components/AboutUs/AboutUs';

function PlaceholderComponent({ name }) {
  return <div style={{ padding: '20px', textAlign: 'center' }}>{name} Page - Under Construction</div>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          {/* En-tête avec texte stylisé */}
          <h1 className="header-title">The Greedy's Club</h1>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About Us</Link>
            <Link to="/roadmap">Roadmap</Link>
            <Link to="/whitepaper.pdf" target="_blank" rel="noopener noreferrer">Whitepaper</Link>
            <Link to="/dex" className="disabled">DEX/AMM (Soon)</Link>
            <Link to="/staking">Staking</Link>
            <Link to="/contacts">Contacts</Link> {/* Ajout de la section Contacts */}
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<PlaceholderComponent name="Home" />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/roadmap" element={<PlaceholderComponent name="Roadmap" />} />
          <Route path="/staking" element={<PlaceholderComponent name="Staking" />} />
          <Route path="/contacts" element={<PlaceholderComponent name="Contacts" />} /> {/* Ajout de la route Contacts */}
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
