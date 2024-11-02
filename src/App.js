import React from 'react';
import './App.css';
import './components/AboutUs/AboutUs.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Web3Provider, { useWeb3 } from './components/Web3Provider'; // Assurez-vous que l'importation de Web3Provider est correcte
import AboutUs from './components/AboutUs/AboutUs';
import Home from './components/Home';
import Roadmap from './components/Roadmap';
import Staking from './components/Staking';
import Contacts from './components/Contacts';
import Whitepaper from './components/Whitepaper';
import Liquidity from './components/Liquidity';
import DexAmm from './components/DexAmm';

function Footer() {
  const location = useLocation();
  const hideFooterLinks = location.pathname === '/about';

  return (
    <footer>
      {!hideFooterLinks && (
        <>
          <a href="https://x.com/TheGr33dyzClub" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://t.co/e6Z9lyHC2k" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://t.me/+XWXpQfDJoUhmZDlk" target="_blank" rel="noopener noreferrer">Telegram</a>
        </>
      )}
    </footer>
  );
}

function AppContent() {
  const { account, connectWallet, disconnectWallet } = useWeb3();

  return (
    <div className="App">
      <header>
        <h1 className="header-title">The Greedy's Club</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/roadmap">Roadmap</Link>
          <Link to="/whitepaper" target="_blank" rel="noopener noreferrer">Whitepaper</Link>
          <Link to="/dex">DEX/AMM (Soon)</Link>
          <Link to="/staking">Staking</Link>
          <Link to="/liquidity">Liquidity (Coming Soon)</Link>
          <Link to="/contacts">Contacts</Link>
        </nav>
        <div className="wallet-buttons">
          {account ? (
            <button className="button disconnect-button" onClick={disconnectWallet}>
              Disconnect Wallet
            </button>
          ) : (
            <button className="button connect-button" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/dex" element={<DexAmm />} />
          <Route path="/staking" element={<Staking />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/liquidity" element={<Liquidity />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <Web3Provider>
      <Router>
        <AppContent />
      </Router>
    </Web3Provider>
  );
}

export default App;
