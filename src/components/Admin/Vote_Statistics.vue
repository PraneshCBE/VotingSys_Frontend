<template>
  <HeaderAll></HeaderAll>
  <div class="center-align">
    <h3>Voting Control</h3>
    <div class="opt">
      <h3>Current Voting Status: {{ printStats }}</h3>
      <label>
        <button class="btn waves-effect waves-light" @click="stopVote" variant="outline-danger">{{ printStat }}</button>
        <button v-if='printStat=="Start"' class="btn waves-effect waves-light" @click="publish" variant="outline-danger" style="margin-left: 0.5%;">Publish Results</button>
        
      </label>
    </div>
    <h2>Candidate List</h2>
    <CandidateList></CandidateList>
    <h2 v-if="!voteStat">Stats</h2>
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
      printStats:'',
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
      this.voteStat=await contract.methods.getVotingOn().call();
      console.log("Vote Status: ",this.voteStat)
      this.printStats = this.voteStat ? "Started" : "Stopped";
    },
    async stopVote(){
      let web3 = new Web3(window.ethereum);
      let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
      await contract.methods.stopVote(!this.voteStat).call().then((result) => {
        console.log(result);
        console.log("Vote Status Changed");
        this.getStat();
        this.printStats = this.voteStat ? "Started" : "Stopped";
      });
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