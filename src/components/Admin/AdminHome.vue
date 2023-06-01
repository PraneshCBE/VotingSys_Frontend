<template>
  <HeaderAll></HeaderAll>
  <h2 class="center-align">{{ user }}</h2>
  <h4 class="center-align">Welcome to the Admin Portal 😊</h4>
  <div class="home-screen">
    <div class="row">
      <div class="col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title">Go to Voting Control 🧑‍💻</span>
            <p>Manage and view voting statistics</p>
          </div>
          <div class="card-action">
            <button class="btn waves-effect waves-light" @click="this.$router.push({ name: 'VoteStats' });">
              Go to Voting Control
              <i class="material-icons right">arrow_forward</i>
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
  <footer class="page-footer" style="background: #153b4ee6; bottom: 0; width: 100%; z-index: 10;">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">Block Vote</h5>
          <p class="grey-text">secure voting system built using Vue.js, Express, and Ethereum virtual machine provides a
            reliable and transparent voting process, ensuring the integrity of the democratic process.
            🧑‍💻🐼</p>
        </div>
        <div class="col l4 offset-l2 s12">
          <h5 class="white-text">Tools used 🚴‍♀️</h5>
          <ul>
            <li><a class="grey-text text-lighten-3" href="#!">Vue js</a><img
                src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" width=50px height=10px />
            </li>
            <li><a class="grey-text text-lighten-3" href="#!">Node</a><img
                src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" width=50px height=10px />
            </li>
            <li><a class="grey-text text-lighten-3" href="#!">Ethereum</a> <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/76/Ethereum_Classic_logo.svg" width=50px
                height=10px /></li>
          </ul>
        </div>
      </div>
      <div class="footer-copyright">
        © 2023 Cyber_Centis
      </div>
    </div>
  </footer>
</template>

<script>
import HeaderAll from './AdminHeader.vue';
export default {
  name: "AdminHome",
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
    this.user = logged.name;
  }
}
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
  
  .voting-button {
    display: inline-block;
    width: 100%;
    height: 200px;
    background: url('../../assets/blVote.png') no-repeat center fixed;
    background-size: cover;
    transition: all 0.3s ease-in-out;
  }
  
  .voting-button:hover {
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
