// src/constants/contract.js

export const PROXY_ADDRESS = "0xeBaFE97112C5008249fb6fF4bCAf0a603d39e2a7";

export const CONTRACT_ABI = [
    // Fonctions de lecture
    "function balanceOf(address) view returns (uint256)",
    "function getStakeInfo(address) view returns (uint256 stakedAmount, uint256 pendingRewards, uint256 contractBalance, uint256 rewardsPool)",
    "function BASE_APY() view returns (uint256)",
    "function MAX_BONUS_APY() view returns (uint256)",
    
    // Fonctions d'écriture
    "function stake(uint256) external",
    "function unstake(uint256) external",
    "function claimRewards() external",
    
    // Events
    "event Staked(address indexed user, uint256 amount)",
    "event Unstaked(address indexed user, uint256 amount)",
    "event RewardsClaimed(address indexed user, uint256 amount)"
];
