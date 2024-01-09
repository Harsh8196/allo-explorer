
const coreContracts = {
    registryImplementation: {
      name: "Registry Implementation",
      address: "0xAEc621EC8D9dE4B524f4864791171045d6BBBe27",
    },
    registryProxy: {
      name: "Registry Proxy",
      address: "0x0000000000000000000000000000000000000000",
    },
    alloImplementation: {
      name: "Allo Implementation",
      address: "0x8dde1922d5f772890f169714faceef9551791caf",
    },
    alloProxy: {
      name: "Allo Proxy",
      address: "0x79536CC062EE8FAFA7A19a5fa07783BD7F792206",
    },
  };
  
  const strategyContracts = {
    donationVotingMerklePaout: {
      name: "Donation Voting Merkle Paout",
      address: "0xC88612a4541A28c221F3d03b6Cf326dCFC557C4E",
    },
    directGrantsSimple: {
      name: "Direct Grants Simple",
      address: "0xf243619f931c81617EE00bAAA5c5d97aCcC5af10",
    },
  }
  
  // goerli, optimism-goerli, sepolia, pgn-sepolia, celo-alfajores, arbitrum-sepolia
  export const getNetworks = () => {
    return {
      [5]: {
        id: "5",
        name: "Goerli",
        explorer: "https://goerli.etherscan.io/",
        coreContracts: coreContracts,
        strategyContracts: strategyContracts,
        symbol: "gETH",
      },
      [421614]: {
        id: "421614",
        name: "Arbitrum Sepolia",
        explorer: "https://sepolia.arbiscan.io/",
        coreContracts: coreContracts,
        strategyContracts: strategyContracts,
        symbol: "ETH",
      },
    };
  };
  
  export const graphqlEndpoint = process.env.REACT_APP_GRAPHQL_URL
  