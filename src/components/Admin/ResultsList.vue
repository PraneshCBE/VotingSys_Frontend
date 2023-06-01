<template>
    <div>
        <div class="container">
            <div class="row">
                <div class="col s12">
                    <div class="card-group">
                        <div class="col s12 m6 l4" v-for="(candidate, i) in candidates" :key="candidate._id">
                            <div class="card">
                                <div class="card-image">
                                    <img :src="candidate.partyLogoUrl" alt="Party Logo" width="200" height="200">
                                </div>
                                <div class="card-content">
                                    <h4 class="card-title">{{ i + 1 }}</h4>
                                    <h5 class="card-title">{{ candidate.name }}</h5>
                                    <p class="card-text">Party: {{ candidate.party }}</p>
                                    <p class="card-text">Votes: {{ candidate.votes }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Web3 from 'web3';
export default {
    name: "ResultsList",
    data() {
        return {
            candidates: [],
        };
    },
    methods: {
        bringToFront(event) {
            const card = event.currentTarget;
            card.style.zIndex = "1";
            card.style.transform = "scale(1.1)";
            card.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.2)";
        },
        resetCardStyles(event) {
            const card = event.currentTarget;
            card.style.zIndex = "0";
            card.style.transform = "scale(1)";
            card.style.boxShadow = "";
        },
        async makeCandi() {
            let db = []
            await fetch(this.$url + "createCandidates")
                .then(response => response.json())
                .then(data => {
                    db = data
                });
            console.log("db:", db)
            let cont = []
            let web3 = new Web3(window.ethereum);
            let contract = new web3.eth.Contract(this.$abi, this.$contractAddress);
            await contract.methods.getCandidates().call()
                .then((candidates) => {
                    cont = candidates
                });
            console.log("contract:", cont)
            let join = []
            for (let i = 0; i < db.length; i++) {
                if (db[i].name == cont[i].name) {
                    join.push({
                        partyLogoUrl: db[i].partyLogoUrl,
                        party: db[i].party,
                        name: db[i].name,
                        votes: cont[i].voteCount
                    })
                }
            }
            console.log("join", join)
            this.candidates = join
        }
    },
    mounted() {
        this.makeCandi()

    },
}
</script>