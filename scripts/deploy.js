const { ethers, network } = require('hardhat');

async function main() {
	// get the contract factory
	const TestFactory = await ethers.getContractFactory('Test');
	// deploy the contract
	const test = await TestFactory.deploy();
	console.log('deploying...');
	await test.deployed();
	console.log('deployed to address:', test.address);

	await test.createEvent('test name', 1718926200, 3, ethers.utils.parseEther('1'));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch(error => {
	console.error(error);
	process.exitCode = 1;
});
