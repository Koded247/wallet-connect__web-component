import { useState, useEffect } from "react";
import { MdOutlineDoubleArrow, MdOutlineKeyboardDoubleArrowDown, MdOutlineCancel} from "react-icons/md";

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
              Switch Network <MdOutlineKeyboardDoubleArrowDown />
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
          Connect Wallet <MdOutlineDoubleArrow />
        </button>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Choose a Wallet</h2>
            <p className="modal-subtext">Select your preferred wallet:</p>

            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
            <MdOutlineCancel />
            </button>
            
            <div className="wallet-list">
              {connectors.map((connector) => {
                
                const isInstalled = true; 

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
                      <div className="wallet-text">
                      <img 
                         src={connector.icon || 'https://seeklogo.com/images/W/walletconnect-logo-EE83B50C97-seeklogo.com.png'} alt={connector.name} className="w-6 h-6 rounded-full" />
                        <span>{connector.name}</span>
                      </div>
                        <div>
                          {isInstalled && (
                          <span className="installed-text">Installed</span>
                        )}
                        </div>
                        
                    </div>
                  </button>
                );
              })}
            </div>
            <a target="_blank" href="https://chromewebstore.google.com/search/wallet"><p className="text-xs">Download more wallet 🔗</p> </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;