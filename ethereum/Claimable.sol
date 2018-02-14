pragma solidity 0.4.19;


import "./Ownable.sol";


contract Claimable is Ownable {
    address public pendingOwner;

    modifier onlyPendingOwner() {
        require(msg.sender == pendingOwner);

        _;
    }

    function claimOwnership() public onlyPendingOwner {
        owner = pendingOwner;
        pendingOwner = address(0);
    }

    function transferOwnership(address newOwner) public onlyOwner {
        pendingOwner = newOwner;
    }
}
