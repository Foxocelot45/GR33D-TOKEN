# Technical Documentation

## Smart Contract Architecture

### Core Contract Structure (V2)
```solidity
// Main Token Contract
contract GR33DVaultV2 is 
    ERC20Upgradeable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable,
    PausableUpgradeable,
    UUPSUpgradeable 
{
    // Enhanced from V1 with optimized data structures and security features
}
```

### Key Contract Addresses
```solidity
// Mainnet Deployment (November 24, 2024)
PROXY_ADDRESS = "0xC3b2990027217b9970b2d526aa11Ba3f223eb39C"
V1_IMPLEMENTATION = "0x148497C73FE8B0185bd0615067791cd80d3bdda8"
V2_IMPLEMENTATION = "0xdb2e16605c672bd0d743142e10ce2c1b12a876a4"
UNISWAP_PAIR = "0x8a1D8f57261e8832CE1D7C525Df76dbe002B2e25"
```

### Base Configuration
```solidity
// Token Parameters
name = "GR33DVAULT"
symbol = "GR33D"
decimals = 18
totalSupply = 5_000_000 * 10**18

// Transaction Limits
STANDARD_TX_LIMIT = 15_000 * 10**18
STAKING_TX_LIMIT = 50_000 * 10**18
MAX_WALLET = 100_000 * 10**18    // 2% of supply

// Burn Configuration
STANDARD_BURN_RATE = 50          // 0.5%
STAKING_BURN_RATE = 25           // 0.25%
MAX_BURN_SUPPLY = 2_000_000 * 10**18  // 40% of supply

// Security
MIN_TIME_BETWEEN_TXS = 20        // seconds
```

## V2 Architecture Enhancements

### 1. Position-Based Staking System
```solidity
// V2 Staking Structure
struct StakePosition {
    uint96 positionId;
    uint96 amount;
    uint64 timestamp;
    uint64 lockEndTime;
    uint64 lastRewardCalculation;
    uint64 lastWeeklyReward;
    uint32 bonusApy;
    uint128 pendingRewards;
    bool isLocked;
    bool exists;
    uint8 padding;
}

// Position Management
mapping(address => StakePosition[]) public userStakePositions;
mapping(address => uint256) public nextPositionId;

// New Staking Functions
function _createStakePosition(uint256 amount, uint256 lockDuration) internal;
function unstakePosition(uint256 positionId) external nonReentrant whenNotPaused;
function getStakePositions(address user) external view returns (StakePosition[] memory);
function getTotalUserStake(address user) external view returns (uint256);
```

### 2. Enhanced Security Measures
```solidity
// Flash Loan Protection
modifier antiFlashLoan() {
    require(tx.origin == msg.sender, "Flash loan detected");
    _;
}

// Blacklist System
mapping(address => bool) public isBlacklisted;
modifier notBlacklisted() {
    require(!isBlacklisted[msg.sender], "Address blacklisted");
    _;
}
function updateBlacklist(address account, bool blacklisted) external onlyOwner;

// Emergency Functions
function pause() external onlyOwner;
function unpause() external onlyOwner;
function emergencyWithdraw() external onlyOwner nonReentrant;
```

### 3. Gas Optimizations
- **Struct Packing**: Reduced storage requirements through efficient data packing
- **Memory Usage**: Optimized for reduced gas consumption
- **Operation Batching**: Support for batch operations to reduce gas costs
- **Storage Optimization**: Minimized storage operations

### 4. Advanced Vesting System
```solidity
// Enhanced Vesting Structure
struct VestingSchedule {
    uint256 totalAmount;
    uint256 weeklyAmount;
    uint256 startTime;
    uint256 lockEndTime;
    uint256 lastClaimTime;
    uint256 endTime;
    uint256 claimed;
    bool isLP;
    bool isActive;
}

// Vesting Management
mapping(address => mapping(uint256 => VestingSchedule)) public vestingSchedules;
mapping(address => uint256) public vestingCount;
mapping(address => uint256) public weeklyVestingAmounts;

// Vesting Functions
function initializeVesting(address beneficiary, uint256 totalAmount, uint256 vestingWeeks, uint256 lockDuration) external onlyOwner nonReentrant;
function batchReleaseVesting(address[] calldata beneficiaries, uint256[] calldata vestingIds, uint256[] calldata amounts) external onlyOwner nonReentrant whenNotPaused;
function calculateAvailableVesting(address beneficiary, uint256 vestingId) public view validVesting(beneficiary, vestingId) returns (uint256);
```

## Contract Components

### 1. Core ERC-20 Functionality
- Standard token operations with enhanced security
- Customized transfer function with burn mechanism
- Rate limiting and anti-bot protections
- Whitelist system for specific addresses

### 2. Staking System
```solidity
// Base Staking Configuration
BASE_APY = 2000             // 20%
LP_APY = 8000               // 80%
MAX_DAILY_REWARD = 200      // 2%

// Reward Pool
INITIAL_REWARDS_POOL = 1_000_000 * 10**18
currentRewardsPool = INITIAL_REWARDS_POOL

// Thresholds for APY Adjustment
THRESHOLD_1 = 750_000 * 10**18  // 100% APY
THRESHOLD_2 = 500_000 * 10**18  // 75% APY
THRESHOLD_3 = 250_000 * 10**18  // 50% APY
```

