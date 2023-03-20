require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const MUMBAI_URL = process.env.MUMBAI_URL;
const PRIVATE_KEY = process.env.META_MASK_API_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
	solidity: '0.8.17',
	networks: {
		mumbai: {
			url: MUMBAI_URL,
			accounts: [PRIVATE_KEY]
		}
	}
};
