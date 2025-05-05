import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    amoy: {
      url: `https://polygon-amoy.g.alchemy.com/v2/${process.env.ALCHEMY_KEY_AMOY}`,
      chainId: 80002,
      accounts: [process.env.PRIVATE_KEY!],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_KEY_POLY}`,
      chainId: 137,
      accounts: [process.env.PRIVATE_KEY!],
    },
  },
};

export default config;
