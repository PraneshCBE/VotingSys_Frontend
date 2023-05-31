<template>
    <nav>
      <div class="nav-wrapper">
       <!--<a href="#" class="brand-logo">
          <img src="../../assets/logo_1.png" alt="Logo" />
        </a>--> 
        <a href="#" class="brand-logo"><i class="fa-sharp fa-solid fa-person-booth"></i>Block Vote</a>
        <ul id="nav-mobile" class="right">
          <li>
            <router-link to="/">Home</router-link>
          </li>
          <li>
            <router-link to="/vote">Vote</router-link>
          </li>
          <li>
            <router-link to="#">Profile</router-link>
          </li>
          <li>
            <a @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </nav>
  </template>
  
<script>

export default{
    name: 'HeaderAll',
    methods:{
        logout()
        {
            localStorage.clear();
            this.$router.push({name: "GeneralLogin"})

        }
    },
   
}

</script>
<!--
<style>
    body{
        padding: 0;
        margin: 0;
    }
    .nav{
        background-color: #ffffff;
        overflow: hidden;
    }
    .nav img{
        float: left;
        margin-right: 8px;
        width: 250px;
    }
    .nav a{
        float: left;
        color: rgb(7, 6, 6);
        padding: 14px 16px;
        font-size: 16px;
        text-decoration: none;
        margin-right: 8px;
       flex-wrap: inherit;
       align-items: center;
    }
    .nav a:hover{
        background: rgb(0, 93, 244);
        color: #000000;
    }
</style>
-->