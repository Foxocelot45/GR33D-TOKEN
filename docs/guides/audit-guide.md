# Deployment Guide

## Overview
This document details the deployment process for the GR33D smart contract ecosystem, including both the initial V1 deployment and the V2 upgrade process. This guide is intended for technical team members responsible for contract deployment and maintenance.

## Pre-Deployment Requirements

### Environment Setup
```bash
Node.js >= 16.0.0
npm >= 7.0.0
Hardhat >= 2.19.1
@openzeppelin/contracts-upgradeable: "^4.9.3"
@openzeppelin/hardhat-upgrades: "^1.28.0"
```

### Network Configuration
```javascript
// hardhat.config.js
require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();

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
      url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
      accounts: ["PLACEHOLDERS_FOR_PRIVATE_KEYS"],
      gasPrice: "auto",
      chainId: 1,
      timeout: 60000 // 1 minute
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
}
```

## Initial V1 Deployment (Completed)

### Deployment Timeline (November 24, 2024)

#### 11:45 UTC - Initial Setup
1. Deploy Proxy and Implementation V1
   ```javascript
   // deploy.js
   const { ethers, upgrades } = require("hardhat");
   
   async function main() {
     console.log("Deploying GR33DVault proxy and implementation...");
     
     const GR33DVault = await ethers.getContractFactory("GR33DVault");
     const gr33dVault = await upgrades.deployProxy(GR33DVault, [], {
       initializer: "initialize",
       kind: "uups"
     });
     
     await gr33dVault.deployed();
     console.log("GR33DVault deployed to:", gr33dVault.address);
   }
   
   main().catch((error) => {
     console.error(error);
     process.exitCode = 1;
   });
   ```

2. Verify Contract on Etherscan
   ```bash
   npx hardhat verify --network mainnet IMPLEMENTATION_ADDRESS
   ```

#### 11:55 UTC - Liquidity Setup
1. Create Uniswap Pool
   ```javascript
   // Example function (implementation will vary)
   async function setupUniswapPool() {
     // Initialize Uniswap pool setup
     await gr33dVault.adminClaimInitialLiquidity();
     // Add liquidity to Uniswap with appropriate parameters
   }
   ```

2. Lock Liquidity
   ```javascript
   // Example function
   async function lockLiquidity() {
     await gr33dVault.lockInitialLiquidity();
   }
   ```

#### 12:00 UTC - Launch Activation
1. Enable Trading
   ```javascript
   // Example function
   async function enableTrading() {
     await gr33dVault.enableTrading();
   }
   ```

2. Whitelist Setup
   ```javascript
   // Example function
   async function setupWhitelist() {
     // Configure whitelist for critical addresses
     await gr33dVault.setWhitelist(
       "ADDRESS_PLACEHOLDER", 
       true, // maxWalletExempt
       true  // txLimitExempt
     );
   }
   ```

### Post-Deployment Tasks
1. Setup Vesting Schedules
   ```javascript
   // Example implementation
   async function setupVestings() {
     // Initialize vesting schedules with appropriate parameters
     // Marketing vesting
     await gr33dVault.initializeVesting(
       DEV_MARKETING_ADDRESS,
       ethers.utils.parseEther("200000"),
       15, // weeks
       30 * 24 * 60 * 60 // 30 days in seconds
     );
     
     // Similar calls for other vesting schedules
   }
   ```

## V2 Upgrade Deployment (Completed)

### V2 Upgrade Timeline (December 24, 2024)

#### Pre-Upgrade Checklist
```
□ V2 Contract Audited
□ Test Suite Passing
□ Gas Estimations Completed
□ Storage Layout Validated
□ Upgrade Simulation on Fork
```

#### Upgrade Process
1. Deploy V2 Implementation
   ```javascript
   // upgradeToV2.js
   const { ethers, upgrades } = require("hardhat");
   
   async function main() {
     console.log("Upgrading GR33DVault to V2...");
     
     const GR33DVaultV2 = await ethers.getContractFactory("GR33DVaultV2");
     const upgradedContract = await upgrades.upgradeProxy(
       "0xC3b2990027217b9970b2d526aa11Ba3f223eb39C", // Proxy address
       GR33DVaultV2
     );
     
     console.log("GR33DVault upgraded to V2");
     console.log("Implementation address:", await upgrades.erc1967.getImplementationAddress(
       upgradedContract.address
     ));
   }
   
   main().catch((error) => {
     console.error(error);
     process.exitCode = 1;
   });
   ```

