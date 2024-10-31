import React, { useState } from 'react';
import './Staking.css';
import { connectWallet } from '../web3config';

function Staking() {
  const [userAddress, setUserAddress] = useState(null);

  // Fonction pour connecter le wallet et récupérer l'adresse
  const handleConnectWallet = async () => {
    try {
      const { userAddress } = await connectWallet();
      setUserAddress(userAddress);
    } catch (error) {
      console.error("Erreur lors de la connexion du wallet :", error);
    }
  };

  return (
    <div className="staking-section">
      {/* Message d'instruction */}
      <div className="instruction-box">
        <p>Pour une connexion optimale avec Metamask, veuillez désactiver temporairement les autres extensions Web3 si Metamask ne s’ouvre pas comme prévu.</p>
      </div>

      <h2>Staking</h2>
      <button className="connect-button" onClick={handleConnectWallet}>
        Connecter
      </button>

      {/* Affichage de l'adresse du wallet si connecté */}
      {userAddress && (
        <div className="wallet-info-box">
          <p>Wallet connecté avec succès :</p>
          <p>{userAddress}</p>
        </div>
      )}
    </div>
  );
}

export default Staking;


