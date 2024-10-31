import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';

const providerOptions = {
  injected: {
    display: {
      name: "Metamask",
      description: "Connect with the Metamask wallet extension",
    },
    package: null,
  },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: "ba7fccd6b6004ecfbcf47ae9f61578ff",
    },
  },
};

const web3Modal = new Web3Modal({
  cacheProvider: false,
  providerOptions,
  theme: 'dark',
});

export async function connectWallet() {
  const instance = await web3Modal.connect();
  const provider = new ethers.providers.Web3Provider(instance);

  const accounts = await provider.send("eth_accounts", []);
  const userAddress = accounts[0];

  console.log('Wallet connected:', userAddress);
  return { provider, userAddress };
}
