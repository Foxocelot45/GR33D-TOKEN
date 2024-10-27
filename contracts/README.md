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
Copy
2. Pour le dossier .github :
Crée un nouveau fichier : ".github/ISSUE_TEMPLATE/bug_report.md"

Voici son contenu :

```markdown
---
name: Bug Report
about: Create a report to help us improve
title: '[BUG] '
labels: bug
assignees: ''
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment:**
 - Network: [e.g., Sepolia, Mainnet]
 - Wallet: [e.g., MetaMask, Trust Wallet]
 - Browser: [e.g., Chrome, Safari]
 - Version: [e.g., 22]

**Additional context**
Add any other context about the problem here.
