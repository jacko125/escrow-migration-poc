pragma solidity ^0.5.16;

import "@nomiclabs/buidler/console.sol";

import "./Receiver.sol";


contract Sender {
    Receiver public receiver;

    function setReceiver(address receiverAddress) public {
        receiver = Receiver(receiverAddress);
    }

    function sendData(uint64[] memory timestamps, uint256[] memory amounts) public {
        require(address(receiver) != address(0), "Receiver not set");

        // bytes memory data =

        // receiver.receiveData(data);
    }
}
