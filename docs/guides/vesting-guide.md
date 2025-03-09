# GR33D Vesting Guide

## Overview
This document details all vesting schedules and token release mechanisms for the GR33D token ecosystem. The V2 upgrade has enhanced the security and efficiency of the vesting system while maintaining the original distribution schedule. All times are in UTC.

## Vesting Schedules

### LP Providers & Team Vesting
- **Vesting Start**: November 24, 2024
- **Release Schedule**:
  * Month 1 (December 24, 2024): 80,000 GR33D
  * Month 2 (January 23, 2025): 80,000 GR33D
- **Total Vesting**: 160,000 GR33D
- **Status**: Complete as of January 23, 2025

### Marketing Supply
- **Total Amount**: 200,000 GR33D
- **Lock Period**: 1 month (until December 24, 2024)
- **Distribution**: ~13,333 GR33D/month
- **Duration**: 15 months
- **Period**: December 2024 - February 2026
- **Current Status**: Active, lock period ended

### Development Fund
- **Total Amount**: 400,000 GR33D
- **Lock Period**: 2 months (until January 24, 2025)
- **Distribution**: 33,333 GR33D/month
- **Duration**: 12 months
- **Period**: February 2025 - January 2026
- **Current Status**: Active, lock period ended

### Trading Reserve
- **Total Amount**: 2,410,000 GR33D
- **Lock Period**: 3 months (until February 24, 2025)
- **Distribution**: ~50,200 GR33D/month
- **Duration**: 48 months
- **Start Date**: March 2025
- **Current Status**: Active, lock period ended

## Key Distribution Milestones

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

## V2 Vesting Enhancements

### Improved Security Features
- **Enhanced access controls**: Additional verification steps for vesting beneficiaries
- **Anti-flash loan protection**: Protection against exploitation attempts
- **Blacklist system integration**: Vesting can be secured against malicious actors
- **Gas optimization**: Reduced transaction costs for vesting operations
- **Position tracking**: Improved monitoring of vesting schedules

### Structure of VestingSchedule
```solidity
struct VestingSchedule {
    uint256 totalAmount;      // Total tokens allocated to this vesting
    uint256 weeklyAmount;     // Weekly allocation rate
    uint256 startTime;        // When the vesting begins
    uint256 lockEndTime;      // When tokens become claimable
    uint256 lastClaimTime;    // Last time tokens were claimed
    uint256 endTime;          // When vesting schedule ends
    uint256 claimed;          // Amount already claimed
    bool isLP;                // Whether this is for a LP provider
    bool isActive;            // Whether this vesting is active
}
```

## Claiming Process

### Technical Implementation
The V2 upgrade brings improvements to the claiming process, including gas optimization and enhanced security checks:

```solidity
function batchReleaseVesting(
    address[] calldata beneficiaries,
    uint256[] calldata vestingIds,
    uint256[] calldata amounts
) external onlyOwner nonReentrant whenNotPaused {
    // Batch processing of vesting releases
    // Enhanced security checks and optimized gas usage
}

function calculateAvailableVesting(
    address beneficiary,
    uint256 vestingId
) public view validVesting(beneficiary, vestingId) returns (uint256) {
    // Improved calculation with additional security checks
}
```

### Claim Instructions
1. Connect wallet to the platform
2. Navigate to the "Vesting" section
3. View your available vesting schedules
4. Check claimable tokens for each schedule
5. Request claim transaction
6. Confirm in wallet
7. Receive tokens directly to your wallet

## Security Measures

### Vesting Contract Security
- **Multi-signature requirement**: Critical operations require multiple confirmations
- **Time-locked releases**: Enforced waiting periods before claiming
- **Anti-gaming mechanisms**: Protections against exploitation
- **Emergency pause capability**: Contract can be paused if issues are detected
- **Blacklist integration**: Protection against malicious actors

### Claim Security
- **Rate limiting**: Controls to prevent abuse
- **Address verification**: Validation of beneficiary addresses
- **Amount validation**: Checks to ensure claim amounts are correct
- **Transaction monitoring**: Real-time tracking of claim transactions
- **Event logging**: Complete audit trail of all vesting activities

## Monitoring & Verification

### Real-Time Tracking
Through the V2 upgrade, beneficiaries can now easily track:
- Total tokens released to date
- Remaining vesting balances
- Complete claim history
- Current lock status
- Projected distribution schedule

### Verification Tools
- **Etherscan verification**: All claims can be verified on-chain
- **Smart contract events**: Transparent logging of all vesting activities
- **Distribution logs**: Complete history of token distributions
- **Claim records**: Detailed record of all claims made

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
The vesting schedule is final and immutable once set in the smart contract. All dates and amounts are established at initialization and cannot be modified. The V2 upgrade has maintained the integrity of all existing vesting schedules while enhancing security and efficiency.
