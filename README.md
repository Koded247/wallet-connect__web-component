# Wallet Connect DApp with Wagmi

This is a simple React DApp that implements Wallet Connect functionality using the **Wagmi library**. It supports connecting, disconnecting, switching chains, and displaying wallet information.

## 🚀 Features
- Connect to multiple wallet connectors (e.g., MetaMask, WalletConnect, etc.).
- Display connected wallet address and connection status.
- Switch between supported chains (Mainnet, Sepolia, Base, Polygon).
- Disconnect wallet.

---

## 📁 Project Structure
```
📁 src
├── 📄 App.jsx          # Main React component
├── 📄 App.css          # CSS file for styling
├── 📄 index.js         # ReactDOM render
```

---

## 🔧 Installation
### 1. Clone the repository
```bash
 git clone <repository-url>
```

### 2. Navigate to the project directory
```bash
 cd <project-folder>
```

### 3. Install dependencies
```bash
 npm install
```

---

## 📦 Dependencies
- `react`
- `wagmi`
- `viem`
- `@wagmi/core`

---

## 💻 Usage
1. Start the development server:
```bash
 npm run dev
```
2. Open your browser and visit:
```
http://localhost:3000
```

---

## 📄 Example Code
Replace the contents of `App.jsx` with the provided Wagmi-based wallet connect code.

---

## 🔨 Configuration
- Make sure to install `wagmi` and `viem` by running:
```bash
 npm install wagmi viem
```

- To add additional chains, import them from `wagmi/chains` and include them in the `supportedChains` array.

---

## 📌 Notes
- Make sure to have a wallet browser extension like MetaMask installed for testing.
- Ensure your environment supports the chains you want to connect to.

---

## 📜 License
This project is unlicensed 

