<template>
  <HeaderAll></HeaderAll>
  <div class="center-align">
    <h3>Voting Control</h3>
    <div class="opt">
      <h3>Current Voting Status: {{ printStats }}</h3>
      <label>
        <button v-if='printStats == "Started"' class="btn waves-effect waves-light" @click="stopVote"
          variant="outline-danger">Stop</button>
         <button v-if='printStats == "Stopped"' class="btn waves-effect waves-light" @click="startVote"
          variant="outline-danger">Start</button>
          <button v-if='printStats=="Stopped"' class="btn waves-effect waves-light" @click="publish" variant="outline-danger" style="margin-left: 0.5%;">Publish Results</button>
        
      </label>
    </div>
    <h2>Candidate List</h2>
    <CandidateList></CandidateList>
  </div>
</template>
<script>
import HeaderAll from './AdminHeader.vue';
import CandidateList from "./CandidatesList.vue";
import Web3 from 'web3';
export default {
  name: "VoteStats",
  data() {
    return {
      voteStat: false,
      printStats: '',
    };
  },
  computed: {
    printStat() {
      return this.voteStat ? "Stop" : "Start";
    },
  },

  components: {
    HeaderAll,
    CandidateList
  },
  methods: {
    async getStat() {
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
      await contract.methods.getVotingOn().call().then((result) => {
        console.log("Result Voting:", result);
        this.voteStat = result;
      })
      console.log("Vote Status: ", this.voteStat)
      this.printStats = this.voteStat ? "Started" : "Stopped";
    },
    async stopVote() {
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
      await contract.methods.endVoting()
        .send({ from: window.ethereum.selectedAddress })
        .then(() => {
          console.log('Voting stopped');
          this.getStat();
        });
    },
    async startVote() {
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
      await contract.methods.startVoting().call().then((result) => {
        console.log(result);
        console.log("Vote started");
        this.getStat();
        this.printStats = this.voteStat ? "Started🟩" : "Stopped🟥";
      });
      await contract.methods.startVoting()
        .send({ from: window.ethereum.selectedAddress })
        .then(() => {
          console.log("Vote started");
          this.getStat();
        });
    },
    publish() {
      confirm("Are you sure you want to publish the results?");
      this.$router.replace({ name: 'ResultsList' })
    }
  },
  mounted() {
    this.getStat();
    let user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: 'GeneralLogin' })
    }
  }
}
</script>
<!--<style>
    .stat h2 {
  text-align: left;
  margin-left: 5%;
}
.opt{
    display: inline-flex;
    align-items: center; 
}
.opt h1{
    margin-right: 10px;
}
.opt button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.opt button:hover {
  background-color: #3e8e41;
}

.opt button:active {
  background-color:#2e6737;
}
</style>-->