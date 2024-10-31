import React, { useState, useEffect } from 'react';
import './Staking.css';
import { ethers } from 'ethers';

// Configuration du contrat avec ABI mis à jour pour le lock period
const PROXY_ADDRESS = "0xeBaFE97112C5008249fb6fF4bCAf0a603d39e2a7";
const CONTRACT_ABI = [
    // Fonctions de lecture
    "function balanceOf(address) view returns (uint256)",
    "function getStakeInfo(address) view returns (uint256 stakedAmount, uint256 pendingRewards, uint256 contractBalance, uint256 rewardsPool)",
    "function BASE_APY() view returns (uint256)",
    "function getStakeDuration(address) view returns (uint256)",
    
    // Fonctions d'écriture
    "function stake(uint256 amount, uint256 lockPeriod) external",
    "function unstake(uint256) external",
    "function claimRewards() external"
];

// Nouveau composant pour la notification (existant)
const Notification = ({ message, type, onClose }) => (
    <div className={`notification ${type}`}>
        {message}
        <button className="notification-close" onClick={onClose}>&times;</button>
    </div>
);

// Nouveau composant pour la modale de confirmation (existant)
const ConfirmationModal = ({ onConfirm, onCancel, message }) => (
    <div className="modal-overlay">
        <div className="modal-content">
            <h3>Confirmation</h3>
            <p>{message}</p>
            <div className="modal-buttons">
                <button className="modal-button confirm" onClick={onConfirm}>Confirmer</button>
                <button className="modal-button cancel" onClick={onCancel}>Annuler</button>
            </div>
        </div>
    </div>
);

