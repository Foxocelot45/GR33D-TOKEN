import React, { useState, useEffect } from 'react';
import './Staking.css';
import { ethers } from 'ethers';
import { PROXY_ADDRESS, CONTRACT_ABI } from '../constants/contract';

function Staking() {
  const [userAddress, setUserAddress] = useState(null);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState(null);
  const [balance, setBalance] = useState('0');

  // Fonction pour connecter le wallet et initialiser le contrat
  const handleConnectWallet = async () => {
    try {
      setError(null);
      if (!window.ethereum) {
        throw new Error("MetaMask n'est pas installé");
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      
      const contract = new ethers.Contract(PROXY_ADDRESS, CONTRACT_ABI, signer);
      
      setProvider(provider);
      setContract(contract);
      setUserAddress(address);

      // Récupérer le solde initial
      const balance = await contract.balanceOf(address);
      setBalance(ethers.utils.formatEther(balance));

    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError(error.message);
    }
  };

  // Effet pour vérifier si déjà connecté
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        window.location.reload();
      });
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return (
    <div className="staking-section">
      <div className="instruction-box">
        <p>Pour une connexion optimale avec MetaMask, veuillez désactiver temporairement 
           les autres extensions Web3 si MetaMask ne s'ouvre pas comme prévu.</p>
      </div>

      <h2>Staking</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {!userAddress ? (
        <button className="connect-button" onClick={handleConnectWallet}>
          Connecter
        </button>
      ) : (
        <div className="staking-container">
          <div className="wallet-info-box">
            <p>Wallet connecté avec succès:</p>
            <p>{userAddress}</p>
            <p className="info-text">Balance: {balance} $GR33D</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Staking;
