import rsvp from '../utils/Rsvp.json';
import { ethers } from 'ethers';
const connectContract = () => {
	const contractAddress = '0xDA140B8670e6b15BAeee58A863AfBda72ec5041B';
	const abi = rsvp.abi;
	try {
		const { ethereum } = window;
		if (!ethereum) {
			return;
		}
		const provider = new ethers.providers.Web3Provider(ethereum as ethers.providers.ExternalProvider);
		const signer = provider.getSigner();
		const contract = new ethers.Contract(contractAddress, abi, signer);
		console.log(contractAddress, contract);
		return contract;
	} catch (e) {
		console.log(e);
	}
};

export default connectContract;
