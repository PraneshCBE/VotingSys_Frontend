<template>
  <div class="container">
    <div class="section">



      <!-- Call Contract 
 
          <div  >
            <button class="btn btn-large" @click="callContract">Call contract</button>
            <h5>{{ contractResult }}</h5>
          </div>
 

          <div  >
            <form @submit.prevent="sendToContract">
              <label for="newText">New Text</label>
              <input type="text" id="newText" v-model="newText" required>
              <button class="btn btn-large">Submit</button>
            </form>
          </div>
        -->

      <!-- Cast Vote -->

      <div>
        <!-- <input v-model="candidateIndex" class="form-control" type="number" placeholder="Enter the Candidate id"> -->
        <select class="form-control" v-model="candidateIndex">
      <option v-for="(candidate,i) in candidates" :key="candidate.name" :value="i">{{ candidate.name }}</option>
    </select>
        <button class="btn btn-large" @click="castVote">Vote for Candidate</button>
      </div>
      <CandidateList />
      <!-- Get Candidates
   
          <div >
            <button class="btn btn-large" @click="getCandidates">Get Candidates</button>
            <h5> {{ candidates }}</h5>
          </div> -->

      <!-- Get Winner
       
          <div   >
            <button class="btn btn-large" @click="getWinner">Get Winner</button>
            <h5> {{ winner }}</h5>
          </div>
        
   -->
    </div>
  </div>
</template>
  
<script>
import CandidateList from "../Admin/CandidatesList.vue";
import Web3 from 'web3';
export default {
  name: 'VoteEther',
  components: {
    CandidateList
  },
  data() {
    return {
      connected: false,
      contractResult: '',
      candidateIndex: null,
      newText: '',
      winner: '',
      voted: false,
      candidates:[]

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
            this.$router.replace({name:'HomeScreen'})
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
      });
  }
};
</script>
<style>
button{
  width: fit-content;
}
</style>