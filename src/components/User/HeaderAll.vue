<template>
    <nav>
        <ul>
       <li><img src="../../assets/logo_1.png"/></li>
    </ul>
       <ul>
       <li><router-link to="/">Home</router-link> </li>
       <li><router-link to="/vote">Vote</router-link></li>
       <li><router-link to="#">Profile</router-link></li>
       <li><a v-on:click="logout">Logout</a></li>
    </ul>
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