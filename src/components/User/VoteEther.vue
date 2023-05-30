<template>
    <div class="container">
      <div class="section">
  

  
        <!-- Call Contract -->
 
          <div  >
            <button class="btn btn-large" @click="callContract">Call contract</button>
            <h5>{{ contractResult }}</h5>
          </div>
 
  
        <!-- Change Text -->

          <div  >
            <form @submit.prevent="sendToContract">
              <label for="newText">New Text</label>
              <input type="text" id="newText" v-model="newText" required>
              <button class="btn btn-large">Submit</button>
            </form>
          </div>

  
        <!-- Cast Vote -->

          <div  >
            <input v-model="candidateIndex" class="form-control" type="number">
            <button class="btn btn-large" @click="castVote">Vote for Candidate</button>
          </div>
 
        <!-- Register Voter -->

          <div >
            <button class="btn btn-large" @click="registerVoter">Register Voter</button>
            <h5 v-if="voted">Successfuly voted!</h5>
          </div>
  
        <!-- Get Candidates -->
   
          <div >
            <button class="btn btn-large" @click="getCandidates">Get Candidates</button>
            <h5> {{ candidates }}</h5>
          </div>
      
        <!-- Get Winner -->
       
          <div   >
            <button class="btn btn-large" @click="getWinner">Get Winner</button>
            <h5> {{ winner }}</h5>
          </div>
        
  
      </div>
    </div>
  </template>
  
  <script   >
  import Web3 from 'web3';
  export default {
    name: 'VoteEther',
  
    data() {
      return {
        connected: false,
        contractResult: '',
        candidateIndex: null,
        newText: '',
        candidates: '',
        winner: '',
        voted: false,

      };
    },
  
    methods: {
      connect() {
        let ethereum = window.ethereum;
        if (ethereum) {
          ethereum.request({ method: 'eth_requestAccounts' }).then(() => {
            this.connected = true;
          });
        }
      },
  
      callContract() {
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
  
        contract.methods.speak().call().then((result) => {
          this.contractResult = result;
        });
      },
  
  
      sendToContract() {
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
  
        let newText = this.newText;
  
        contract.methods
          .changeText(newText)
          .send({ from: window.ethereum.selectedAddress }) // Specify the "from" address
          .then((receipt) => {
            console.log(receipt);
            contract.methods.speak().call().then((result) => {
              this.contractResult = result;
            });
          });
      },
      registerVoter() {
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
  
        contract.methods.registerVoter()
          .send({ from: window.ethereum.selectedAddress })
          .then(() => {
          });
      },
  
      castVote() {
  
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
        let candidate = this.candidateIndex
        contract.methods.castVote(candidate)
          .send({ from: window.ethereum.selectedAddress })
          .then((candidate) => {
            console.log(candidate);
            contract.methods.speak().call().then(() => {
              this.voted = true;
            });
          });
      },
  
      getCandidates() {
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
  
        contract.methods.getCandidates().call()
          .then((candidates) => {
            this.candidates = candidates;
          });
      },
  
      getWinner() {
        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
  
        contract.methods.getWinner().call()
          .then((winner) => {
            this.winner = winner;
          });
      }
    },
  };
  </script>
  