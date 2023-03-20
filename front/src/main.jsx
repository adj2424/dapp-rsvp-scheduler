import './polyfills';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const { chains, provider } = configureChains(
	[mainnet, polygon, polygonMumbai],
	[alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: 'RainbowKit demo',
	chains
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<App />
			</RainbowKitProvider>
		</WagmiConfig>
	</React.StrictMode>
);
