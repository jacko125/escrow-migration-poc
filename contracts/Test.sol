pragma solidity ^0.5.16;


contract Test {
    uint64[] _timestamps;
    uint64[] _durations;
    uint64[] _lastVested;
    uint256[] _amounts;
    uint256[] _remainingAmounts;

    bytes _packedData;

    function setData(uint64[] memory timestamps, uint256[] memory amounts, uint64[] memory durations, uint256[] memory remainingAmounts, uint64[] memory lastVested) public {
        _timestamps = timestamps;
        _amounts = amounts;
        _durations = durations;
        _lastVested = lastVested;
        _remainingAmounts = remainingAmounts;
    }

    function getTimestamps() public view returns (uint64[] memory) {
        return _timestamps;
    }

    function getAmounts() public view returns (uint256[] memory) {
        return _amounts;
    }

    function packData() public {
        _packedData = abi.encode(
            _timestamps,
            _amounts,
            _durations,
            _lastVested,
            _remainingAmounts
        );
    }

    function getPackedData() public view returns (bytes memory) {
        return _packedData;
    }
}
