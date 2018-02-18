pragma solidity 0.4.19;


import "./Ownable.sol";


contract Migrations is Ownable {
    uint public last_completed_migration;

    function setCompleted(uint completed) external onlyOwner {
        last_completed_migration = completed;
    }

    function upgrade(address newAddress) public onlyOwner {
        Migrations newMigrations = Migrations(newAddress);
        newMigrations.setCompleted(last_completed_migration);
    }
}
