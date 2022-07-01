// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./ItemManager.sol";

contract Item {
    uint256 public itemPriceInWei;
    uint256 public index;
    uint256 pricePaid;
    ItemManager parentContract;

    constructor(
        ItemManager _parentContract,
        uint256 _itemPriceInWei,
        uint256 _index
    ) {
        itemPriceInWei = _itemPriceInWei;
        index = _index;
        parentContract = _parentContract;
    }

    receive() external payable {
        require(pricePaid == 0, "ALREADY PAID: Item is further in the chain.");
        require(
            itemPriceInWei == msg.value,
            "UNSUFFICIENT PAYMENT: Only full payments are accepted."
        );

        pricePaid += msg.value;

        (bool success, ) = address(parentContract).call{value: msg.value}(
            abi.encodeWithSignature("triggerPayment(uint256)", index)
        );
        require(success, "The transaction did not succeed: canceling...");
    }
}
