# Smart Chain DAPP

A decentralized application (DAPP) prototype for improving supply chain transparency and traceability using Ethereum smart contracts and a modern web UI.

## Project Structure

- `contracts/`: Solidity smart contracts
- `pages/`: Next.js pages
- `Components/`, `Context/`: React components and context management
- `scripts/`: Hardhat deployment scripts
- `test/`: Hardhat test cases
- `public/`, `styles/`: Static assets and Tailwind CSS styling

## Quick Start

### Prerequisites

Please make sure the following versions of tools are installed exactly as "package.json" to ensure compatibility.

### Installation

```bash
# Clone the repository
git clone https://github.com/xc840122/supply-chain-dapp.git
cd supply-chain-dapp

# Install all dependencies
npm install
```

### Deploy Smart Contracts Locally

```bash
# Start local Hardhat blockchain
npx hardhat node
```

Select one node address, copy to TrackingContext.js, "ContractAddress"

```bash
import tracking from '../Context/Tracking.json';
const ContractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const ContactABI = tracking.abi;
```

In a separate terminal:

```bash
# Deploy contracts to the local Hardhat network
npx hardhat run scripts/deploy.js --network localhost
```

> After deployment, save the contract address if needed for frontend integration.

### Launch the Web Frontend

```bash
# Start Next.js development server
npm run dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

## MetaMask Setup (Chrome Browser)

To interact with the DApp, you **must install and configure MetaMask**:

1. Install the [MetaMask browser extension](https://metamask.io/)
2. Click the MetaMask icon and **create or import a wallet**
3. Click the network selector (top center) and choose `Localhost 8545`
   - If not visible, manually add it:
     - **Network Name:** Hardhat Localhost
     - **New RPC URL:** `http://127.0.0.1:8545`
     - **Chain ID:** `31337`
4. Import one of the test accounts provided by the Hardhat node:
   - Use any private key shown in the terminal where `npx hardhat node` is running.

## Tech Stack

- Smart Contracts: **Solidity + Hardhat**
- Web Frontend: **React + Next.js + TailwindCSS**
- Web3 Integration: **ethers.js + Web3Modal**
- Styling: **Tailwind CSS**
