<template>
  <HeaderAll></HeaderAll>
  <div class="container">
    <div class="section centre-align">
      <!-- Cast Vote -->
      <h2 class="centre-align">Cast your Votes now 😊!!</h2>
      <div class="row center-align">
        <p >Select Candidate</p>
        <div class="input-field col s12">
          <!-- <input v-model="candidateIndex" class="form-control" type="number" placeholder="Enter the Candidate id"> -->
          <select class="browser-default" v-model="candidateIndex" >
            <option v-for="(candidate, i) in candidates" :key="candidate.name" :value="i">{{ candidate.name }}</option>
          </select>
          <!--<label for="candidateIndex">Select Candidate</label>-->
        </div>
      </div>
      <div class="row center-align">
        <div class="col s12">
          <button class="btn" @click="castVote">Vote for Candidate</button>
        </div>
      </div>
    </div>
  </div>
  <CandidateList />
</template>
  
<script>
import CandidateList from "../Admin/CandidatesList.vue";
import HeaderAll from "./HeaderAll.vue";
import Web3 from 'web3';
export default {
  name: 'VoteEther',
  components: {
    CandidateList,
    HeaderAll
},
  data() {
    return {
      connected: false,
      contractResult: '',
      candidateIndex: null,
      newText: '',
      winner: '',
      voted: false,
      candidates: []

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
            //alert message of successfull voting
            alert("Thank you for Voting!")
            this.$router.replace({ name: 'HomeScreen' })
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
  mounted() {
    let web3 = new Web3(window.ethereum);
    let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
    contract.methods.getCandidates().call()
      .then((candidates) => {
        this.candidates = candidates;
        console.log(candidates)
      });
  }
};
</script>
<style>
select {
  appearance: none;
  background-color: #dfe0e099;
  padding: 0 1em 0 0;
  margin: 0;
  width: 100%;
}
</style>