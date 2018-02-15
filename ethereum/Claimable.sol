pragma solidity 0.4.20;


import "./Ownable.sol";


contract Claimable is Ownable {
    address public pendingOwner;
    bytes32 private pendingOwnerKeyHash;

    modifier onlyPendingOwner(bytes32 key) {
        require(msg.sender == pendingOwner);
        bytes32 keyHash = keccak256(key);
        require(keyHash == pendingOwnerKeyHash);

        _;
    }

    function claimOwnership(bytes32 key) external onlyPendingOwner(key) {
        owner = pendingOwner;
        pendingOwner = address(0);
    }

    function transferOwnership(address newOwner, bytes32 newOwnerKeyHash) external onlyOwner {
        pendingOwner = newOwner;
        pendingOwnerKeyHash = newOwnerKeyHash;
    }
}
