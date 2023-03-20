const { ethers, network } = require('hardhat');

const printBalance = async (owner, addr1, addr2, test) => {
	// check balance of the contract
	let balance = await ethers.provider.getBalance(owner);
	console.log('event owner balance:', ethers.utils.formatEther(balance));
	balance = await ethers.provider.getBalance(addr1);
	console.log('user1 balance:', ethers.utils.formatEther(balance));
	balance = await ethers.provider.getBalance(addr2);
	console.log('user2 balance:', ethers.utils.formatEther(balance));
	balance = await ethers.provider.getBalance(test);
	console.log('contract balance:', ethers.utils.formatEther(balance));
};

async function main() {
	// get the contract factory
	const TestFactory = await ethers.getContractFactory('Rsvp');
	// deploy the contract
	const test = await TestFactory.deploy();
	console.log('deploying...');
	await test.deployed();
	console.log('deployed to address:', test.address);

	const [owner, addr1, addr2] = await ethers.getSigners();

	// big number 1 ether in wei (18 decimals)
	let deposit = ethers.utils.parseEther('1');
	let maxCap = 3;
	let eventDate = 1718926200;
	await test.connect(owner).createEvent('test name', eventDate, maxCap, deposit);
	console.log('event created');
	console.log('rsvp users');
	await test.connect(addr1).rsvp('joe', 0, { value: ethers.utils.parseEther('1') });
	await test.connect(addr2).rsvp('bob', 0, { value: ethers.utils.parseEther('1') });
	console.log('---after rsvp fee ---');
	await printBalance(owner.address, addr1.address, addr2.address, test.address);

	console.log('--check in user--');
	// advance 10 years so I can check in and withdraw the rsvp fee
	await network.provider.send('evm_increaseTime', [15778800000000]);
	await test.connect(addr1).checkIn(addr1.address, 0);
	await printBalance(owner.address, addr1.address, addr2.address, test.address);

	// withdraw rsvp fee assuming no one checked in
	console.log('---withdraw rsvp fee---');

	await test.connect(owner).withdrawUnclaimed(0);
	await printBalance(owner.address, addr1.address, addr2.address, test.address);
	//console.log(await test.getEvent(0));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
