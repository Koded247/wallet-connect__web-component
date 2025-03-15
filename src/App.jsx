import { useState } from "react";
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
        <h1><span className="text-red-600">K</span>ode<span className="text-purple-500"  >DA</span>pp</h1>
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
          Connect Wallet <p> > </p>
        </button>
      )}

    
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Choose a Wallet</h2>
            <p className="modal-subtext">Select your preferred wallet:</p>

           
            <div className="wallet-list ">
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
              x
            </button>
              {connectors.map((connector) => (
                <button
                  key={connector.id}
                  className="wallet-btn"
                  onClick={() => {
                    connect({ connector });
                    setIsModalOpen(false);
                  }}
                >
                  {connector.name} <p className="text-xs text-green-400" >Installed</p>
                </button>
              ))}
            </div>
              <a target="_blank"  href="https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn "><p className="text-xs " >Download supported wallet  > </p></a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;