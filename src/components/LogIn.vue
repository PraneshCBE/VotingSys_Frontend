<template>
    <img class="logo" src="../assets/logo.png">
    <h1>Log in</h1>
    <h2>as</h2>
    <div class="toggle">
        <label class="toggle-option">
            <input type="radio" value="user" v-model="userType">
            <p>User</p>
        </label>
        <label class="toggle-option">
            <input type="radio" value="admin" v-model="userType">
            <p>Admin</p>
        </label>
    </div>
    <div v-if="userType == 'user'" class="login">
        <input type="text" v-model="aadhar" placeholder="Enter your Aadhar Number" />
        <input type="password" v-model="password" placeholder="Enter Password" />
        <button v-on:click="login">Log in</button>
        <p v-if="error" class="err">Please Check your Credentials</p>
        <router-link to="/register" role="button">Register</router-link>
    </div>
    <AdminLogIn v-if="userType == 'admin'"></AdminLogIn>
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
                            localStorage.setItem("isAdmin", false)
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
        if (logged) {
            this.$router.push({ name: "HomeScreen" })
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
<style>
.logo {
    margin-top: 2%;
    width: 150px;
}
button{
  width: fit-content;
}
</style>