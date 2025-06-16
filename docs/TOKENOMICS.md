# $GR33D Tokenomics

## Current Token Metrics (March 2025)

### Supply Statistics
- **Initial Supply**: 5,000,000 $GR33D
- **Current Supply**: 4,999,164.96 $GR33D
- **Total Burned**: 835.04 $GR33D (0.017% of initial supply)
- **Circulating Supply**: ~159,000 $GR33D (3.18% of total)
- **Contract Balance**: 4,840,165 $GR33D (96.82% of total)
- **Maximum Burnable**: 2,000,000 $GR33D (40% of initial supply)

### Distribution Status
- **Staked Tokens**: 4,708.28 $GR33D
- **LP Staked**: 4.34 LP tokens
- **Rewards Pool**: 999,993.58 $GR33D

## Art Ecosystem Token Utility

The $GR33D token is designed as a multifunctional utility token specifically engineered to support the art marketplace ecosystem:

### Primary Art Market Utilities
- **Royalty Medium**: Used for automated perpetual royalty payments to artists
- **Authentication Verification**: Backs the blockchain certification system for artworks
- **Marketplace Transactions**: Primary currency for art platform transactions
- **Artist Incentives**: Distribution program for early-adopting artists
- **Collector Benefits**: Exclusive access to limited artwork releases

### Supporting Ecosystem Functions
- **Governance**: Voting rights within the upcoming DAO (Q3-Q4 2025)
- **Fee Reduction**: Holders receive discounted platform fees
- **Priority Access**: Early access to new features and artwork releases
- **Future Multi-Chain Evaluation**: Cross-chain compatibility assessment for expanded art market reach (2026+)

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
- **Status**: Lock ended, vesting active, reinitialized March 20, 2025
- **Current ID**: 2 (assigned during reinitialization)

### Dev Fund
- **Total Amount**: 400,000 GR33D
- **Initial Lock**: 2 months (until January 24, 2025)
- **Distribution**: 33,333 GR33D/month over 12 months
- **Period**: February 2025 - January 2026
- **Status**: Lock ended, vesting active, reinitialized March 20, 2025
- **Current ID**: 3 (assigned during reinitialization)

### Trading Reserve
- **Total Amount**: 2,410,000 GR33D
- **Initial Lock**: 3 months (until February 24, 2025)
- **Distribution**: ~50,200 GR33D/month over 48 months
- **Start Date**: March 2025
- **Status**: Lock ended, vesting active, 101 GR33D released to date
- **Current ID**: 0 (maintained original ID)

## Burn Mechanism

### Token Burning
- **Standard Transaction Burn**: 0.5% of transaction amount
- **Staking Transaction Burn**: 0.25% of transaction amount
- **Maximum Burn Cap**: 40% of total supply (2,000,000 GR33D)
- **Current Burned Amount**: 835.04 GR33D (0.017% of initial supply)
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

## Art Marketplace Financial Structure (Planned)

### Primary Sale Revenue Distribution
- **Artist**: 90-97.5%
- **Platform Fee**: 2.5-10% (variable based on art category)
- **Distribution**: Immediate, transparent, on-chain

### Secondary Sale Royalties
- **Artist Perpetual Royalty**: 2.5-7.5% (artist-configurable)
- **Platform Fee**: 2.5%
- **Automated Payment**: Smart contract-enforced payments to original artist
- **Transparency**: Full on-chain tracking of all sales and royalties

## Distribution Timeline

### 2024 (Completed)
- [x] November 24: Initial distribution (160,000 GR33D)
- [x] December 24: LP/Team vesting (80,000 GR33D) & Marketing start (13,333 GR33D)

### 2025 (In Progress)
- [x] January 23: LP/Team final (80,000 GR33D) & Marketing (13,333 GR33D)
- [x] February 22: Dev Fund start (33,333 GR33D) & Marketing (13,333 GR33D)
- [x] March 20: Vesting schedules reinitialization
- [ ] March-December: Monthly distributions of ~96,866 GR33D:
  * Trading Reserve: 50,200 GR33D/month
  * Dev Fund: 33,333 GR33D/month (until January 2026)
  * Marketing: 13,333 GR33D/month (until February 2026)

### 2026
- [ ] January-February: Final marketing distributions
- [ ] March 2026 onward: Trading Reserve only (50,200 GR33D/month until 2029)

## Market Information

### Trading Data
- **Contract Address**: 0xC3b2990027217b9970b2d526aa11Ba3f223eb39C
- **Uniswap Pair**: 0x8a1D8f57261e8832CE1D7C525Df76dbe002B2e25
- **Liquidity Status**: Active on Uniswap V2, locked via Team Finance (March 2025)
- **Initial Liquidity**: 150,000 GR33D + ~0.88 ETH (~$3,000 at launch)

### Security Controls
- **Contract Implementation**: V2 deployed December 24, 2024
- **Framework**: OpenZeppelin (UUPS Upgradeable)
- **Solidity Version**: 0.8.20
- **Gas Optimization**: Struct packing for reduced gas costs

## Token Utility in Art Ecosystem

### Current Utility
- **Staking Rewards**: Earn passive income through flexible or locked staking
- **LP Rewards**: Enhanced returns for liquidity providers
- **Burning Mechanism**: Deflationary pressure through transaction burns

### Art Platform Utility (Planned Q3-Q4 2025)
- **Artwork Certification**: Blockchain-verified authentication system for art pieces
- **Royalty Distribution**: Automated payment system for artist royalties
- **Governance Rights**: DAO participation with voting power (Q3-Q4 2025)
- **Reduced Platform Fees**: Stakers receive discounted fees on the art marketplace
- **Future Multi-Chain Art Market**: Art certification and transactions evaluation for multiple chains (2026+)

### Artist Incentives
- **Creator Staking Bonuses**: Enhanced staking rewards for verified artists
- **Early Adopter Rewards**: Token distributions for early platform artists
- **Exhibition Support**: Funding for physical exhibitions through DAO
- **Collaborative Creation**: Token-backed initiatives for artistic collaborations
