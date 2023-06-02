<template>
  <nav style="background: #153b4ee6;">
    <div class="nav-wrapper">
      <p>--</p>
      <a href="#!" class="brand-logo">
        <i class="fa-sharp fa-solid fa-person-booth hide-on-med-and-down"></i>Block Vote
      </a>
      <a href="#" data-target="mobile-menu" class="sidenav-trigger">
        <i class="material-icons">menu</i>
      </a>
      <ul id="nav-desktop" class="right hide-on-med-and-down">
        <li>
          <router-link to="/admin">Home</router-link>
        </li>
        <li>
          <router-link to="/votes">Vote</router-link>
        </li>
        <li>
          <router-link to="#">Profile</router-link>
        </li>
        <li>
          <a @click="logout">Logout</a>
        </li>
      </ul>
      <ul class="sidenav" id="mobile-menu">
        <li>
          <router-link to="/admin">Home</router-link>
        </li>
        <li>
          <router-link to="/votes">Vote</router-link>
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
    mounted(){
    let logged=JSON.parse(localStorage.getItem("user-info"));
    if (!logged)
    {
      this.$router.push({name:"GeneralLogin"});
    }
  this.user=logged.name;
    // eslint-disable-next-line no-undef
    M.AutoInit();
    const mobileMenu = document.querySelector('.sidenav');
     // eslint-disable-next-line no-undef
    M.Sidenav.init(mobileMenu);
  }
   
}

</script>


<!--<style>
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
        background: green;
        color: #000000;
    }
</style>-->
