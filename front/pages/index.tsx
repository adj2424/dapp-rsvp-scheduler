import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
	return (
		<div>
			<Head>
				<title>RainbowKit App</title>
				<meta content="Generated by @rainbow-me/create-rainbowkit" name="description" />
				<link href="/favicon.ico" rel="icon" />
			</Head>

			<main>
				<label htmlFor="name">Event Name:</label>
				<input type="text" id="name"></input>
				<br />
				<label htmlFor="date">Date and Time:</label>
				<input type="text" id="date"></input>
				<br />
				<label htmlFor="Capacity">Capacity:</label>
				<input type="text" id="capacity"></input>
				<br />
				<label htmlFor="deposit">Deposit:</label>
				<input type="text" id="deposit"></input>
				<br />
				<button>Submit</button>

				<ConnectButton />
			</main>
		</div>
	);
};

export default Home;