2. Verify V2 Implementation
   ```bash
   npx hardhat verify --network mainnet NEW_IMPLEMENTATION_ADDRESS
   ```

#### Post-Upgrade Verification
```javascript
// Example verification script
async function verifyUpgrade() {
  const gr33dVault = await ethers.getContractAt(
    "GR33DVaultV2",
    "0xC3b2990027217b9970b2d526aa11Ba3f223eb39C"
  );
  
  // Verify state preservation and new functionality
  const totalSupply = await gr33dVault.totalSupply();
  console.log("Total supply:", ethers.utils.formatEther(totalSupply));
  
  // Verify new functions
  // Additional verification steps as needed
}
```

## Future Upgrade Guidelines

### Preparation Phase
1. Develop and test new implementation thoroughly
2. Ensure storage compatibility with previous version
3. Complete comprehensive security audit
4. Prepare detailed upgrade documentation
5. Create backup and rollback procedures

### Development Recommendations
```solidity
// Ensure storage compatibility by following this pattern:
contract GR33DVaultV3 is GR33DVaultV2 {
    // New storage variables should be added at the end
    uint256 public newFeature;
    mapping(address => uint256) public newMapping;
    
    // Never modify existing storage variable declarations
    // Never remove existing storage variables
    
    // For new functions, follow this pattern:
    function newFunction() external {
        // Implementation
    }
    
    // For modified functions, override with care:
    function existingFunction() external override {
        // Call super to maintain compatibility
        super.existingFunction();
        // Add new functionality
    }
}
```

### Execution Process
1. Deploy new implementation
2. Verify implementation on Etherscan
3. Perform upgrade through proxy
4. Verify all functions work as expected
5. Monitor contract for 48 hours post-upgrade

## Verification Checklist

### Pre-Deployment/Pre-Upgrade
```
□ Test API Connections
□ Verify ETH Balances
□ Confirm Gas Settings
□ Test All Functions
□ Backup Security Keys
□ Simulate on Mainnet Fork
```

### During Deployment/Upgrade
```
□ Monitor Gas Prices
□ Verify Each Transaction
□ Document All Steps
□ Save All Transaction Hashes
□ Monitor Network Conditions
```

### Post-Deployment/Post-Upgrade
```
□ Verify Contract on Etherscan
□ Test All Contract Functions
□ Check Storage State Preservation
□ Monitor Contract Activity
□ Confirm Event Emissions
```

## Security Measures

### Critical Parameters
- Gas Price Maximum: 30 gwei
- Transaction Timing: 5-minute spacing
- Backup RPC Providers Ready
- Emergency Contacts on Standby

### No-Go Conditions
1. Gas Price > 30 gwei
2. Network Congestion
3. Contract Verification Failure
4. Storage Layout Issues

## Emergency Procedures

### Contact Protocol
1. Technical Issues:
   - Primary: Development Team Lead
   - Secondary: Smart Contract Developers

2. Transaction Issues:
   - Monitor: Etherscan/Tenderly
   - Response: < 5 minutes

### Recovery Procedures
1. Transaction Failure:
   - Check Gas/Nonce
   - Verify Parameters
   - Retry with Adjusted Settings

2. Failed Upgrade:
   - Evaluate Impact
   - Consider Redeployment
   - Implement Recovery Plan

## Documentation Requirements

### Deployment Records
```
Required Information:
- Deployment Date/Time
- Transaction Hashes
- Contract Addresses
- Etherscan Links
- Initial Parameters
- Gas Costs
```

### Upgrade Records
```
Required Information:
- Upgrade Date/Time
- Old Implementation Address
- New Implementation Address
- Upgrade Transaction Hash
- Feature Changes
- Security Improvements
```

This deployment guide serves as both a historical record of the completed deployments and a reference for future upgrades. All procedures should be followed precisely to ensure the security and integrity of the GR33D ecosystem.

---

**Note**: For security reasons, actual private keys, specific address values, and detailed security implementations have been replaced with placeholders in this public document. Team members should refer to secure internal documentation for actual values.
