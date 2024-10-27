# Smart Contracts

This directory contains the smart contracts for the GreedysClub ecosystem.

## Contract Addresses

### Testnet (Sepolia)
- GreedysClub Token: `0xEa2F6bfA79852130070cE05dA270064B0E44C0bB`

### Mainnet
- To be deployed

## Contracts Overview

### GreedysClub.sol
Core token contract implementing:
- ERC20 standard
- Deflationary mechanism
- Anti-whale protection
- Transaction limits

### GreedysClubV1.sol
Upgraded version including:
- Staking functionality
- Advanced burn mechanism
- Security enhancements

## Audit Status
- Initial audit: Pending
- Security review: In progress

## Development
All contracts are written in Solidity and are upgradeable through OpenZeppelin's proxy pattern.

### Setup
```bash
npm install
npx hardhat compile
Testing
bashCopynpx hardhat test
Deployment
bashCopynpx hardhat run scripts/deploy.js --network <network>
