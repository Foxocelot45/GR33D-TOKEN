# GR33D Staking Guide

## Overview
This guide details the staking mechanisms of the GR33D token, including both standard staking and LP staking features.

## Standard Staking

### Base Mechanics
- **Foundation APY**: 20%
- **Maximum APY**: 40% (with lock bonuses)
- **Daily Rewards**: Calculated continuously
- **Minimum Stake**: No minimum
- **Maximum Stake**: 50,000 GR33D per transaction

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

### Launch Phase (First 14 Days)
- **Week 1**: 120% APY (80% Base + 40% Bonus)
- **Week 2**: 100% APY (80% Base + 20% Bonus)
- **Post-Launch**: 80% Base APY

### LP Pool Thresholds
| Pool Balance     | APY Rate |
|------------------|----------|
| >375,000 GR33D   | 80%      |
| >250,000 GR33D   | 60%      |
| >125,000 GR33D   | 40%      |
| <125,000 GR33D   | 20%      |

## Technical Details

### Staking Functions
```solidity
// Standard Staking
function stake(uint256 amount) external
function stakeWithLock(uint256 amount, uint256 lockPeriod) external
function unstake(uint256 amount) external
function claimRewards() external

// LP Staking
function stakeLPTokens(address lpToken, uint256 amount) external
function unstakeLPTokens(address lpToken, uint256 amount) external
function claimLPRewards(address lpToken) external
```

### Security Features
- ReentrancyGuard on all staking functions
- Daily reward caps
- Anti-gaming measures
- Emergency withdrawal system
- Real-time monitoring

## How to Stake

### Standard Staking
1. Connect wallet to platform
2. Choose stake amount
3. Select lock period (optional)
4. Confirm transaction
5. Monitor rewards accumulation

### LP Staking
1. Add liquidity to get LP tokens
2. Connect wallet to platform
3. Stake LP tokens
4. Choose lock period
5. Monitor enhanced rewards

## Important Notes

### Rewards
- Rewards accrue continuously
- Claim available anytime
- Compound options available
- Enhanced rates for longer locks

### Withdrawals
- No lock: withdraw anytime
- With lock: must wait until lock expires
- Emergency withdrawal available (with penalty)
- 20-second cooldown between transactions

### Risks & Security
- Smart contract audited
- Funds secured by timelock
- Anti-flash loan protection
- Rate limiting implemented

## FAQ

### Standard Staking
Q: How often are rewards calculated?
A: Rewards are calculated continuously and can be claimed at any time.

Q: Can I add to my locked stake?
A: Yes, but it will create a separate stake with its own lock period.

### LP Staking
Q: How do LP rewards differ from standard staking?
A: LP staking offers higher base APY (80%) with additional launch bonuses.

Q: Can I withdraw LP tokens early?
A: Yes, but you'll forfeit any unclaimed rewards.

## Support & Resources
- Technical Support: thegr33dysclub@gmail.com
- Telegram (FR): https://t.me/+ST4-blQBoLs5NWI8
- Telegram (EN): https://t.me/+WipDE7pBxF41Mzc0
- Real-time Monitoring: [Dashboard Link]
