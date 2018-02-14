pragma solidity 0.4.19;


import "./Claimable.sol";
import "./Election.sol";


contract ElectionAuthority is Claimable {
    address[] public elections;

    function createElection(uint8 numberOfParties) public onlyOwner {
        Election newElection = new Election(numberOfParties);
        elections.push(newElection);
    }
}
