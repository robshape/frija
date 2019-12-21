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


pragma solidity 0.5.12;


import "./Bill.sol";
import "./Claimable.sol";
import "./Election.sol";


contract ElectionAuthority is Claimable {
    Bill[] public bills;
    Election[] public elections;

    function createBill(string calldata withTitle) external {
        Bill newBill = new Bill();
        newBill.changeTitle(withTitle);

        bills.push(newBill);
    }

    function createElection(uint8 numberOfParties) external onlyOwner {
        Election newElection = new Election();
        newElection.addParties(numberOfParties);

        elections.push(newElection);
    }
}
