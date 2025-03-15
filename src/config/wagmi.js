import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, lisk, liskSepolia, base, polygon, optimism, polygonAmoy } from 'wagmi/chains'
import { coinbaseWallet, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [mainnet, sepolia,lisk, liskSepolia, base, polygon, optimism, polygonAmoy
  ],
  connectors: [
  
    walletConnect({ projectId: import.meta.env.VITE_PROVIDER_ID }),
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

