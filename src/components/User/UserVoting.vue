<template>
    <HeaderAll></HeaderAll>
    <div class="stat">
        <h3>Place your Vote</h3>
        <div class="opt">
            <h3>Current Voting Status: </h3>
            <label>
                <h4>{{ printStat }}</h4>
            </label>
        </div>
        <div v-if="printStat == 'Opened'">
            <div class="cast">
                <router-link id="myLink" @click="RegisterVoter" to="/voteether">
                    <h3>Let's go VOTE via Blockchain 😊</h3>
                </router-link>
            </div>
            <h4>Candidate List</h4>
            <CandidateList></CandidateList>

        </div>
        <h3 v-else>Come After Opening the Vote, Thank You </h3>
    </div>
</template>
<script>
import Web3 from 'web3';
import axios from 'axios';
import HeaderAll from './HeaderAll.vue';
import CandidateList from "../Admin/CandidatesList.vue";
export default {
    name: "UserVoting",
    data() {
        return {
            printStat: "Opened",
            voteStat: false,
            candiChoose: '',
            candidateSelected: ''
        };
    },
    computed: {

    },

    components: {
        HeaderAll,
        CandidateList
    },
    methods: {
        async RegisterVoter() {
            let web3 = new Web3(window.ethereum);
            let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
            let voterAddress = window.ethereum.selectedAddress;

            let isRegistered = await contract.methods.isVoterRegistered(voterAddress).call();

            if (isRegistered) {
                console.log("Voter is already registered");
                // Perform actions for registered voters
            } else {
                console.log("Voter is not registered");
                // Call the registerVoter() function to register the voter
                contract.methods.registerVoter().send({ from: voterAddress })
                    .then(() => {
                        console.log("Voter registered successfully");
                        // Perform actions after successful registration
                    })
                    .catch((error) => {
                        console.error("Registration error:", error);
                        // Handle registration error
                    });
            }
        },

        async getStat() {
            let uri = this.$url + "voteStats";
            const result = await axios.get(uri)
            this.voteStat = result.data[0].votestatus;
            if (this.voteStat) this.printStat = "Opened"
            else this.printStat = "Closed"
        },
        voteBlock() {
            this.candidateSelected = this.candiChoose
            console.log("Selected Candidate:", this.candidateSelected);
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

.opt {
    display: inline-flex;
    align-items: center;
}

.opt h1 {
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
    background-color: #2e6737;
}


.cast input {
    width: 300px;
    height: 40px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid #8B0304;
    text-align: center;
}

.cast button {
    width: 320px;
    height: 40px;
    background: #8B0304;
    color: white;
    border-color: #8B0304;
}


</style>-->

<style>
button{
  width: fit-content;
}
</style>