function Staking() {
    // États existants
    const [userAddress, setUserAddress] = useState(null);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [error, setError] = useState(null);
    const [balance, setBalance] = useState('0');
    const [stakedAmount, setStakedAmount] = useState('0');
    const [pendingRewards, setPendingRewards] = useState('0');
    const [baseAPY] = useState('20.00');
    const [stakeAmount, setStakeAmount] = useState('');
    const [unstakeAmount, setUnstakeAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Nouveaux états pour les améliorations UI et lock period
    const [notification, setNotification] = useState(null);
    const [networkName, setNetworkName] = useState('');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationConfig, setConfirmationConfig] = useState({});
    const [selectedLockPeriod, setSelectedLockPeriod] = useState(0);
    const [currentBonusAPY, setCurrentBonusAPY] = useState('0.00');

    // Options de période de lock
    const lockPeriodOptions = [
        { value: 0, label: 'Pas de lock', bonus: '0.00' },
        { value: 90, label: '3 mois', bonus: '5.00' },
        { value: 180, label: '6 mois', bonus: '10.00' },
        { value: 270, label: '9 mois', bonus: '15.00' },
        { value: 360, label: '12 mois', bonus: '20.00' }
    ];

    // Fonction pour afficher une notification (existant)
    const showNotification = (message, type = 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 5000);
    };

    // Fonction existante mise à jour pour inclure le bonus APY
    const updateUserData = async (contract, address) => {
        try {
            const balance = await contract.balanceOf(address);
            const stakeInfo = await contract.getStakeInfo(address);
            const stakeDuration = await contract.getStakeDuration(address);
            
            setBalance(ethers.utils.formatEther(balance));
            setStakedAmount(ethers.utils.formatEther(stakeInfo.stakedAmount));
            setPendingRewards(ethers.utils.formatEther(stakeInfo.pendingRewards));
            
            // Calculer le bonus APY basé sur la durée de stake
            const months = Math.floor(stakeDuration.toNumber() / (30 * 24 * 60 * 60));
            if (months >= 12) setCurrentBonusAPY('20.00');
            else if (months >= 9) setCurrentBonusAPY('15.00');
            else if (months >= 6) setCurrentBonusAPY('10.00');
            else if (months >= 3) setCurrentBonusAPY('5.00');
            else setCurrentBonusAPY('0.00');
            
        } catch (error) {
            console.error("Erreur lors de la mise à jour des données:", error);
            showNotification("Erreur lors de la mise à jour des données", "error");
        }
    };

    // Fonction de connexion mise à jour (existant)
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
            
            // Vérification du réseau
            const network = await provider.getNetwork();
            if (network.chainId !== 11155111) {
                throw new Error("Veuillez vous connecter au réseau Sepolia");
            }
            setNetworkName("Testnet Sepolia");
            
            const contract = new ethers.Contract(PROXY_ADDRESS, CONTRACT_ABI, signer);
            
            setProvider(provider);
            setContract(contract);
            setUserAddress(address);

            await updateUserData(contract, address);
            showNotification("Wallet connecté avec succès", "success");
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            setError(error.message);
            showNotification(error.message, "error");
        }
    };

    // Fonction de staking mise à jour pour inclure la période de lock
    const handleStake = async () => {
        if (!contract || !stakeAmount) return;
        
        const lockPeriodInSeconds = selectedLockPeriod * 24 * 60 * 60; // Conversion en secondes
        const selectedOption = lockPeriodOptions.find(opt => opt.value === selectedLockPeriod);
        
        setConfirmationConfig({
            message: `Êtes-vous sûr de vouloir staker ${stakeAmount} $GR33D ${selectedOption.value > 0 ? `pour ${selectedOption.label} (+${selectedOption.bonus}% APY)` : 'sans période de lock'} ?`,
            onConfirm: async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const amount = ethers.utils.parseEther(stakeAmount);
                    const tx = await contract.stake(amount, lockPeriodInSeconds);
                    showNotification("Transaction en cours...", "info");
                    await tx.wait();
                    await updateUserData(contract, userAddress);
                    setStakeAmount('');
                    showNotification("Staking effectué avec succès!", "success");
                } catch (error) {
                    setError("Erreur lors du staking: " + error.message);
                    showNotification("Erreur lors du staking", "error");
                } finally {
                    setIsLoading(false);
                }
            }
        });
        setShowConfirmation(true);
    };

    // Fonctions existantes (handleUnstake, handleClaimRewards, etc.)
    const handleUnstake = async () => {
        if (!contract || !unstakeAmount) return;
        
        setConfirmationConfig({
            message: `Êtes-vous sûr de vouloir unstaker ${unstakeAmount} $GR33D ?`,
            onConfirm: async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const amount = ethers.utils.parseEther(unstakeAmount);
                    const tx = await contract.unstake(amount);
                    showNotification("Transaction en cours...", "info");
                    await tx.wait();
                    await updateUserData(contract, userAddress);
                    setUnstakeAmount('');
                    showNotification("Unstaking effectué avec succès!", "success");
                } catch (error) {
                    setError("Erreur lors de l'unstaking: " + error.message);
                    showNotification("Erreur lors de l'unstaking", "error");
                } finally {
                    setIsLoading(false);
                }
            }
        });
        setShowConfirmation(true);
    };

    const handleClaimRewards = async () => {
        if (!contract) return;
        
        setConfirmationConfig({
            message: `Voulez-vous réclamer ${pendingRewards} $GR33D de récompenses ?`,
            onConfirm: async () => {
                setIsLoading(true);
                setError(null);
                try {
                    const tx = await contract.claimRewards();
                    showNotification("Transaction en cours...", "info");
                    await tx.wait();
                    await updateUserData(contract, userAddress);
                    showNotification("Récompenses réclamées avec succès!", "success");
                } catch (error) {
                    setError("Erreur lors de la réclamation des récompenses: " + error.message);
                    showNotification("Erreur lors de la réclamation", "error");
                } finally {
                    setIsLoading(false);
                }
            }
        });
        setShowConfirmation(true);
    };

    // Effets existants
    useEffect(() => {
        if (contract && userAddress) {
            const interval = setInterval(() => {
                updateUserData(contract, userAddress);
            }, 30000);
            return () => clearInterval(interval);
        }
    }, [contract, userAddress]);

    useEffect(() => {
        if (window.ethereum) {
            window.ethereum.on('chainChanged', () => {
                window.location.reload();
            });
            window.ethereum.on('accountsChanged', () => {
                window.location.reload();
            });
        }
    }, []);

    return (
        <div className="staking-section">
            {/* Bannière de réseau */}
            {networkName && (
                <div className="network-banner">
                    Réseau actuel : {networkName}
                </div>
            )}

            {/* Notification */}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            {/* Modal de confirmation */}
            {showConfirmation && (
                <ConfirmationModal
                    message={confirmationConfig.message}
                    onConfirm={async () => {
                        setShowConfirmation(false);
                        await confirmationConfig.onConfirm();
                    }}
                    onCancel={() => setShowConfirmation(false)}
                />
            )}

            {/* Contenu existant */}
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
                        <p>APY Bonus actuel: +{currentBonusAPY}%</p>
                        <p>APY Total: {(parseFloat(baseAPY) + parseFloat(currentBonusAPY)).toFixed(2)}%</p>
                    </div>

                    {/* Section Staking avec sélecteur de période */}
                    <div className="staking-card staking-actions">
                        <h3>Staking</h3>
                        <div className="lock-period-selector">
                            <label>Période de lock:</label>
                            <select 
                                value={selectedLockPeriod}
                                onChange={(e) => setSelectedLockPeriod(Number(e.target.value))}
                                className="period-select"
                            >
                                {lockPeriodOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label} {option.value > 0 ? `(+${option.bonus}% APY)` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="input-group">
                            <input
                                type="number"
                                className="staking-input"
                                placeholder="Montant à staker"
                                value={stakeAmount}
                                onChange={(e) => setStakeAmount(e.target.value)}
                            />
                            <button 
                                className={`staking-button ${isLoading ? 'loading' : ''}`}
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
                                onChange={(e) => setUnstakeAmount(
