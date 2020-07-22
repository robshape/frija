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


contract Bill is Ownable {
    struct Voter {
        bool hasVoted;
        bool voted;
        address voter;
    }

    string public title;
    mapping(address => Voter) internal voters;

    function changeTitle(string calldata toTitle) external {
        title = toTitle;
    }

    function vote(bool forBill) external {
        Voter storage sender = voters[msg.sender];

        require(sender.hasVoted == false, "sender has already voted");

        sender.hasVoted = true;
        sender.voted = forBill;
    }
}
