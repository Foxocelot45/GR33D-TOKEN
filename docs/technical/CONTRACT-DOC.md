# Smart Contracts

## Contract Addresses

### Mainnet (Current Deployment)
```solidity
// Core Contracts
GR33D_TOKEN_PROXY = "0xC3b2990027217b9970b2d526aa11Ba3f223eb39C"
GR33D_IMPLEMENTATION_V2 = "0xdb2e16605c672bd0d743142e10ce2c1b12a876a4"
UNISWAP_PAIR = "0x8a1D8f57261e8832CE1D7C525Df76dbe002B2e25"
```

## Contract Specifications

### Token Contract (GR33DVaultV2)
```solidity
// Basic Token Info
name = "GR33DVAULT"
symbol = "GR33D"
decimals = 18
totalSupply = 5_000_000 * 10**18
currentSupply = 4_999_220.52 * 10**18  // After burn

// Transaction Limits
STANDARD_TX_LIMIT = 15_000 * 10**18
STAKING_TX_LIMIT = 50_000 * 10**18
MAX_WALLET = 100_000 * 10**18

// Burn Configuration
STANDARD_BURN_RATE = 50      // 0.5%
STAKING_BURN_RATE = 25       // 0.25%
MAX_BURN_SUPPLY = 2_000_000 * 10**18  // 40% of supply
totalBurned = 779.48 * 10**18  // Current burned amount

// Rewards Configuration
INITIAL_REWARDS_POOL = 1_000_000 * 10**18
currentRewardsPool = 999_997.85 * 10**18
```

### Staking System (V2)
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

// Launch Bonuses (for LP Staking)
WEEK1_BONUS = 4000  // +40%
WEEK2_BONUS = 2000  // +20%
```

## Key Structures

### StakePosition (V2)
```solidity
struct StakePosition {
    // Position identifier and amount data
    // Timing information 
    // Bonus and reward tracking
    // Status flags
}
```

### VestingSchedule
```solidity
struct VestingSchedule {
    // Amount information
    // Timing data
    // Status tracking
}
```

### LPStakeInfo
```solidity
struct LPStakeInfo {
    // LP stake amount and timing
    // Reward calculation data
    // Bonus tracking
}
```

## Key Functions

### Token Core Functions
```solidity
// Transfer with burn mechanism and security checks
function _transfer(address from, address to, uint256 amount) internal virtual override;

// Admin functions for liquidity and trading management
```

### Staking System (V2)
```solidity
// Position-based staking
function stake(uint256 amount) external;
function stakeWithLock(uint256 amount, uint256 lockDuration) external;
function unstakePosition(uint256 positionId) external;

// View functions
function getStakePositions(address user) external view returns (StakePosition[] memory);
function getTotalUserStake(address user) external view returns (uint256);
```

### LP Staking
```solidity
// LP staking operations
function stakeLPTokens(uint256 amount) external;
function unstakeLPTokens(uint256 amount) external;

// View functions
function getLPStakeInfo(address user) external view returns (uint256 amount, uint256 pendingRewards, uint256 bonusEndTime);
```

### Vesting System
```solidity
// Vesting management
function initializeVesting(address beneficiary, uint256 totalAmount, uint256 vestingWeeks, uint256 lockDuration) external;
function releaseTradeReserveToPool(uint256 amount) external;

// View functions
function getVestingInfo(address wallet, uint256 vestingId) external view returns (VestingSchedule memory schedule, uint256 available);
function calculateAvailableVesting(address beneficiary, uint256 vestingId) public view returns (uint256);
```

### Security Functions (V2)
```solidity
// Access management
function setWhitelist(address account, bool maxWalletExempt_, bool txLimitExempt_) external;

// Emergency controls
function pause() external;
function unpause() external;

// Upgrade system (UUPS)
function _authorizeUpgrade(address) internal override view;
```

## Key Modifiers

```solidity
// Security modifiers
modifier whenTradingEnabled();
modifier nonReentrant();
modifier whenNotPaused();
modifier onlyOwner();

