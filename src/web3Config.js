// src/web3Config.js
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "ba7fccd6b6004ecfbcf47ae9f61578ff"  // Votre ID de projet Infura
    }
  }
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions
});

export async function connectWallet() {
  try {
    console.log("Initialisation de la connexion au wallet...");
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();

    console.log("Connexion réussie au wallet. Adresse:", await signer.getAddress());
    return { provider, signer };
  } catch (error) {
    console.error("Erreur lors de la connexion au wallet :", error);
  }
}

export default web3Modal;
