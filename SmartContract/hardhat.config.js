require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path:".env"});


const ALCHEMY_HTTP_URL = process.env.ALCHEMY_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url:ALCHEMY_HTTP_URL,
      accounts: [PRIVATE_KEY]
    },
    localhost:{
      chainID: 31337,
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
                "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"]
    }
  },
  defaultNetwork: 'hardhat'
};
