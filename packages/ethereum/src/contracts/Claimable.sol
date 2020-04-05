/*

  Frija - The Swedish general election and Riksdag on the Ethereum blockchain.
  Copyright (C) 2018 Frija contributors.

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see https://www.gnu.org/licenses/.

*/


pragma solidity 0.5.16;


import "./Ownable.sol";


contract Claimable is Ownable {
    address public pendingOwner;
    bytes32 private pendingOwnerKeyHash;

    modifier onlyPendingOwner(bytes32 key) {
        require(msg.sender == pendingOwner, "msg.sender does not equal pendingOwner.");
        bytes memory encodedKey = abi.encodePacked(key);
        bytes32 keyHash = keccak256(encodedKey);
        require(keyHash == pendingOwnerKeyHash, "keyHash does not equal pendingOwnerKeyHash.");

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
