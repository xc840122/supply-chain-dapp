# Smart Chain DAPP

A decentralized application (DAPP) prototype for improving supply chain transparency and traceability using Ethereum smart contracts and a modern web UI.

## Project Structure

- `contracts/`: Solidity smart contracts
- `pages/`: Next.js pages
- `Components/`, `Context/`: React components and context management
- `scripts/`: Hardhat deployment scripts
- `test/`: Hardhat test cases
- `public/`, `styles/`: Static assets and Tailwind CSS styling

---

## Quick Start

### Prerequisites

Please make sure the following tools are installed before continuing:

- [Node.js](https://nodejs.org/) (>=16.x)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MetaMask browser extension](https://metamask.io/)
- [Hardhat](https://hardhat.org/) (installed via `npm`)

---

### Installation

```bash
# Clone the repository
git clone https://github.com/xc840122/supply-chain-dapp.git
cd supply-chain-dapp

# Install all dependencies
npm install
```

````

---

### Deploy Smart Contracts Locally

```bash
# Start local Hardhat blockchain
npx hardhat node
```

In a separate terminal:

```bash
# Deploy contracts to the local Hardhat network
npx hardhat run scripts/deploy.js --network localhost
```

After deployment, save the contract address if needed for frontend integration.

---

### Launch the Web Frontend

```bash
# Start Next.js development server
npm run dev
```

Then visit: [http://localhost:3000](http://localhost:3000)

---

## MetaMask Setup (Browser)

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

---

## Tech Stack

- Smart Contracts: **Solidity + Hardhat**
- Web Frontend: **React + Next.js + TailwindCSS**
- Web3 Integration: **ethers.js + Web3Modal**
- Styling: **Tailwind CSS**

---

## License

MIT License

Copyright (c) 2025 Peter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
IN THE SOFTWARE.
````
