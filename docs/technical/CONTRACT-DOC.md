# Smart Contracts

## Contract Addresses

### Mainnet (Current Deployment)
```solidity
// Core Contracts
GR33D_TOKEN_PROXY = "0xC3b2990027217b9970b2d526aa11Ba3f223eb39C"
GR33D_IMPLEMENTATION_V2 = "0xdb2e16605c672bd0d743142e10ce2c1b12a876a4"
UNISWAP_PAIR = "0x8a1D8f57261e8832CE1D7C525Df76dbe002B2e25"
```

### Important Addresses
```solidity
// Administrative
ADMIN_ADDRESS = "0x5A46d0F5bbce72D9665689cDAe9993824260b882"
TEAM_ADDRESS = "0xeF616AF55083Cb6BDF355a34224FFE829100D9b2"
DEV_MARKETING = "0x4ddbb990c286ee71cd128899949e506f78eb08C0"

// LP Providers
LP1_ADDRESS = "0x0D7083D8dCdF1DBc72D1CcD2653f9fDB1981505E"
LP2_ADDRESS = "0xcaDf2f51CB897cb4E476435772c3Ff3572f924e2"
LP3_ADDRESS = "0xBFc831C5CcF3FE6bF03e0051C72B1066c7A136d9"
```

## Contract Specifications

### Token Contract (GR33DVaultV2)
```solidity
// Basic Token Info
name = "GR33DVAULT"
symbol = "GR33D"
decimals = 18
totalSupply = 5_000_000 * 10**18
currentSupply = 4_999_164.96 * 10**18  // After burn (March 2025)

// Transaction Limits
STANDARD_TX_LIMIT = 15_000 * 10**18
STAKING_TX_LIMIT = 50_000 * 10**18
MAX_WALLET = 100_000 * 10**18

// Burn Configuration
STANDARD_BURN_RATE = 50      // 0.5%
STAKING_BURN_RATE = 25       // 0.25%
MAX_BURN_SUPPLY = 2_000_000 * 10**18  // 40% of supply
totalBurned = 835.04 * 10**18  // Current burned amount (March 2025)

// Rewards Configuration
INITIAL_REWARDS_POOL = 1_000_000 * 10**18
currentRewardsPool = 999_993.58 * 10**18  // As of March 2025

// Security
MIN_TIME_BETWEEN_TXS = 20    // seconds
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
    uint96 positionId;              // Unique identifier
    uint96 amount;                  // Staked amount
    uint64 timestamp;               // Start time
    uint64 lockEndTime;             // Lock expiration (if locked)
    uint64 lastRewardCalculation;   // Last reward calc timestamp
    uint64 lastWeeklyReward;        // Last weekly reward timestamp
    uint32 bonusApy;                // Lock bonus APY in basis points
    uint128 pendingRewards;         // Accumulated rewards
    bool isLocked;                  // Whether position is locked
    bool exists;                    // Position exists flag
    uint8 padding;                  // For struct alignment
}
```

### VestingSchedule
```solidity
struct VestingSchedule {
    uint256 totalAmount;      // Total tokens in vesting
    uint256 weeklyAmount;     // Weekly release rate
    uint256 startTime;        // Start timestamp
    uint256 lockEndTime;      // Lock expiration
    uint256 lastClaimTime;    // Last claim timestamp
    uint256 endTime;          // End of vesting
    uint256 claimed;          // Amount claimed so far
    bool isLP;                // Whether LP provider vesting
    bool isActive;            // Whether vesting is active
}
```

### LPStakeInfo
```solidity
struct LPStakeInfo {
    uint256 amount;                 // LP tokens staked
    uint256 timestamp;              // Stake start time
    uint256 lastRewardCalculation;  // Last reward calc
    uint256 pendingRewards;         // Accumulated rewards
    uint256 totalClaimed;           // Total claimed rewards
    uint256 bonusEndTime;           // End of launch bonus
}
```

## Post-V2 Upgrade Vesting Reinitialization

### March 2025 Vesting Update
Following the V2 upgrade, vesting schedules were reinitialized on March 20, 2025:

