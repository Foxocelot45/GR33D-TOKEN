# GR33D Vesting Guide

## Overview
This document details all vesting schedules and token release mechanisms for the GR33D token ecosystem. The V2 upgrade has enhanced the security and efficiency of the vesting system, and a March 2025 update has resolved issues with vesting access. All times are in UTC.

## Post-V2 Upgrade Vesting Reinitialization

### Vesting Status Reset (March 20, 2025)
Following the V2 upgrade in December 2024, all existing vesting schedules were inadvertently set to inactive (`isActive = false`). This technical issue prevented beneficiaries from accessing their funds via the standard contract functions which require the `validVesting` modifier that checks for `isActive == true`.

### Technical Solution Implemented
Rather than executing a costly new contract deployment, the team implemented a strategic vesting reinitialization on March 20, 2025:
- New vesting entries were created in the contract's vesting mapping
- These new entries maintained equivalent parameters to the original schedules
- Each new vesting was created with `isActive = true` status
- Original IDs remain in the contract but are no longer used (except for ADMIN)
- Each beneficiary received new vesting IDs for active schedules

### Special Case: ADMIN Vesting (Trading Reserve)
The ADMIN vesting (Trading Reserve) was deliberately kept as ID 0 with `isActive = false` because the `releaseTradeReserveToPool` function is programmed to specifically use ID 0. Testing confirmed this function remains operational despite the inactive status because it verifies only `schedule.totalAmount == TRADING_RESERVE_AMOUNT` without using the `validVesting` modifier.

## Current Vesting Schedules (As of March 25, 2025)

### Active Vestings (Current)
| Beneficiary | ID | Amount | Weekly Amount | Start Date | End Date | Lock End | Status |
|-------------|---|--------|---------------|------------|----------|----------|--------|
| TEAM | 1 | 80,000 GR33D | 10,000 GR33D | Mar 20, 2025 | May 15, 2025 | None | Active |
| DEV_MARKETING | 2 | 200,000 GR33D | 13,333.33 GR33D | Mar 20, 2025 | Jul 03, 2025 | Apr 19, 2025 | Active |
| DEV_MARKETING | 3 | 400,000 GR33D | 33,333.33 GR33D | Mar 20, 2025 | Jun 12, 2025 | May 19, 2025 | Active |
| LP1 | 1 | 20,000 GR33D | 2,500 GR33D | Mar 20, 2025 | May 15, 2025 | None | Active |
| LP2 | 1 | 20,000 GR33D | 2,500 GR33D | Mar 20, 2025 | May 15, 2025 | None | Active |
| LP3 | 1 | 40,000 GR33D | 5,000 GR33D | Mar 20, 2025 | May 15, 2025 | None | Active |

### Inactive Vestings (Historical)
| Beneficiary | ID | Total Amount | Claimed | Status | Notes |
|-------------|---|--------------|---------|--------|-------|
| ADMIN | 0 | 2,410,000 GR33D | 101 GR33D | Inactive but functional | Used by releaseTradeReserveToPool |
| TEAM | 0 | 80,000 GR33D | 0 GR33D | Inactive | Historical record only |
| DEV_MARKETING | 0 | 200,000 GR33D | 0 GR33D | Inactive | Historical record only |
| DEV_MARKETING | 1 | 400,000 GR33D | 0 GR33D | Inactive | Historical record only |
| LP1 | 0 | 20,000 GR33D | 0 GR33D | Inactive | Historical record only |
| LP2 | 0 | 20,000 GR33D | 0 GR33D | Inactive | Historical record only |
| LP3 | 0 | 40,000 GR33D | 0 GR33D | Inactive | Historical record only |

## Original Vesting Schedules (For Reference)

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
- **Current Status**: Active, lock period ended, reinitialized

### Development Fund
- **Total Amount**: 400,000 GR33D
- **Lock Period**: 2 months (until January 24, 2025)
- **Distribution**: 33,333 GR33D/month
- **Duration**: 12 months
- **Period**: February 2025 - January 2026
- **Current Status**: Active, lock period ended, reinitialized

