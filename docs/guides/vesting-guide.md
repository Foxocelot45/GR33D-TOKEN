# GR33D Vesting Guide

## Overview
This document details all vesting schedules and token release mechanisms for the GR33D token ecosystem. All times are in UTC.

## Initial Release - November 24, 2024 12:00 UTC

### LP Providers Initial Distribution
| Investor | LP Investment | Initial Release | Vesting Amount |
|----------|---------------|-----------------|----------------|
| LP1      | $500         | 20,000 GR33D    | 20,000 GR33D  |
| LP2      | $500         | 20,000 GR33D    | 20,000 GR33D  |
| LP3      | $1,000       | 40,000 GR33D    | 40,000 GR33D  |
| Team     | $1,000       | 40,000 GR33D    | 40,000 GR33D  |

### Team Bonus Initial Distribution
- Initial Release: 40,000 GR33D
- Vesting Amount: 40,000 GR33D
- Total Day 1: 160,000 GR33D

## Vesting Schedules

### LP Providers & Team Vesting
- **Vesting Start**: November 24, 2024
- **Release Schedule**:
  * Month 1 (December 24, 2024): 80,000 GR33D
  * Month 2 (January 23, 2025): 80,000 GR33D
- **Total Vesting**: 160,000 GR33D

### Marketing Supply
- **Total Amount**: 200,000 GR33D
- **Lock Period**: 1 month
- **Distribution**: ~13,333 GR33D/month
- **Duration**: 15 months
- **Period**: December 2024 - February 2026
- **Release Schedule**:
  * Lock Until: December 24, 2024
  * Monthly Release: ~13,333 GR33D
  * Final Month Adjustment: Remaining balance

### Development Fund
- **Total Amount**: 400,000 GR33D
- **Lock Period**: 2 months
- **Distribution**: 33,333 GR33D/month
- **Duration**: 12 months
- **Period**: February 2025 - January 2026
- **Release Schedule**:
  * Lock Until: January 24, 2025
  * Monthly Release: 33,333 GR33D
  * Final Month: 33,337 GR33D (adjustment)

### Trading Reserve
- **Total Amount**: 2,410,000 GR33D
- **Lock Period**: 3 months
- **Distribution**: ~50,200 GR33D/month
- **Duration**: 48 months
- **Start Date**: March 2025
- **Release Schedule**:
  * Lock Until: February 24, 2025
  * Monthly Release: 50,200 GR33D
  * Final Month Adjustment: Remaining balance

## Monthly Distribution Timeline

### Phase 1 - Launch (November 24, 2024)
```
Initial Distribution:
- LP Providers: 120,000 GR33D
- Team Bonus: 40,000 GR33D
Total: 160,000 GR33D
```

### Phase 2 - Month 1 (December 24, 2024)
```
- LP/Team Vesting: 80,000 GR33D
- Marketing: 13,333 GR33D
Total: 93,333 GR33D
```

### Phase 3 - Month 2 (January 23, 2025)
```
- LP/Team Final: 80,000 GR33D
- Marketing: 13,333 GR33D
Total: 93,333 GR33D
```

### Phase 4 - Month 3 (February 22, 2025)
```
- Marketing: 13,333 GR33D
- Dev Fund: 33,333 GR33D
Total: 46,666 GR33D
```

### Phase 5 - Month 4+ (March 2025 onwards)
```
Monthly Distribution:
- Trading Reserve: 50,200 GR33D
- Dev Fund: 33,333 GR33D (until January 2026)
- Marketing: 13,333 GR33D (until February 2026)
```

## Claiming Process

### Technical Implementation
```solidity
function claimVestedTokens() external {
    require(block.timestamp >= vestingSchedule[msg.sender].nextUnlock, "Too early");
    require(vestingSchedule[msg.sender].remainingAmount > 0, "No tokens to claim");
    
    uint256 claimableAmount = calculateClaimableAmount(msg.sender);
    vestingSchedule[msg.sender].remainingAmount -= claimableAmount;
    vestingSchedule[msg.sender].nextUnlock = calculateNextUnlock(msg.sender);
    
    require(token.transfer(msg.sender, claimableAmount), "Transfer failed");
    emit VestingClaimed(msg.sender, claimableAmount);
}
```

### Claim Instructions
1. Connect wallet to platform
2. Verify vesting schedule
3. Check available tokens
4. Initiate claim transaction
5. Confirm in wallet

## Security Measures

### Vesting Contract Security
- Multi-signature requirement for setup
- Time-locked releases
- Anti-gaming mechanisms
- Emergency pause capability
- Real-time monitoring

### Claim Security
- Rate limiting
- Address verification
- Amount validation
- Transaction monitoring
- Event logging

## Monitoring & Verification

### Real-Time Tracking
- Total tokens released
- Remaining vesting balances
- Claim history
- Lock status
- Distribution schedule

### Verification Tools
- Etherscan verification
- Smart contract events
- Distribution logs
- Claim records

## Support & Emergency Procedures

### Standard Support
- Email: thegr33dysclub@gmail.com
- Telegram (FR): https://t.me/+ST4-blQBoLs5NWI8
- Telegram (EN): https://t.me/+WipDE7pBxF41Mzc0

### Emergency Contact
- Technical Issues: https://t.me/GreedyFoxxx
- Claim Problems: https://t.me/GreedyFoxxx
- Contract Issues: https://t.me/GreedyFoxxx

## Schedule Updates
This vesting schedule is final and cannot be modified after contract deployment. All dates and amounts are immutable once set in the smart contract.
