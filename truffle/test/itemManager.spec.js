const ItemManager = artifacts.require("./ItemManager.sol");

contract("ItemManager", async (accounts) => {
  it("should be able to add an item", async () => {
    const itemManagerInstance = await ItemManager.deployed();

    const result = await itemManagerInstance.createItem("ITEM NAME", 500, {
      from: accounts[0],
    });

    assert.equal(
      result.logs[0].args._itemIndex,
      0,
      "It is not the first item."
    );
  });
});
