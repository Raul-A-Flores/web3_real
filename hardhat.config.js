require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  
    networks: {
      hardhat: {
        gas: 6000000, // Adjust the gas limit as needed
      }
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    }
};
