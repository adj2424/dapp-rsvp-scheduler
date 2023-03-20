import { useState } from 'react';
import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<label for="name">Event Name:</label>
			<input type="text" id="name"></input>
			<br />
			<label for="date">Date and Time:</label>
			<input type="text" id="date"></input>
			<br />
			<label for="Capacity">Capacity:</label>
			<input type="text" id="capacity"></input>
			<br />
			<label for="deposit">Deposit:</label>
			<input type="text" id="deposit"></input>
			<br />
			<button>Submit</button>

			<ConnectButton />
		</>
	);
}

export default App;