### Trading Reserve
- **Total Amount**: 2,410,000 GR33D
- **Lock Period**: 3 months (until February 24, 2025)
- **Distribution**: ~50,200 GR33D/month
- **Duration**: 48 months
- **Start Date**: March 2025
- **Current Status**: Active, lock period ended, 101 GR33D released

## How to Access Current Vesting Information

### Using getVestingInfo (For Active Vestings)
```solidity
function getVestingInfo(
    address wallet,
    uint256 vestingId
) external view validVesting(wallet, vestingId) returns (
    VestingSchedule memory schedule,
    uint256 available
)
```
- Only works with active vestings (new IDs)
- Returns the full schedule and available amount to claim
- Will revert if used with inactive vestings or invalid IDs

### Using vestingSchedules (For All Vestings)
```solidity
mapping(address => mapping(uint256 => VestingSchedule)) public vestingSchedules;
```
- Direct access to all vesting data (active and inactive)
- Can be used to view any vesting by address and ID
- No validation requirements, returns raw data
- Recommended for accessing historical data

### Using calculateAvailableVesting
```solidity
function calculateAvailableVesting(
    address beneficiary,
    uint256 vestingId
) public view validVesting(beneficiary, vestingId) returns (uint256)
```
- Returns only the available amount to claim
- Only works with active vestings
- Will revert if used with inactive vestings

## Vesting Release Process

### Technical Implementation
The V2 upgrade includes optimized vesting release functionality:

```solidity
function batchReleaseVesting(
    address[] calldata beneficiaries,
    uint256[] calldata vestingIds,
    uint256[] calldata amounts
) external onlyOwner nonReentrant whenNotPaused
```

This function processes batch releases of vesting tokens with enhanced security checks and gas optimization. After the March 2025 reinitialization, this function works exclusively with the new vesting IDs.

### Trading Reserve Release (Special Case)
The trading reserve is released via the dedicated function:
```solidity
function releaseTradeReserveToPool(uint256 amount) external onlyOwner nonReentrant whenNotPaused
```
This function specifically uses the ADMIN address with vesting ID 0 and adds tokens directly to the Uniswap pool to enhance market liquidity. It works despite the `isActive = false` status.

### Claim Instructions
1. Connect wallet to the platform
2. Navigate to the "Vesting" section
3. View your available vesting schedules (active only)
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

### ADMIN Trading Reserve Protections
1. **Initial Lock Period**: 90 days before any release (until February 23, 2025)
2. **Availability Verification**: Prevents exceeding authorized amounts
3. **Transaction Limit**: Maximum 50,000 GR33D per release
4. **Administrative Control**: Requires owner signature
5. **Anti-Reentrancy Protection**: Prevents exploitation
6. **Contract State Validation**: Requires active (unpaused) contract

## Support & Emergency Procedures

### Standard Support
- Email: thegr33dysclub@gmail.com
- Telegram (FR): https://t.me/+ST4-blQBoLs5NWI8
- Telegram (EN): https://t.me/+WipDE7pBxF41Mzc0

### Emergency Contact
- Technical Issues: https://t.me/GreedyFoxxx
- Claim Problems: https://t.me/GreedyFoxxx
- Contract Issues: https://t.me/GreedyFoxxx

## Monitoring Vesting Status
The development team maintains a regular monitoring script that tracks all vesting activity. For transparency, a summary of vesting status is published monthly in the community channels.

```javascript
// Example monitoring code (simplified)
const checkVestings = async (address) => {
  const vestingCount = await gr33dContract.vestingCount(address);
  console.log(`Address ${address} has ${vestingCount} vestings`);
  
  for (let i = 0; i < vestingCount; i++) {
    try {
      const vestingInfo = await gr33dContract.getVestingInfo(address, i);
      console.log(`Vesting #${i} (Active):`, vestingInfo);
    } catch (e) {
      console.log(`Vesting #${i} (Inactive): Error - ${e.message}`);
      
      // Direct mapping access (works for inactive vestings)
      const rawVesting = await gr33dContract.vestingSchedules(address, i);
      console.log(`Vesting #${i} (Raw Data):`, rawVesting);
    }
  }
};
```

*Last updated: March 25, 2025*