### 3. LP Staking System
```solidity
// LP Staking Structure
struct LPStakeInfo {
    uint256 amount;
    uint256 timestamp;
    uint256 lastRewardCalculation;
    uint256 pendingRewards;
    uint256 totalClaimed;
    uint256 bonusEndTime;
}

// LP Staking Management
mapping(address => LPStakeInfo) public lpStakes;
uint256 public totalLPStaked;

// LP Staking Functions
function stakeLPTokens(uint256 amount) external nonReentrant whenNotPaused notBlacklisted antiFlashLoan;
function unstakeLPTokens(uint256 amount) external nonReentrant whenNotPaused;
```

### 4. Vesting & Distribution
- Marketing vesting (200,000 GR33D over 15 months)
- Development fund (400,000 GR33D over 12 months)
- Trading reserve (2,410,000 GR33D over 48 months)
- LP provider vesting system

### 5. Security Framework
- Pause/Unpause capability for emergencies
- UUPS upgrade pattern for future enhancements
- Reentrancy protection on all critical functions
- Access control system with ownership
- Anti-flash loan protection
- Blacklist system for malicious actors

## Technical Implementation Details

### Upgradability Protocol
The contract follows the UUPS (Universal Upgradeable Proxy Standard) pattern:
```solidity
// UUPS Implementation
function _authorizeUpgrade(address) internal override view onlyOwner {
    require(!initialLiquidityLocked, "Initial liquidity locked");
}
```

### Upgrade Timeline
- **V1 Deployment**: November 24, 2024
- **V2 Upgrade**: December 24, 2024
- **Future Upgrades**: Subject to DAO governance (planned Q3 2025)

### Main V2 Improvements
1. Position-based staking system for flexible management
2. Enhanced security with anti-flash loan and blacklist systems
3. Optimized gas usage through struct packing
4. Emergency functions for risk mitigation
5. Improved vesting management system

## Development Environment

### Recommended Setup
```javascript
// Required Node.js Environment
node >= 16.0.0
npm >= 7.0.0

// Dependencies
@openzeppelin/contracts-upgradeable: "^4.9.3"
@openzeppelin/hardhat-upgrades: "^1.28.0"
@nomiclabs/hardhat-ethers: "^2.2.3"
hardhat: "^2.19.1"
solidity: "0.8.20"
```

### Testing & Deployment
```javascript
// Hardhat Configuration
module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100
      }
    }
  },
  networks: {
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [PRIVATE_KEY],
      gasPrice: "auto"
    }
  }
}
```

## Security Considerations

### Critical Security Patterns
- **Check-Effects-Interactions**: Followed throughout the codebase
- **Pull Payment Pattern**: Used for reward distributions
- **Secure Upgrade Pattern**: UUPS with proper authorizations
- **Access Control**: Granular permissions system
- **Input Validation**: Thorough validation of all parameters
- **Error Handling**: Explicit error messages and proper reverts

### Security Audits
- Pre-deployment audit of V1 completed
- V2 upgrade review performed
- Regular security assessments scheduled

## Event System

### Critical Events
```solidity
// Core Events
event Transfer(address indexed from, address indexed to, uint256 amount);
event Approval(address indexed owner, address indexed spender, uint256 amount);

// Staking Events
event Staked(address indexed user, uint256 amount, uint256 lockDuration);
event Unstaked(address indexed user, uint256 amount);
event RewardsClaimed(address indexed user, uint256 amount);
event StakePositionCreated(address indexed user, uint256 positionId, uint256 amount);
event StakePositionUpdated(address indexed user, uint256 positionId, uint256 amount);

// LP Staking Events
event LPStaked(address indexed user, uint256 amount);
event LPUnstaked(address indexed user, uint256 amount);
event LPRewardsClaimed(address indexed user, uint256 amount);

// Vesting Events
event VestingScheduleCreated(address indexed beneficiary, uint256 totalAmount, uint256 weeklyAmount);
event VestingClaimed(address indexed beneficiary, uint256 amount);
event VestingBatchReleased(uint256 beneficiariesCount, uint256 totalAmount);

// Security Events
event Paused(uint256 timestamp);
event Unpaused(uint256 timestamp);
event BlacklistUpdated(address indexed account, bool status);
event EmergencyWithdraw(address indexed user, uint256 amount);
```

### Event Monitoring
Critical events should be monitored for:
- Unusual transaction patterns
- Large transfers
- Multiple failed transactions
- Blacklist updates
- Emergency operations

## Future Considerations

### Planned Technical Improvements
- Cross-chain bridging capabilities (BSC, Solana)
- DAO governance integration
- Enhanced staking rewards system
- NFT platform integration
- Mobile-optimized interfaces

### Development Roadmap
- **Q1 2025**: Preparation for DAO implementation
- **Q2-Q3 2025**: NFT platform development
- **Q3-Q4 2025**: Cross-chain bridge deployment
- **Q1 2026**: DEX/AMM platform development

This technical documentation represents the current architecture as of the V2 upgrade. Future upgrades may modify or enhance these specifications.
