// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.0;

contract Contract {
    string private text;

    function speak() public view returns (string memory) {
        return text;
    }

    function changeText(string memory newText) public {
        text = newText;
    }

    struct Voter {
        bool isRegistered;
        bool hasVoted;
    }
    struct Candidate {
        string name;
        uint voteCount;
    }
    Candidate[] public candidates;
    mapping(address => Voter) public voters;

    constructor() {
        candidates.push(Candidate("candidate1", 0));
        candidates.push(Candidate("candidate2", 0));
        candidates.push(Candidate("candidate3", 0));
    }

    event NewVoter(address voter);
    event VoteCast(address voter, uint candidateIndex);
    event VotingComplete();

    function castVote(uint candidateIndex) public {
        Voter storage sender = voters[msg.sender];
        require(sender.isRegistered, "Not registered to vote");
        require(!sender.hasVoted, "Already voted");
        sender.hasVoted = true;
        candidates[candidateIndex].voteCount += 1;
        emit VoteCast(msg.sender, candidateIndex);
    }

 function registerVoter() public returns (uint) {
    require(!voters[msg.sender].isRegistered, "Already registered");
    voters[msg.sender] = Voter(true, false);
    emit NewVoter(msg.sender);
    return 1; // Successful registration
}
 return 1; // User registered successfully
}


    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }

    function getWinner() public view returns (string memory) {
        uint winningVoteCount = 0;
        uint winningCandidateIndex;
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > winningVoteCount) {
                winningVoteCount = candidates[i].voteCount;
                winningCandidateIndex = i;
            }
        }
        return candidates[winningCandidateIndex].name;
    }
}