```solidity
// New active vesting schedules created with isActive = true
// Each beneficiary received new vesting IDs
// Team: ID 1 - 80,000 GR33D
// DEV_MARKETING: ID 2 - 200,000 GR33D (Marketing)
// DEV_MARKETING: ID 3 - 400,000 GR33D (Dev Fund)
// LP1: ID 1 - 20,000 GR33D
// LP2: ID 1 - 20,000 GR33D
// LP3: ID 1 - 40,000 GR33D

// ADMIN (Trading Reserve): ID 0 - 2,410,000 GR33D
// Remains with isActive = false but functions properly
// with releaseTradeReserveToPool function
```

### Technical Notes
The ADMIN Trading Reserve (ID 0) was kept inactive but remains functional because the `releaseTradeReserveToPool` function checks only `schedule.totalAmount == TRADING_RESERVE_AMOUNT` without using the `validVesting` modifier that checks for `isActive`.

## Key Functions

### Token Core Functions
```solidity
// Transfer with burn mechanism and security checks
function _transfer(address from, address to, uint256 amount) internal virtual override;

// Admin functions
function adminClaimInitialLiquidity() external onlyOwner;
function setupInitialLiquidity(address _uniswapPair) external onlyOwner;
function lockInitialLiquidity() external onlyOwner;
function enableTrading() external onlyOwner;
```

### Staking System (V2)
```solidity
// Position-based staking
function stake(uint256 amount) external nonReentrant whenNotPaused notBlacklisted;
function stakeWithLock(uint256 amount, uint256 lockDuration) external nonReentrant whenNotPaused notBlacklisted;
function unstakePosition(uint256 positionId) external nonReentrant whenNotPaused;

// View functions
function getStakePositions(address user) external view returns (StakePosition[] memory);
function getTotalUserStake(address user) external view returns (uint256);
```

### LP Staking
```solidity
// LP staking operations
function stakeLPTokens(uint256 amount) external nonReentrant whenNotPaused notBlacklisted antiFlashLoan;
function unstakeLPTokens(uint256 amount) external nonReentrant whenNotPaused;

// View functions
function getLPStakeInfo(address user) external view returns (uint256 amount, uint256 pendingRewards, uint256 bonusEndTime);
```

### Vesting System
```solidity
// Vesting management
function initializeVesting(address beneficiary, uint256 totalAmount, uint256 vestingWeeks, uint256 lockDuration) external onlyOwner nonReentrant;
function batchReleaseVesting(address[] calldata beneficiaries, uint256[] calldata vestingIds, uint256[] calldata amounts) external onlyOwner nonReentrant whenNotPaused;
function releaseTradeReserveToPool(uint256 amount) external onlyOwner nonReentrant whenNotPaused;

// View functions
function getVestingInfo(address wallet, uint256 vestingId) external view validVesting(wallet, vestingId) returns (VestingSchedule memory schedule, uint256 available);
function calculateAvailableVesting(address beneficiary, uint256 vestingId) public view validVesting(beneficiary, vestingId) returns (uint256);
```

### Security Functions (V2)
```solidity
// Whitelist management
function setWhitelist(address account, bool maxWalletExempt_, bool txLimitExempt_) external onlyOwner;

// Blacklist system (new in V2)
function updateBlacklist(address account, bool blacklisted) external onlyOwner;

// Emergency controls
function pause() external onlyOwner;
function unpause() external onlyOwner;
function emergencyWithdraw() external onlyOwner nonReentrant;

// Upgrade system (UUPS)
function _authorizeUpgrade(address) internal override view onlyOwner;
```

## Key Modifiers

```solidity
// Transaction security
modifier whenTradingEnabled();
modifier antiFlashLoan();  // New in V2
modifier notBlacklisted(); // New in V2
modifier nonReentrant();
modifier whenNotPaused();
modifier onlyOwner();

// Vesting validation
modifier validVesting(address beneficiary, uint256 vestingId);
```

## Events

