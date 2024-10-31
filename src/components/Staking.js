import React, { useState, useEffect } from 'react';
import './Staking.css';
import { ethers } from 'ethers';

// Configuration du contrat directement dans le fichier pour commencer
const PROXY_ADDRESS = "0xeBaFE97112C5008249fb6fF4bCAf0a603d39e2a7";
const CONTRACT_ABI = [
    // Fonctions de lecture
    "function balanceOf(address) view returns (uint256)",
    "function getStakeInfo(address) view returns (uint256 stakedAmount, uint256 pendingRewards, uint256 contractBalance, uint256 rewardsPool)",
    "function BASE_APY() view returns (uint256)",
    
    // Fonctions d'écriture
    "function stake(uint256) external",
    "function unstake(uint256) external",
    "function claimRewards() external"
];

function Staking() {
    // États pour les données utilisateur
    const [userAddress, setUserAddress] = useState(null);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [error, setError] = useState(null);
    
    // États pour les informations de staking
    const [balance, setBalance] = useState('0');
    const [stakedAmount, setStakedAmount] = useState('0');
    const [pendingRewards, setPendingRewards] = useState('0');
    const [baseAPY] = useState('20.00');
    const [bonusAPY] = useState('0.00');
    
    // États pour les inputs
    const [stakeAmount, setStakeAmount] = useState('');
    const [unstakeAmount, setUnstakeAmount] = useState('');
    
    // État pour le chargement
    const [isLoading, setIsLoading] = useState(false);

    // Fonction pour mettre à jour les données utilisateur
    const updateUserData = async (contract, address) => {
        try {
            const balance = await contract.balanceOf(address);
            const stakeInfo = await contract.getStakeInfo(address);
            
            setBalance(ethers.utils.formatEther(balance));
            setStakedAmount(ethers.utils.formatEther(stakeInfo.stakedAmount));
            setPendingRewards(ethers.utils.formatEther(stakeInfo.pendingRewards));
            
        } catch (error) {
            console.error("Erreur lors de la mise à jour des données:", error);
        }
    };

    // Fonction pour connecter le wallet
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

            await updateUserData(contract, address);
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            setError(error.message);
        }
    };

    // Fonction pour staker
    const handleStake = async () => {
        if (!contract || !stakeAmount) return;
        setIsLoading(true);
        setError(null);
        
        try {
            const amount = ethers.utils.parseEther(stakeAmount);
            const tx = await contract.stake(amount);
            await tx.wait();
            await updateUserData(contract, userAddress);
            setStakeAmount('');
        } catch (error) {
            setError("Erreur lors du staking: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Fonction pour unstaker
    const handleUnstake = async () => {
        if (!contract || !unstakeAmount) return;
        setIsLoading(true);
        setError(null);
        
        try {
            const amount = ethers.utils.parseEther(unstakeAmount);
            const tx = await contract.unstake(amount);
            await tx.wait();
            await updateUserData(contract, userAddress);
            setUnstakeAmount('');
        } catch (error) {
            setError("Erreur lors de l'unstaking: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Fonction pour réclamer les récompenses
    const handleClaimRewards = async () => {
        if (!contract) return;
        setIsLoading(true);
        setError(null);
        
        try {
            const tx = await contract.claimRewards();
            await tx.wait();
            await updateUserData(contract, userAddress);
        } catch (error) {
            setError("Erreur lors de la réclamation des récompenses: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Effet pour mettre à jour les données périodiquement
    useEffect(() => {
        if (contract && userAddress) {
            const interval = setInterval(() => {
                updateUserData(contract, userAddress);
            }, 30000); // Mise à jour toutes les 30 secondes
            return () => clearInterval(interval);
        }
    }, [contract, userAddress]);

    return (
        <div className="staking-section">
            <div className="instruction-box">
                <p>Pour une connexion optimale avec MetaMask, veuillez désactiver temporairement 
                   les autres extensions Web3 si MetaMask ne s'ouvre pas comme prévu.</p>
            </div>

            {error && <div className="error-message">{error}</div>}

            {!userAddress ? (
                <button className="connect-button" onClick={handleConnectWallet}>
                    Connecter
                </button>
            ) : (
                <div className="staking-container">
                    {/* Information Wallet */}
                    <div className="staking-card wallet-info">
                        <h3>Informations Wallet</h3>
                        <p>Adresse: {userAddress}</p>
                        <p>Balance: {balance} $GR33D</p>
                    </div>

                    {/* Informations Staking */}
                    <div className="staking-card staking-info">
                        <h3>Informations Staking</h3>
                        <p>Montant Staké: {stakedAmount} $GR33D</p>
                        <p>Récompenses en attente: {pendingRewards} $GR33D</p>
                        <p>APY Base: {baseAPY}%</p>
                        <p>APY Bonus: +{bonusAPY}%</p>
                        <p>APY Total: {(parseFloat(baseAPY) + parseFloat(bonusAPY)).toFixed(2)}%</p>
                    </div>

                    {/* Section Staking */}
                    <div className="staking-card staking-actions">
                        <h3>Staking</h3>
                        <div className="input-group">
                            <input
                                type="number"
                                className="staking-input"
                                placeholder="Montant à staker"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                            />
                            <button 
                                className="staking-button"
                                onClick={handleStake}
                                disabled={isLoading || !stakeAmount}
                            >
                                Stake
                            </button>
                        </div>
                    </div>

                    {/* Section Unstaking */}
                    <div className="staking-card unstaking-actions">
                        <h3>Unstaking</h3>
                        <div className="input-group">
                            <input
                                type="number"
                                className="staking-input"
                                placeholder="Montant à unstaker"
                                value={unstakeAmount}
                                onChange={(e) => setUnstakeAmount(e.target.value)}
                            />
                            <button 
                                className="staking-button"
                                onClick={handleUnstake}
                                disabled={isLoading || !unstakeAmount}
                            >
                                Unstake
                            </button>
                        </div>
                    </div>

                    {/* Section Récompenses */}
                    <div className="staking-card rewards-actions">
                        <h3>Récompenses</h3>
                        <button 
                            className="staking-button claim-button"
                            onClick={handleClaimRewards}
                            disabled={isLoading || parseFloat(pendingRewards) <= 0}
                        >
                            Réclamer {pendingRewards} $GR33D
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Staking;
