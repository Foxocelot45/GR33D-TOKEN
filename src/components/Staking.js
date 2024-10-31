// src/components/Staking.js
import React, { useState } from 'react';
import './Staking.css';

function Staking() {
  const [account, setAccount] = useState(null);

  // Fonction pour se connecter à MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log('Connected account:', accounts[0]);
      } catch (error) {
        console.error('Connection error:', error);
      }
    } else {
      alert('MetaMask non détecté. Veuillez installer MetaMask pour continuer.');
    }
  };

  return (
    <div className="staking-container">
      <h2>Staking</h2>
      {/* Bouton Connecter */}
      {!account ? (
        <button className="connect-button" onClick={connectWallet}>Connecter</button>
      ) : (
        <p>Connecté avec l'adresse : {account}</p>
      )}
    </div>
  );
}

export default Staking;