```solidity
// Staking events
event Staked(address indexed user, uint256 amount, uint256 lockDuration);
event Unstaked(address indexed user, uint256 amount);
event RewardsClaimed(address indexed user, uint256 amount);
event StakePositionCreated(address indexed user, uint256 positionId, uint256 amount);
event StakePositionUpdated(address indexed user, uint256 positionId, uint256 amount);

// LP staking events
event LPStaked(address indexed user, uint256 amount);
event LPUnstaked(address indexed user, uint256 amount);
event LPRewardsClaimed(address indexed user, uint256 amount);

// Vesting events
event VestingScheduleCreated(address indexed beneficiary, uint256 totalAmount, uint256 weeklyAmount);
event VestingClaimed(address indexed beneficiary, uint256 amount);
event VestingBatchReleased(uint256 beneficiariesCount, uint256 totalAmount);

// Contract events
event LiquidityLocked(uint256 timestamp);
event TradingEnabled(uint256 timestamp);
event InitialLiquiditySetup(address indexed pair, uint256 lpAmount);
event InitialLiquidityLocked(uint256 lpAmount, uint256 timestamp);
event TradeReserveReleasedToPool(uint256 amount, uint256 timestamp, uint256 remainingReserve);
event InitialAllocationClaimed(address indexed beneficiary, uint256 amount);

// Security events
event WhitelistUpdated(address indexed account, bool maxWalletExempt, bool txLimitExempt);
event BlacklistUpdated(address indexed account, bool status);
event Paused(uint256 timestamp);
event Unpaused(uint256 timestamp);
event EmergencyWithdraw(address indexed user, uint256 amount);
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
  - Flash loan protection
  - Blacklist system
  - Gas optimizations
  - Emergency functions

### Vesting Reinitialization
- **Date**: March 20, 2025
- **Process**: Creation of new active vesting entries with equivalent parameters
- **Impact**: Restored access to vesting functions for all beneficiaries

## Future Art Marketplace Integration

The contract architecture has been designed with future expansion in mind, particularly for integration with the planned art marketplace. Key integration points include:

### Art Certification
- Authentication mechanisms for verifying artwork ownership
- Royalty distribution system for artists
- Provenance tracking for complete ownership history

### Planned Smart Contract Extensions
- Royalty management contract (Q3 2025)
- Art certification registry (Q3 2025)
- DAO governance for marketplace parameters (Q3 2025)
- Cross-chain bridges for expanded art market reach (Q3-Q4 2025)

## Integration & Development

### Contract Interaction Requirements
```javascript
// Required Packages
const { ethers } = require("ethers");
const PROVIDER_URL = "https://mainnet.infura.io/v3/YOUR_INFURA_KEY";
const provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
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
// Important: Use the new vesting IDs from March 2025 reinitialization
const vestingInfo = await gr33dContract.getVestingInfo(beneficiaryAddress, newVestingId);
console.log("Vesting schedule:", vestingInfo.schedule);
console.log("Available to claim:", ethers.utils.formatEther(vestingInfo.available));
```

### Vesting Monitoring Script
```javascript
// Script to check all vestings for an address
const checkVestings = async (address) => {
  const vestingCount = await gr33dContract.vestingCount(address);
  console.log(`Address ${address} has ${vestingCount} vestings`);
  
  for (let i = 0; i < vestingCount; i++) {
    try {
      const vestingInfo = await gr33dContract.getVestingInfo(address, i);
      console.log(`Vesting #${i} (Active):`, vestingInfo);
    } catch (e) {
      console.log(`Vesting #${i} (Inactive): Error - ${e.message}`);
      
      // Direct access via the mapping (works for inactive vestings)
      const rawVesting = await gr33dContract.vestingSchedules(address, i);
      console.log(`Vesting #${i} (Raw Data):`, rawVesting);
    }
  }
};
```

### Development Requirements
```javascript
// Required Packages for Development
"@openzeppelin/contracts-upgradeable": "^4.9.3",
"@openzeppelin/hardhat-upgrades": "^1.28.0",
"@nomiclabs/hardhat-ethers": "^2.2.3",
"hardhat": "^2.19.1",
"solidity": "0.8.20"
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
function pause() external onlyOwner;
function unpause() external onlyOwner;

// Emergency Withdrawal
function emergencyWithdraw() external onlyOwner whenPaused;
```

## Security Notes

The contract includes several security features:

1. **Transaction Protection**: Enhanced validation to prevent various types of attacks
2. **Blacklist System**: Allows blocking malicious addresses from interacting with the contract
3. **Transaction Rate Limiting**: Prevents spam attacks with a 20-second cooldown between transactions
4. **ReentrancyGuard**: Prevents reentrancy attacks on all sensitive functions
5. **Emergency Circuit Breakers**: Allow pausing the contract in case of detected vulnerabilities
6. **Access Controls**: Strict permission management for administrative functions
7. **Secure Upgrade Pattern**: UUPS implementation with proper authorization checks

This documentation reflects the current state of the GR33DVaultV2 contract deployed on Ethereum Mainnet as of March 2025, including the vesting reinitialization performed on March 20, 2025.
