// src/web3Config.js
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import WalletConnectProvider from "@walletconnect/web3-provider";

// Configuration du modal Web3
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "INFURA_PROJECT_ID"  // Remplacez par votre ID de projet Infura
    }
  }
};

const web3Modal = new Web3Modal({
  cacheProvider: true,
  providerOptions
});

export async function connectWallet() {
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);
  const signer = provider.getSigner();
  return { provider, signer };
}

export default web3Modal;
