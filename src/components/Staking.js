import React, { useState } from 'react';
import { connectWallet } from '../web3config';
import './Staking.css';

function Staking() {
  const [connected, setConnected] = useState(false);
  const [userAddress, setUserAddress] = useState('');

  const handleConnect = async () => {
    try {
      const { provider, userAddress } = await connectWallet();
      setConnected(true);
      setUserAddress(userAddress);
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  return (
    <div className="staking-page">
      <h2>Staking</h2>
      <button onClick={handleConnect} className="connect-button">
        Connecter
      </button>
      {connected && (
        <div className="wallet-info">
          <p>Wallet connecté avec succès.</p>
          <p>Adresse : {userAddress}</p>
        </div>
      )}
    </div>
  );
}

export default Staking;
