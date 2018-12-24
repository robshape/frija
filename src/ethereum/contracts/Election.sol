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


pragma solidity 0.5.0;


contract Election {
    struct Party {
        uint256 numberOfVotes;
    }

    struct Voter {
        bool hasVoted;
        uint8 voted;
        address voter;
    }

    Party[] public parties;
    mapping(address => Voter) voters;

    function addParties(uint8 numberOfParties) external {
        parties.length = numberOfParties;
    }

    function numberOfVotes(uint8 forParty) external view returns (uint256) {
        require(forParty < parties.length, "forParty is not less than parties.length.");

        return parties[forParty].numberOfVotes;
    }

    function vote(uint8 forParty) external {
        require(forParty < parties.length, "forParty is not less than parties.length.");
        Voter storage sender = voters[msg.sender];
        require(sender.hasVoted == false, "sender.hasVoted does not equal false.");

        parties[forParty].numberOfVotes += 1;

        sender.hasVoted = true;
        sender.voted = forParty;
    }
}
