pragma solidity 0.4.19;


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

    function Election(uint8 numberOfParties) public {
        parties.length = numberOfParties;
    }

    function numberOfVotes(uint8 forParty) public view returns (uint256) {
        require(forParty < parties.length);

        return parties[forParty].numberOfVotes;
    }

    function vote(uint8 forParty) public {
        require(forParty < parties.length);
        Voter storage sender = voters[msg.sender];
        require(sender.hasVoted == false);

        parties[forParty].numberOfVotes += 1;

        sender.hasVoted = true;
        sender.voted = forParty;
    }
}
