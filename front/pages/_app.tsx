import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { alchemyProvider } from 'wagmi/providers/alchemy';

const { chains, provider, webSocketProvider } = configureChains(
	[mainnet, polygon, polygonMumbai],
	[(alchemyProvider({ apiKey: process.env.ALCHEMY_ID! }), publicProvider())]
);

const { connectors } = getDefaultWallets({
	appName: 'RainbowKit App',
	chains
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
	webSocketProvider
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<Component {...pageProps} />
			</RainbowKitProvider>
		</WagmiConfig>
	);
}

export default MyApp;
