pragma solidity ^0.5.16;

import "@nomiclabs/buidler/console.sol";

import "./Receiver.sol";


contract Sender {
    Receiver private _receiver;

    uint64[52] private _timestamps;
    uint256[52] private _amounts;

    bytes _packedData;

    function setReceiver(address receiver) public {
        _receiver = Receiver(receiver);
    }

    function getReceiver() public view returns (address) {
        return address(_receiver);
    }

    function setTimestamps(uint64[52] memory timestamps) public {
        _timestamps = timestamps;
    }

    function getTimestamps() public view returns (uint64[52] memory) {
        return _timestamps;
    }

    function setAmounts(uint256[52] memory amounts) public {
        _amounts = amounts;
    }

    function getAmounts() public view returns (uint256[52] memory) {
        return _amounts;
    }

    function sendData() public {
        // TODO
    }

    function packData() public {
        _packedData = abi.encodeWithSignature(
            "migrateVestingSchedule(address,uint64[],uint256[])",
            msg.sender,
            _timestamps,
            _amounts
        );
    }

    function getPackedData() public view returns (bytes memory) {
        return _packedData;
    }
}
