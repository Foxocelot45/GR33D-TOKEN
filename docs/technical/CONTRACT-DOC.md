# Smart Contracts

## Contract Addresses

### Mainnet (Deployment: November 24, 2024)
```solidity
// Core Contracts
GREEDYS_TOKEN = "[To be deployed]"
GREEDYS_STAKING = "[To be deployed]"
UNISWAP_PAIR = "[To be created]"

// Vesting Contracts
MARKETING_VESTING = "[To be deployed]"
DEV_FUND_VESTING = "[To be deployed]"
TRADING_VESTING = "[To be deployed]"
LP_VESTING = "[To be deployed]"
```

### Important Addresses
```solidity
// Administrative
ADMIN_ADDRESS = "0x5A46d0F5bbce72D9665689cDAe9993824260b882"
TEAM_ADDRESS = "0xeF616AF55083Cb6BDF355a34224FFE829100D9b2"
DEV_MARKETING = "0x4ddbb990c286ee71cd128899949e506f78eb08C0"

// LP Providers
LP_INVESTOR_1 = "0x0D7083D8dCdF1DBc72D1CcD2653f9fDB1981505E"
LP_INVESTOR_2 = "0xcaDf2f51CB897cb4E476435772c3Ff3572f924e2"
LP_INVESTOR_3 = "[TBA]"
```

## Contract Specifications

### Main Token Contract (GreedysClubV2_4_0)
```solidity
// Basic Token Info
name = "GREEDYSCLUB"
symbol = "GR33D"
decimals = 18
totalSupply = 5_000_000 * 10**18

// Transaction Limits
STANDARD_TX_LIMIT = 15_000 * 10**18
STAKING_TX_LIMIT = 50_000 * 10**18
MAX_WALLET = 100_000 * 10**18

// Burn Configuration
STANDARD_BURN_RATE = 50      // 0.5%
STAKING_BURN_RATE = 25       // 0.25%
MAX_BURN_SUPPLY = 2_000_000 * 10**18  // 40% of supply

// Security
MIN_TIME_BETWEEN_TXS = 20    // seconds
```

### Staking Contract
```solidity
// Base Configuration
BASE_APY = 2000             // 20%
LP_APY = 8000              // 80%
MAX_DAILY_REWARD = 200     // 2%

// Lock Periods
LOCK_PERIOD_90_DAYS = 90 days   // +5%
LOCK_PERIOD_180_DAYS = 180 days // +10%
LOCK_PERIOD_270_DAYS = 270 days // +15%
LOCK_PERIOD_360_DAYS = 360 days // +20%

// Pool Thresholds
THRESHOLD_1 = 750_000 * 10**18  // 100% APY
THRESHOLD_2 = 500_000 * 10**18  // 75% APY
THRESHOLD_3 = 250_000 * 10**18  // 50% APY
```

## Key Functions

### Token Contract
```solidity
// Core Functions
function transfer(address to, uint256 amount) external returns (bool)
function approve(address spender, uint256 amount) external returns (bool)
function transferFrom(address from, address to, uint256 amount) external returns (bool)

// Staking Interface
function stake(uint256 amount) external
function unstake(uint256 amount) external
function claimRewards() external

// Admin Functions
function setStakingContract(address _stakingContract) external onlyOwner
function addLPPool(address lpToken) external onlyOwner
```

### Staking Contract
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

## Contract Security

### Implementation Pattern
```solidity
// Upgradeable Pattern
UUPS (Universal Upgradeable Proxy Standard)
OpenZeppelin Implementation v4.9.3

// Security Features
ReentrancyGuard
Ownable
Pausable (emergency only)
```

### Security Measures
- Multi-signature authorization
- Time-locked functions
- Rate limiting systems
- Anti-bot protection
- Emergency circuit breakers

## Vesting Details

### Marketing Vesting
```solidity
Total: 200,000 GR33D
Lock: 1 month
Distribution: ~13,333 GR33D/month
Duration: 15 months
Start: December 24, 2024
```

### Dev Fund Vesting
```solidity
Total: 400,000 GR33D
Lock: 2 months
Distribution: 33,333 GR33D/month
Duration: 12 months
Start: February 22, 2025
```

### Trading Reserve
```solidity
Total: 2,410,000 GR33D
Lock: 3 months
Distribution: ~50,200 GR33D/month
Start: March 2025
```

## Emergency Procedures

### Emergency Contacts
```
Technical Emergencies: https://t.me/GreedyFoxxx
Response Time: < 5 minutes for critical issues
```

### Critical Functions
```solidity
// Emergency Pause
function pause() external onlyOwner
function unpause() external onlyOwner

// Emergency Withdrawal
function emergencyWithdraw() external onlyOwner whenPaused
```

## Contract Verification

### Etherscan Verification
- All contract source code will be verified on Etherscan
- Contract interfaces will be published
- Contract ABIs will be available
- Read/Write function guides will be provided

### Post-Deployment Verification
```
□ Contract deployment verified
□ Function permissions confirmed
□ Event emissions checked
□ Initial parameters validated
□ Security features tested
```

## Integration & Development

### Development Requirements
```javascript
// Required Packages
@openzeppelin/contracts-upgradeable: "^4.9.3"
@openzeppelin/hardhat-upgrades: "^1.28.0"
@nomiclabs/hardhat-ethers: "^2.2.3"
```

### Testing Environment
```javascript
// Test Network
network: "sepolia"
hardhat: "^2.19.1"
solidity: "0.8.20"
```

This documentation will be updated with contract addresses and additional verification information after deployment on November 24, 2024. Always verify contract addresses against official sources and documentation.

*Note: Contract audit reports and detailed technical documentation will be available after deployment.*
