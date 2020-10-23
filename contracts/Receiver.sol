pragma solidity ^0.5.16;

import "@nomiclabs/buidler/console.sol";


contract Receiver {
    bytes public data;

    function receiveData(bytes memory incomingData) public {
        data = incomingData;
    }
}