// Validation modifier
modifier validVesting(address beneficiary, uint256 vestingId);
```

## Events

```solidity
// Staking events
event Staked(address indexed user, uint256 amount, uint256 lockDuration);
event Unstaked(address indexed user, uint256 amount);
event RewardsClaimed(address indexed user, uint256 amount);
event StakePositionCreated(address indexed user, uint256 positionId, uint256 amount);

// LP staking events
event LPStaked(address indexed user, uint256 amount);
event LPUnstaked(address indexed user, uint256 amount);
event LPRewardsClaimed(address indexed user, uint256 amount);

// Vesting events
event VestingScheduleCreated(address indexed beneficiary, uint256 totalAmount, uint256 weeklyAmount);
event VestingClaimed(address indexed beneficiary, uint256 amount);

// Contract events
event LiquidityLocked(uint256 timestamp);
event TradingEnabled(uint256 timestamp);
event InitialLiquiditySetup(address indexed pair, uint256 lpAmount);
event InitialLiquidityLocked(uint256 lpAmount, uint256 timestamp);

// Security events
event Paused(uint256 timestamp);
event Unpaused(uint256 timestamp);
event BurnExecuted(uint256 amount, uint256 newTotalBurned, uint256 timestamp);
```

## Contract Deployment History

### Initial Deployment (V1)
- **Date**: November 24, 2024
- **Implementation Address**: 0x148497C73FE8B0185bd0615067791cd80d3bdda8
- **Trading Enabled**: November 24, 2024

### V2 Upgrade
- **Date**: December 24, 2024
- **Implementation Address**: 0xdb2e16605c672bd0d743142e10ce2c1b12a876a4
- **Key Improvements**: 
  - Position-based staking system
  - Enhanced security features
  - Gas optimizations
  - Emergency functions

## Integration & Development

### Contract Interaction Requirements
```javascript
// Required Packages
const { ethers } = require("ethers");
const PROVIDER_URL = "https://mainnet.infura.io/v3/YOUR_INFURA_KEY";
const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet("PRIVATE_KEY_PLACEHOLDER", provider);
const GR33D_ABI = require("./GR33DVaultV2.json");
const gr33dContract = new ethers.Contract(GR33D_TOKEN_PROXY, GR33D_ABI, wallet);
```

### Common Function Calls
```javascript
// Staking example
const stakeAmount = ethers.utils.parseEther("1000");
const tx = await gr33dContract.stake(stakeAmount, {
  gasLimit: 300000,
});
await tx.wait();

// Position-based staking
const positions = await gr33dContract.getStakePositions(userAddress);
console.log("User positions:", positions);

// LP staking example
const lpAmount = ethers.utils.parseEther("0.1"); // LP tokens
const lpTx = await gr33dContract.stakeLPTokens(lpAmount, {
  gasLimit: 300000,
});
await lpTx.wait();

// Vesting check example
const vestingInfo = await gr33dContract.getVestingInfo(beneficiaryAddress, 0);
console.log("Vesting schedule:", vestingInfo.schedule);
console.log("Available to claim:", ethers.utils.formatEther(vestingInfo.available));
```

## Security Notes

The contract includes several security features:

1. **Anti-Flash Loan Protection**: Prevents exploitation through sophisticated attack vectors
2. **Transaction Rate Limiting**: Prevents spam attacks with cooldown periods
3. **ReentrancyGuard**: Prevents reentrancy attacks on all sensitive functions
4. **Emergency Circuit Breakers**: Allow pausing the contract if needed
5. **Access Controls**: Permission management for administrative functions
6. **Secure Upgrade Pattern**: UUPS implementation with proper authorization checks
7. **Regular Security Reviews**: Contract undergoes periodic security assessments

This documentation reflects the current state of the GR33DVaultV2 contract deployed on Ethereum Mainnet. All function signatures and event definitions are accurate as of the V2 upgrade on December 24, 2024.

---

**Note**: Implementation details of security mechanisms are intentionally generalized in this public documentation. For more detailed information, please contact the team through official channels.
