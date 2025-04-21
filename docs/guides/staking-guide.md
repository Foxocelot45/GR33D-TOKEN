# GR33D Staking Guide

## Overview
This guide details the staking mechanisms of the GR33D token, which serve as an essential financial foundation for our art ecosystem. The staking system provides sustainable support for the upcoming art marketplace while offering token holders a way to earn rewards and participate in ecosystem governance.

## Position-Based Staking System (V2)

### What's New in V2
The V2 upgrade introduced a position-based staking system that offers:
- Multiple separate staking positions for flexible management
- Individual lock periods per position
- Enhanced security with anti-flash loan protection
- Gas optimizations for more efficient transactions
- Improved reward calculation accuracy

### Creating Staking Positions

#### Standard Staking Position
```solidity
function stake(uint256 amount) external
```
- Creates a flexible staking position with no lock period
- Minimum stake: 100 GR33D
- Base APY: 20%
- No withdrawal restrictions

#### Locked Staking Position
```solidity
function stakeWithLock(uint256 amount, uint256 lockDuration) external
```
- Creates a locked staking position with enhanced rewards
- Lock options: 90, 180, 270, or 360 days
- Minimum stake: 100 GR33D
- APY boost based on lock period
- Cannot unstake until lock period ends

### Managing Multiple Positions
- Each position is tracked separately with a unique ID
- Rewards are calculated individually per position
- Unstaking is performed per position rather than a global amount
- Position IDs can be retrieved via `getStakePositions(address user)`

### Current Metrics (March 2025)
- Total Staked: 4,708.28 GR33D
- Active Staking Positions: Multiple across users
- Rewards Pool: 999,993.58 GR33D
- Current Base APY: 20%

### Base Mechanics
- **Foundation APY**: 20%
- **Maximum APY**: 40% (with lock bonuses)
- **Daily Rewards**: Calculated continuously
- **Minimum Stake**: 100 GR33D
- **Maximum Stake Transaction**: 50,000 GR33D per transaction

### Lock Period Bonuses
| Lock Period | Bonus APY | Total APY |
|-------------|-----------|-----------|
| No Lock     | 0%        | 20%       |
| 90 Days     | +5%       | 25%       |
| 180 Days    | +10%      | 30%       |
| 270 Days    | +15%      | 35%       |
| 360 Days    | +20%      | 40%       |

### Pool Threshold APY Adjustments
| Pool Balance     | APY Multiplier |
|------------------|----------------|
| >750,000 GR33D   | 100%          |
| >500,000 GR33D   | 75%           |
| >250,000 GR33D   | 50%           |
| <250,000 GR33D   | 25%           |

## LP Staking

### Current Metrics (March 2025)
- Base APY: 80%
- Total LP Staked: 4.34 LP tokens
- Active LP Providers: 3

### LP Pool Thresholds
| Pool Balance     | APY Rate |
|------------------|----------|
| >375,000 GR33D   | 80%      |
| >250,000 GR33D   | 60%      |
| >125,000 GR33D   | 40%      |
| <125,000 GR33D   | 20%      |

## Technical Details

### Position Functions (V2)
```solidity
// Create a standard stake position
function stake(uint256 amount) external

// Create a locked stake position
function stakeWithLock(uint256 amount, uint256 lockDuration) external

// Unstake a specific position
function unstakePosition(uint256 positionId) external

// View all your staking positions
function getStakePositions(address user) external view returns (StakePosition[] memory)

// Get your total staked amount across all positions
function getTotalUserStake(address user) external view returns (uint256)
```

### LP Staking Functions
```solidity
// Stake LP tokens
function stakeLPTokens(uint256 amount) external

// Unstake LP tokens
function unstakeLPTokens(uint256 amount) external

// Get LP stake information
function getLPStakeInfo(address user) external view returns (
    uint256 amount,
    uint256 pendingRewards,
    uint256 bonusEndTime
)
```

### Security Features
- ReentrancyGuard on all staking functions
- Anti-flash loan protection
- Transaction delay requirements (20 seconds)
- Daily reward caps
- Blacklist system for security enforcement
- Emergency withdrawal system in case of contract pause

