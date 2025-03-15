import { useState, useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import "./index.css";

function App() {
  const { address, isConnected, chain } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { chains, switchChain } = useSwitchChain();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const walletIcons = {
    "MetaMask": "https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg",
    "Phantom": "https://www.svgrepo.com/show/331345/coinbase.svg",
    "WalletConnect": "https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png",
    "Trust Wallet": "https://cdn.prod.website-files.com/6597cc7be68d63ec0c8ce33f/668d443c227379bb3c38209e_Trust%20Wallet.webp",
    "Rabby Wallet": "https://play-lh.googleusercontent.com/voFLXuFxLsIFBHQKmFxUhgAo23RXmO6_esdEb6ebfHQewdMlAfNKq3vAaDh6clJ7Pw",
    "OKX Wallet": "https://altcoinsbox.com/wp-content/uploads/2023/03/okx-logo-black-and-white.jpg",
    "Injected": "https://cdn-icons-png.flaticon.com/512/2121/2121421.png",
    // Default icon for unknown wallets
    "default": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOdmVbjiWksvRV0i4WCcgJoPybTqMVKEFIIA&s"
  };
  // Function to get wallet icon
  const getWalletIcon = (walletName) => {
    return walletIcons[walletName] || walletIcons.default;
  };

  return (
    <div className="container">
      
      <header>
        <h1><span className="text-red-600">K</span>ode<span className="text-purple-500">DA</span>pp</h1>
      </header>

      {isConnected ? (
        <div className="wallet-card">
          <p className="wallet-label">Connected Wallet</p>
          <p className="wallet-address">{address}</p>
          <p className="wallet-network">
            <strong>Network:</strong> {chain?.name} (ID: {chain?.id})
          </p>
          <button className="disconnect-btn" onClick={() => disconnect()}>
            Disconnect
          </button>

          <div className="network-dropdown">
            <button
              className="network-btn dropdown-toggle"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Switch Network <p>🔻</p>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {chains.map((c) => (
                  <button
                    key={c.id}
                    className="dropdown-item"
                    onClick={() => {
                      switchChain({ chainId: c.id });
                      setIsDropdownOpen(false);
                    }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <button className="connect-btn" onClick={() => setIsModalOpen(true)}>
          Connect Wallet 
        </button>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Choose a Wallet</h2>
            <p className="modal-subtext">Select your preferred wallet:</p>

            <button className="close-btn text-red-700" onClick={() => setIsModalOpen(false)}>
              x
            </button>
            
            <div className="wallet-list">
              {connectors.map((connector) => {
                // Force the "Installed" text to show for all connectors
                // You can customize this logic based on your requirements
                const isInstalled = true; // Show for all wallets

                return (
                  <button
                    key={connector.id}
                    className="wallet-btn"
                    onClick={() => {
                      connect({ connector });
                      setIsModalOpen(false);
                    }}
                  >
                    <div className="wallet-btn-content">
                      <img 
                        src={getWalletIcon(connector.name)} 
                        alt={`${connector.name} icon`} 
                        className="wallet-icon" 
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = walletIcons.default;
                        }}
                      />
                      <div className="wallet-text">
                        <span>{connector.name}</span>
                        {isInstalled && (
                          <span className="installed-text">Installed</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            <a target="_blank" href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"><p className="text-xs">Download supported wallet</p></a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;