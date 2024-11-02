import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';

const providerOptions = {
  injected: {
    display: {
      name: "MetaMask",
      description: "Connect with the MetaMask wallet extension",
    },
    package: null,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "ba7fccd6b6004ecfbcf47ae9f61578ff", // Clé Infura
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: true, // Garde en cache la dernière connexion (ex : MetaMask)
  providerOptions,
  theme: 'dark',
});

let provider;
let signer;

export async function connectWallet() {
  try {
    const instance = await web3Modal.connect();
    provider = new ethers.providers.Web3Provider(instance);
    signer = provider.getSigner();

    // Récupère l'adresse utilisateur
    const userAddress = await signer.getAddress();

    // Récupère le réseau et le solde
    const network = await provider.getNetwork();
    const balance = await provider.getBalance(userAddress);

    console.log('Wallet connected:', userAddress);
    console.log('Network:', network.name);
    console.log('Balance:', ethers.utils.formatEther(balance));

    // Écoute les changements de compte
    instance.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) {
        console.log("Wallet disconnected");
        disconnectWallet();
      } else {
        console.log("Account changed:", accounts[0]);
      }
    });

    // Écoute les changements de réseau
    instance.on("chainChanged", (chainId) => {
      console.log("Network changed:", chainId);
      window.location.reload();
    });

    return { provider, signer, userAddress, network, balance };
  } catch (error) {
    console.error("Failed to connect wallet:", error);
    throw new Error("Failed to connect wallet");
  }
}

export async function disconnectWallet() {
  try {
    web3Modal.clearCachedProvider();
    if (provider && provider.provider && typeof provider.provider.disconnect === "function") {
      await provider.provider.disconnect();
    }
    provider = null;
    signer = null;
    console.log("Wallet disconnected");
  } catch (error) {
    console.error("Failed to disconnect wallet:", error);
  }
}

// Fonction pour récupérer les informations de connexion actuelle
export async function getWalletInfo() {
  if (!signer) {
    throw new Error("Wallet not connected");
  }
  
  const userAddress = await signer.getAddress();
  const network = await provider.getNetwork();
  const balance = await provider.getBalance(userAddress);
  
  return { userAddress, network, balance };
}

