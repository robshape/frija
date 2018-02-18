pragma solidity 0.4.19;


import "./Ownable.sol";


contract Migrations is Ownable {
    uint public last_completed_migration;

    function setCompleted(uint completedMigration) public onlyOwner {
        last_completed_migration = completedMigration;
    }

    function upgrade(address newAddress) external onlyOwner {
        Migrations newMigrations = Migrations(newAddress);
        newMigrations.setCompleted(last_completed_migration);
    }
}
