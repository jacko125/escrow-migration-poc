pragma solidity ^0.5.16;


contract Test {
    uint64[52] _timestamps;
    uint256[52] _amounts;

    bytes _packedData;

    function setData(uint64[52] memory timestamps, uint256[52] memory amounts) public {
        _timestamps = timestamps;
        _amounts = amounts;
    }

    function getTimestamps() public view returns (uint64[52] memory) {
        return _timestamps;
    }

    function getAmounts() public view returns (uint256[52] memory) {
        return _amounts;
    }

    function packData() public {
        _packedData = abi.encode(
            _timestamps,
            _amounts
        );
    }

    function getPackedData() public view returns (bytes memory) {
        return _packedData;
    }
}
