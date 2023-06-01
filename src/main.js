import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.config.globalProperties.$url = 'http://3.216.4.3:3000/'
app.use(router).mount('#app')

app.config.globalProperties.$contractAddress = 
"0x0Ba21FdF1B917cF4454dBA327EDCd86a06109dC1"
app.config.globalProperties.$abi = JSON.parse(
    `[
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor",
            "signature": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "voter",
                    "type": "address"
                }
            ],
            "name": "NewVoter",
            "type": "event",
            "signature": "0x668b14b635e60c984edc522ab57ecf4f7df5f95e912da87692905dc5aa111487"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "voter",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "candidateIndex",
                    "type": "uint256"
                }
            ],
            "name": "VoteCast",
            "type": "event",
            "signature": "0xa36cc2bebb74db33e9f88110a07ef56e1b31b24b4c4f51b54b1664266e29f45b"
        },
        {
            "anonymous": false,
            "inputs": [],
            "name": "VotingComplete",
            "type": "event",
            "signature": "0x94952e77d0e8498eed40be9fb464640d8a6ea76fb1f15a5387255938091b0a48"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "newStatus",
                    "type": "bool"
                }
            ],
            "name": "VotingStatusChanged",
            "type": "event",
            "signature": "0x9069a1a16ace751e8690f383e12f87b01e8488ba387e626810bd113fef0417f9"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "bool",
                    "name": "newStatus",
                    "type": "bool"
                }
            ],
            "name": "VotingStatusChanged",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "string[]",
                    "name": "_names",
                    "type": "string[]"
                }
            ],
            "name": "addCandidates",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
            "signature": "0xa999e562"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidates",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "voteCount",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true,
            "signature": "0x3477ee2e"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "candidateIndex",
                    "type": "uint256"
                }
            ],
            "name": "castVote",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
            "signature": "0x3eb76b9c"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "newText",
                    "type": "string"
                }
            ],
            "name": "changeText",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
            "signature": "0x039b925a"
        },
        {
            "inputs": [],
            "name": "endVoting",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
            "signature": "0xc3403ddf"
        },
        {
            "inputs": [],
            "name": "getCandidates",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "voteCount",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Contract.Candidate[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true,
            "signature": "0x06a49fce"
        },
        {
            "inputs": [],
            "name": "getVotingOn",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true,
            "signature": "0x53378483"
        },
        {
            "inputs": [],
            "name": "getWinner",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true,
            "signature": "0x8e7ea5b2"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "voterAddress",
                    "type": "address"
                }
            ],
            "name": "hasVoterVoted",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true,
            "signature": "0xfd11f97a"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "voterAddress",
                    "type": "address"
                }
            ],
            "name": "isVoterRegistered",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true,
            "signature": "0xeb2119db"
        },
        {
            "inputs": [],
            "name": "registerVoter",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function",
            "signature": "0xecb617d9"
        },
        {
            "inputs": [],
            "name": "speak",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function",
            "constant": true,
            "signature": "0x50d85315"
        },
        {
            "inputs": [],
            "name": "startVoting",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function",
            "signature": "0x1ec6b60a"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "voters",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "isRegistered",
                    "type": "bool"
                },
                {
                    "internalType": "bool",
                    "name": "hasVoted",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]`
)