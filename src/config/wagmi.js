import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import {walletConnect} from 'wagmi/connectors'

const projectId = import.meta.env.VITE_PROVIDER_KEY;

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [
walletConnect({projectId})
  ],
      
  multiInjectedProviderDiscovery: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})