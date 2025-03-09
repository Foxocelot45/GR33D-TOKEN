# TOKENOMICS.md

# $GR33D Tokenomics

## Current Token Metrics (March 2025)

### Supply Statistics
- **Initial Supply**: 5,000,000 $GR33D
- **Current Supply**: 4,999,220.52 $GR33D
- **Total Burned**: 779.48 $GR33D (0.016% of initial supply)
- **Circulating Supply**: 148,622.67 $GR33D (2.97% of total)
- **Contract Balance**: 4,850,597.85 $GR33D (97.03% of total)
- **Maximum Burnable**: 2,000,000 $GR33D (40% of initial supply)

### Distribution Status
- **Staked Tokens**: 600.0 $GR33D
- **LP Staked**: 1.25 LP tokens
- **Rewards Pool**: 999,997.85 $GR33D

## Initial Distribution

### Supply Allocation
- **Liquidity Pool**: 150,000 GR33D (3%)
- **Rewards Pool**: 1,000,000 GR33D (20%)
- **LP Rewards**: 500,000 GR33D (10%)
- **Marketing**: 200,000 GR33D (4%)
- **Dev Fund**: 400,000 GR33D (8%)
- **Trading Reserve**: 2,410,000 GR33D (48.2%)
- **Team & LP Initial**: 340,000 GR33D (6.8%)

## Vesting Schedules

### Marketing Supply
- **Total Amount**: 200,000 GR33D
- **Initial Lock**: 1 month (until December 24, 2024)
- **Distribution**: ~13,333 GR33D/month over 15 months
- **Period**: December 2024 - February 2026
- **Status**: Lock ended, vesting active

### Dev Fund
- **Total Amount**: 400,000 GR33D
- **Initial Lock**: 2 months (until January 24, 2025)
- **Distribution**: 33,333 GR33D/month over 12 months
- **Period**: February 2025 - January 2026
- **Status**: Lock ended, vesting active

### Trading Reserve
- **Total Amount**: 2,410,000 GR33D
- **Initial Lock**: 3 months (until February 24, 2025)
- **Distribution**: ~50,200 GR33D/month over 48 months
- **Start Date**: March 2025
- **Status**: Lock ended, vesting active

## Burn Mechanism

### Token Burning
- **Standard Transaction Burn**: 0.5% of transaction amount
- **Staking Transaction Burn**: 0.25% of transaction amount
- **Maximum Burn Cap**: 40% of total supply (2,000,000 GR33D)
- **Current Burned Amount**: 779.48 GR33D (0.016% of initial supply)
- **Burn Recipient**: Tokens are permanently removed from circulation

### Burn Exemptions
- Transactions involving the contract itself are exempt from burns
- Whitelisted addresses can be exempted from burns at admin discretion

## Staking System

### Base Mechanics
- **Foundation APY**: 20%
- **Maximum APY**: 40% (with lock bonuses)
- **Daily Rewards**: Calculated continuously
- **Reward Source**: Dedicated rewards pool of 1,000,000 GR33D

### Position-Based Staking (V2)
- **Multiple Positions**: Users can create multiple staking positions
- **Individual Settings**: Each position has its own lock period and rewards
- **Minimum Stake**: 100 GR33D per position
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

## LP Rewards Program

### Base Structure
- **Standard APY**: 80%
- **Reward Source**: Dedicated allocation from rewards pool
- **Weekly Reward Distribution**: Continuous calculation
- **Proof of Liquidity**: LP tokens must be staked to earn rewards

### Launch Phase Bonuses (Completed)
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

## Transaction Limits & Security

### Standard Transactions
- **Maximum Transaction**: 15,000 GR33D (0.3% of total supply)
- **Maximum Wallet Balance**: 100,000 GR33D (2% of total supply)
- **Anti-Bot Delay**: 20 seconds between transactions
- **Anti-Flash Loan Protection**: Transactions must originate from EOA (tx.origin == msg.sender)

### Staking Transactions
- **Maximum Stake Transaction**: 50,000 GR33D (1% of total supply)
- **Staking Burn Rate**: Reduced to 0.25% (half of standard rate)
- **No Cooldown**: Multiple staking positions can be created simultaneously

### Security Measures
- **Blacklist System**: Protection against malicious actors
- **Whitelist Exemptions**: Critical addresses can be exempted from limits
- **Emergency Circuit Breakers**: Contract can be paused in emergencies
- **Access Controls**: Strict permission management for administrative functions

## Distribution Timeline

### Phase 1 - Launch (Completed)
- **Date**: November 24, 2024
- **Initial Distribution**: 160,000 GR33D
  * LP Providers: 120,000 GR33D
  * Team: 40,000 GR33D

### Phase 2 - Month 1 (Completed)
- **Date**: December 24, 2024
- **Distribution**: 93,333 GR33D
  * LP/Team Vesting: 80,000 GR33D
  * Marketing: 13,333 GR33D

### Phase 3 - Month 2 (Completed)
- **Date**: January 23, 2025
- **Distribution**: 93,333 GR33D
  * LP/Team Final: 80,000 GR33D
  * Marketing: 13,333 GR33D

### Phase 4 - Month 3 (Completed)
- **Date**: February 22, 2025
- **Distribution**: 46,666 GR33D
  * Marketing: 13,333 GR33D
  * Dev Fund: 33,333 GR33D

### Phase 5 - Month 4+ (Current)
- **Date**: March 2025 onwards
- **Monthly Distribution**: ~96,866 GR33D
  * Trading Reserve: 50,200 GR33D
  * Dev Fund: 33,333 GR33D (until January 2026)
  * Marketing: 13,333 GR33D (until February 2026)

## Market Information

### Trading Data
- **Contract Address**: 0xC3b2990027217b9970b2d526aa11Ba3f223eb39C
- **Uniswap Pair**: 0x8a1D8f57261e8832CE1D7C525Df76dbe002B2e25
- **Liquidity Status**: Active on Uniswap V2
- **Initial Liquidity**: 150,000 GR33D + ~0.88 ETH (~$3,000 at launch)

### Security Controls
- **Contract Implementation**: V2 deployed December 24, 2024
- **Framework**: OpenZeppelin (UUPS Upgradeable)
- **Solidity Version**: 0.8.20
- **Gas Optimization**: Struct packing for reduced gas costs

## Token Utility

### Current Utility
- **Staking Rewards**: Earn passive income through flexible or locked staking
- **LP Rewards**: Enhanced returns for liquidity providers
- **Burning Mechanism**: Deflationary pressure through transaction burns

### Future Utility (Planned)
- **Governance Rights**: DAO participation with voting power (Q3 2025)
- **NFT Platform Access**: Privileged access to upcoming NFT marketplace (Q2-Q3 2025)
- **Reduced Fees**: Discounted fees across the ecosystem
- **Cross-Chain Utility**: Functionality on BSC and Solana (Q3-Q4 2025)
