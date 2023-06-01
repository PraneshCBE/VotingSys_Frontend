<template>
  <HeaderAll></HeaderAll>
  <h1 class="center-align">{{ user }}</h1>
  <h4 class="center-align">Welcome to the Secure Voting using Blockchain 😊</h4>
  <marquee behavior="scroll" direction="left">You can submit Forms for Karnataka, Maharashtra, Meghalaya, Nagaland, Tripura, Uttar Pradesh, West Bengal, Lakshadweep, Jammu and Kashmir and Ladakh States/UTs from here. For submitting Forms for other States/UTs please click on https://voters.eci.gov.in</marquee>
  <div class="home-screen">
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Go to Voting</span>
            <p>Participate in the voting process</p>
          </div>
          <div class="card-action">
            <button class="btn waves-effect waves-light" @click="this.$router.push({ name: 'UserVoting' });">
              Go to Voting
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Other Services</span>
            <p>Explore additional services</p>
          </div>
          <div class="card-image">
            <img src="../../assets/other_serv.png">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import HeaderAll from './HeaderAll.vue';
export default {
  name: "HomeScreen",
  data() {
    return {
      user: '',
    }
  },
  components: {
    HeaderAll
  },
  mounted() {
    let logged = JSON.parse(localStorage.getItem("user-info"));
    if (!logged) {
      this.$router.push({ name: "GeneralLogin" });
    }
    this.user = logged.name;
    let isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin == 1) {
      this.$router.push({ name: "AdminHome" });
    }
    else if (isAdmin == undefined) {
      this.$router.push({ name: "GeneralLogin" });
    }
  },
};  
</script>
<!--<style>
.home-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
}

.serv h2 {
  margin-top: 2%;
  color: rgb(9, 148, 49);
}

.serv img {
  width: 100%;
  height: 85vh;
  object-fit: cover;
}

.button-container {
  width: 100%;
}

.voting-buttona {
  display: inline-block;
  width: 100%;
  height: 200px;
  background: url('../../assets/button_bg.png') no-repeat center fixed;
  background-size: cover;
  transition: all 0.3s ease-in-out;
}

.voting-buttona:hover {
  transform: scale(1.1);
  filter: brightness(90%);
}

.button-text {
  display: inline-block;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  padding: 10px 20px;
  border: 2px solid #fff;
  border-radius: 30px;
}

.button-text:hover {
  color: #000;
  background-color: #fff;
}
</style>-->
<style>
.card {
  background-color: rgba(250, 253, 255, 0.836); /* Adjust the opacity as needed */
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.315); /* Adjust the shadow properties as needed */
}
</style>