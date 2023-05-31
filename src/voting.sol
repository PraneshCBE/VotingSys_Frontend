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
    // Getter function for isRegistered property of a voter
    function isVoterRegistered(address voterAddress) public view returns (bool) {
        return voters[voterAddress].isRegistered;
    }

    // Getter function for hasVoted property of a voter
    function hasVoterVoted(address voterAddress) public view returns (bool) {
        return voters[voterAddress].hasVoted;
    }
    
    Candidate[] public candidates;
    mapping(address => Voter) public voters;

    constructor() {
        candidates.push(Candidate("candidate1", 0));
        candidates.push(Candidate("candidate2", 0));
        candidates.push(Candidate("candidate3", 0));
    }

     function addCandidates(string[] memory _names) public {
        for (uint i = 0; i < _names.length; i++) {
            candidates.push(Candidate(_names[i], 0));
        }
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

modifier notRegistered() {
    require(!voters[msg.sender].isRegistered, "Already registered");
    _;
}

function registerVoter() public notRegistered returns (bool) {
    voters[msg.sender] = Voter(true, false);
    emit NewVoter(msg.sender);
    return true; // Successful registration
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