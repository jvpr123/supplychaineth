import Web3 from "web3";

import ItemManagerContract from "./contracts/ItemManager.json";
import ItemContract from "./contracts/Item.json";

function App() {
  const init = async () => {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();

    const deployedNetworkItemManager = await ItemManagerContract.networks[
      networkId
    ];
    const deployedNetworkItem = await ItemContract.networks[networkId];

    const itemManagerInstance = new web3.eth.Contract(
      ItemManagerContract.abi,
      deployedNetworkItemManager && deployedNetworkItemManager.address
    );

    const itemInstance = new web3.eth.Contract(
      ItemContract.abi,
      deployedNetworkItem && deployedNetworkItem.address
    );
  };

  return <></>;
}

export default App;