## Role in Art Ecosystem

### Supporting the Art Marketplace
The staking system serves as a crucial financial foundation for our upcoming art marketplace:

- **Sustainable Economics**: Provides stable financial support for the art platform
- **Governance Participation**: Stakers will have a voice in marketplace parameters via DAO
- **Royalty Pool Support**: Contributes to ensuring artist royalties are reliably distributed
- **Platform Development**: Helps fund ongoing development of artist-centric features
- **Community Alignment**: Creates long-term alignment between token holders and artists

### Future Benefits for Artists and Collectors
As the art marketplace launches, stakers will receive:

- **Reduced Marketplace Fees**: Stakers enjoy discounted fees on art transactions
- **Early Access**: Priority access to new artwork releases
- **Enhanced Voting Rights**: Greater influence in the governance of artist royalty rates
- **Artist Staking Bonuses**: Special staking programs for verified platform artists
- **Exhibition Funding**: DAO-governed funding for physical art exhibitions

## How to Stake

### Standard Staking
1. Connect wallet to platform
2. Navigate to the "Staking" tab
3. Enter the amount you wish to stake
4. Click "Stake" for flexible staking or "Stake with Lock" for locked staking
5. If choosing a locked position, select your preferred lock period
6. Confirm the transaction in your wallet
7. Your new staking position will appear in your dashboard

### Managing Multiple Positions
1. View all your positions in the "My Positions" section
2. Each position shows:
   - Position ID
   - Staked amount
   - Start date
   - Lock end date (if applicable)
   - Current rewards
   - APY (including bonuses)
3. To unstake, select a position and click "Unstake"
4. Locked positions cannot be unstaked until the lock period ends

### LP Staking
1. Add liquidity to the GR33D/ETH pool on Uniswap
2. Receive LP tokens representing your pool share
3. Go to the "LP Staking" tab on the platform
4. Enter the amount of LP tokens to stake
5. Confirm the transaction in your wallet
6. Monitor enhanced rewards in your dashboard

## Important Notes

### Rewards
- Rewards accrue continuously for each position
- Each position's rewards are calculated independently
- Rewards are claimed automatically when unstaking a position
- Maximum daily reward per position: 2% of staked amount

### Withdrawals
- No lock: withdraw any position anytime
- With lock: must wait until that position's lock expires
- Emergency withdrawal available (with penalty) if contract is paused
- 20-second cooldown between transactions

### Risks & Security
- Smart contract audited and upgraded to V2
- Anti-flash loan protection prevents exploitation
- Blacklist system protects against malicious activities
- Position-based system isolates risk between positions

## FAQ

### Standard Staking
Q: What happens to my existing stakes after the V2 upgrade?  
A: All existing stakes were automatically converted to positions in the new system. Your funds and rewards are safe.

Q: Can I have multiple positions with different lock periods?  
A: Yes, you can create as many positions as you want with various lock periods to diversify your staking strategy.

Q: What's the advantage of the position-based system?  
A: It provides greater flexibility, allows for diversification of lock periods, and enhances security by isolating each position.

Q: How does staking contribute to the art ecosystem?  
A: Staking provides financial stability for the ecosystem, ensuring reliable operation of the upcoming art marketplace, royalty systems, and creator compensation.

### LP Staking
Q: How do LP rewards differ from standard staking?  
A: LP staking offers higher base APY (80%) to reward those providing market liquidity.

Q: Can I withdraw LP tokens early?  
A: Yes, you can withdraw LP tokens anytime, but you'll forfeit any unclaimed rewards.

Q: How does LP staking support artists?  
A: By enhancing market liquidity, LP staking creates a stable trading environment for the token, which underpins the financial aspects of the art marketplace.

## Support & Resources
- Technical Support: thegr33dysclub@gmail.com
- Discord: https://discord.gg/FPGyuKxJx6
- Telegram (FR): https://t.me/+ST4-blQBoLs5NWI8
- Telegram (EN): https://t.me/+WipDE7pBxF41Mzc0
- Website: https://gr33d-vault.vercel.app/

*Last Updated: March 25, 2025*
