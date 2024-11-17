# Technical Documentation

## Smart Contract Architecture

### Core Contracts
```solidity
// Main Token Contract
contract GreedysClubV2_4_0 {
    // Base Configuration
    string public constant VERSION = "2.4.0";
    uint256 public constant INITIAL_SUPPLY = 5_000_000 * 10**18;
    uint256 public constant STANDARD_TX_LIMIT = 15_000 * 10**18;    // Updated from 25k
    uint256 public constant STAKING_TX_LIMIT = 50_000 * 10**18;
    uint256 public constant MAX_WALLET = 100_000 * 10**18;          // 2% of supply

    // Burn Configuration
    uint256 public constant STANDARD_BURN_RATE = 50;    // 0.5%
    uint256 public constant STAKING_BURN_RATE = 25;     // 0.25%
    uint256 public constant MAX_BURN_SUPPLY = 2_000_000 * 10**18;   // 40% max burn

    // Staking & Rewards
    uint256 public constant INITIAL_REWARDS_POOL = 1_000_000 * 10**18;
    uint256 public constant BASE_APY = 2000;            // 20%
    uint256 public constant LP_APY = 8000;             // 80%
}

// Vesting Implementation
contract GR33DVesting {
    struct VestingSchedule {
        // Marketing: 200k over 15 months (~13,333/month)
        // Dev Fund: 400k over 12 months (33,333/month)
        // Trading: 2.41M starting month 3 (~50,200/month)
    }
}
```

### Contract Dependencies
- OpenZeppelin 4.9.3
  * ERC20Upgradeable
  * UUPSUpgradeable
  * ReentrancyGuardUpgradeable

### Development Environment
```javascript
// Required Configuration
SOLIDITY_VERSION = "0.8.20"
NODE_VERSION = ">=16.0.0"
HARDHAT_VERSION = "^2.19.1"

// Testing Environment
NETWORK: "sepolia"

## Deployment Procedure

### Pre-Deployment Checklist
1. Contract Verification
   - [ ] All constants updated (tx limits, supply, etc.)
   - [ ] Vesting schedules configured
   - [ ] Security features tested
   - [ ] Gas optimization complete

2. Initial Setup
   - [ ] Deploy main contract
   - [ ] Configure vesting
   - [ ] Set up LP pool
   - [ ] Lock liquidity (permanent)

3. Verification Steps
   - [ ] Contract verification on Etherscan
   - [ ] Initial transfers confirmed
   - [ ] Security parameters active
   - [ ] Vesting schedules correct

## Security Implementation

### Core Security Features
1. Transaction Protection
   - 20-second cooldown between transactions
   - Maximum transaction limits
   - Wallet size caps
   - Anti-flash loan protection

2. Contract Security
   - UUPS upgrade pattern
   - ReentrancyGuard on all critical functions
   - Emergency pause capability
   - Event monitoring

3. Staking Security
   - Daily reward caps
   - Anti-gaming measures
   - Compound interest limits
   - Pool balance checks

## Testing Protocol

### Test Categories
1. Unit Tests
```javascript
describe("GR33D Token", function() {
    it("Should enforce transaction limits")
    it("Should calculate correct burn amounts")
    it("Should respect vesting schedules")
})
```

2. Integration Tests
```javascript
describe("Ecosystem Integration", function() {
    it("Should handle LP staking correctly")
    it("Should process vesting claims properly")
    it("Should maintain security limits")
})
```

### Test Coverage Requirements
- Core Functions: 100%
- Security Features: 100%
- Vesting Logic: 100%
- Staking Functions: 100%

## Monitoring & Maintenance

### Critical Metrics
1. Contract Health
   - Gas usage monitoring
   - Function call frequency
   - Error rate tracking
   - Pool balance monitoring

2. Security Monitoring
   - Transaction pattern analysis
   - Wallet behavior tracking
   - Anomaly detection
   - Emergency response readiness

### Maintenance Protocol
1. Regular Checks
   - Daily: Transaction metrics
   - Weekly: Pool balance review
   - Monthly: Full security audit

2. Emergency Procedures
   - Incident response plan
   - Communication protocols
   - Recovery procedures
   - Backup strategies
