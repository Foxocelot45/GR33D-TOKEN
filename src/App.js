import React, { useState } from 'react';
import './App.css';
import './components/AboutUs/AboutUs.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useWeb3 } from './components/Web3Provider';
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

function App() {
  const { account, connectWallet, disconnectWallet } = useWeb3();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Condition pour afficher le bouton "Connect Wallet" uniquement sur Staking et Liquidity
  const showConnectButton = location.pathname === '/staking' || location.pathname === '/liquidity';

  // Fonction pour basculer l'ouverture du menu
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <Router>
      <div className="App">
        <header>
          <h1 className="header-title">The Greedy's Club</h1>
          {/* Menu hamburger pour les petits écrans */}
          <div className="hamburger" onClick={toggleMenu}>
            ☰
          </div>
          <nav className={menuOpen ? 'menu-open' : ''}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/roadmap" onClick={() => setMenuOpen(false)}>Roadmap</Link>
            <Link to="/whitepaper" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>Whitepaper</Link>
            <Link to="/dex" onClick={() => setMenuOpen(false)}>DEX/AMM (Soon)</Link>
            <Link to="/staking" onClick={() => setMenuOpen(false)}>Staking</Link>
            <Link to="/liquidity" onClick={() => setMenuOpen(false)}>Liquidity (Coming Soon)</Link>
            <Link to="/contacts" onClick={() => setMenuOpen(false)}>Contacts</Link>
          </nav>
          {showConnectButton && (
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
          )}
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
    </Router>
  );
}

export default App;
