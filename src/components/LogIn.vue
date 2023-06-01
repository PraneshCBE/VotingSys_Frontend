
<template>
    <div class="valign-wrapper" style="height: 100vh ">

        <div class="container">
            <div class="row">
                <div class="col s12 m6 offset-m3">
                    <div class="card">
                        <div class="card-content center-align z-depth-4">
                            <img class="logo" src="../assets/logo.png">
                            <h4>Log in</h4>
                            <h5>as</h5>
                            <!--
                            <div class="switch">
                                <label>
                                    <span>User</span>
                                    <input type="checkbox">
                                    <span class="lever"></span>
                                    <span>Admin</span>
                                </label>
                            </div>
                              -->
                            <div class="toggle">
                                <label class="toggle-option">
                                    <input type="radio" value="user" v-model="userType">
                                    <span>User</span>
                                </label>
                                <label class="toggle-option">
                                    <input type="radio" value="admin" v-model="userType">
                                    <span>Admin</span>
                                </label>
                            </div>

                            <div v-if="userType === 'user'">
                                <div class="input-field">
                                    <input type="text" id="aadhar" v-model="aadhar"
                                        placeholder="Enter your Aadhar Number" />
                                </div>
                                <div class="input-field">
                                    <input type="password" id="password" v-model="password" placeholder="Enter Password" />
                                </div>
                                <button class="waves-effect waves-light btn" v-on:click="login">Log in</button>
                                <p v-if="error" class="err">Please check your credentials</p>
                                <div><router-link class="register-link" to="/register">Register</router-link></div>
                            </div>
                            <AdminLogIn v-if="userType === 'admin'"></AdminLogIn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

  
<script>
import AdminLogIn from "./Admin/AdminLogin.vue";
import axios from 'axios'
export default {
    name: 'LogIn',
    data() {
        return {
            userType: 'user',
            aadhar: '',
            password: '',
            error: false,
            walletConnected: false
        }
    },
    components: {
        AdminLogIn
    },
    methods: {

        async connectWallet() {
            let ethereum = window.ethereum;
            if (ethereum) {
                await ethereum.request({ method: 'eth_requestAccounts' })
                    .then(() => {
                        this.walletConnected = true;
                    });
            }
        },
        async login() {

            try {

                let uri = this.$url + "voters/" + this.aadhar;
                console.log(uri);
                const result = await axios.get(uri)

                // Check if email and password match with the data on the server
                const match = (result.data.aadharNumber === this.aadhar) && (result.data.password === this.password);
                if (match) {
                    this.error = false;

                    console.log("OTPVERIFY", result.data.otpVerfied);
                    if (result.data.otpVerfied) {
                        await this.connectWallet();
                        if (this.walletConnected) {
                            localStorage.setItem("user-info", JSON.stringify({ "aadharNumber": this.aadhar, "name": result.data.name }))
                            localStorage.setItem("isAdmin", 0)
                            this.$router.push({ name: 'HomeScreen' })
                        }
                        else {
                            alert("Connection to Wallet Failed, Try Again");
                        }
                    }
                    else {
                        alert("OTP Verification Pending");
                        this.$router.push({ name: "DummyPage" });
                    }
                } else {
                    this.error = true;
                    // Display error message
                    //alert('Invalid email or password.')
                }
            } catch (error) {
                // Display error message
                this.error = true;
            }
        }

    },
    mounted() {
        let logged = localStorage.getItem("user-info");
        let isAdmin = localStorage.getItem("isAdmin");
        if (logged && isAdmin == 0) {
            this.$router.push({ name: "HomeScreen" })
        }
        else if (logged && isAdmin == 1) {
            this.$router.push({ name: "AdminHome" })
        }
    }
}
</script>
<!--<style>
.logo {
    margin-top: 2%;
    width: 150px;
}

.login input {
    width: 300px;
    height: 40px;
    display: block;
    margin-bottom: 30px;
    margin-right: auto;
    margin-left: auto;
    border: 1px solid #8B0304;
    text-align: center;
}

.login a {
    display: block;
    margin-top: 15px;
    margin-right: auto;
    margin-left: auto;
    text-align: center;
}

.login button {
    width: 320px;
    height: 40px;
    background: #8B0304;
    color: white;
    border-color: #8B0304;
}


.toggle {
    display: flex;
    justify-content: center;
    margin: 20px 0;
}

.toggle-option {
    position: relative;
    display: inline-block;
    margin-right: 20px;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #f2f2f2;
    border-radius: 15px;
    cursor: pointer;
}

.toggle-option span {
    position: relative;
    z-index: 2;
    font-size: 14px;
    font-weight: bold;
}

.toggle-option input[type="radio"] {
    position: absolute;
    opacity: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    cursor: pointer;
}

.toggle-option input[type="radio"]:checked+span {
    color: #fff;
}

.toggle-option input[type="radio"]:checked+span:last-child::before {
    transform: translateX(100%);
}

.err {
    color: red;
}
</style>-->