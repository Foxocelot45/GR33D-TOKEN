import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const Web3Context = createContext();

const INFURA_ID = 'ba7fccd6b6004ecfbcf47ae9f61578ff';
const SEPOLIA_CHAIN_ID = 11155111;

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [web3Modal, setWeb3Modal] = useState(null);
  const [error, setError] = useState(null);
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_ID
        }
      }
    };

    const web3Modal = new Web3Modal({
      network: 'sepolia',
      cacheProvider: true,
      providerOptions
    });

    setWeb3Modal(web3Modal);
  }, []);

  const connectWallet = async () => {
    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const network = await provider.getNetwork();
      
      if (network.chainId !== SEPOLIA_CHAIN_ID) {
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x' + SEPOLIA_CHAIN_ID.toString(16) }],
          });
        } catch (switchError) {
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x' + SEPOLIA_CHAIN_ID.toString(16),
                chainName: 'Sepolia Test Network',
                nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
                rpcUrls: [`https://sepolia.infura.io/v3/${INFURA_ID}`],
                blockExplorerUrls: ['https://sepolia.etherscan.io']
              }],
            });
          } else {
            throw switchError;
          }
        }
      }

      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setProvider(provider);
      setAccount(address);
      setChainId(network.chainId);

      provider.on("network", (newNetwork, oldNetwork) => {
        if (oldNetwork) window.location.reload();
      });

      return { provider, signer, address };
    } catch (error) {
      setError(error.message);
      throw error;
    }
  };

  const disconnectWallet = async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      setAccount(null);
      setProvider(null);
    }
  };

  const value = {
    account,
    provider,
    connectWallet,
    disconnectWallet,
    chainId,
  };

  return (
    <Web3Context.Provider value={value}>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle>Erreur de connexion</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error("useWeb3 must be used within a Web3Provider");
  }
  return context;
};

export default useWeb3;
