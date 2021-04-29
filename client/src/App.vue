<template>
  <div id="app">
    <div>
      <nav
        class="navbar fixed-top navbar-expand-lg navbar-dark bg-dark container-fluid"
      >
        <a class="navbar-brand" href="/#/home">PAYMAN</a>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link" href="/#/inspection">Inspection</a>
            <a class="nav-item nav-link" href="/#/log">Log</a>
            <a class="nav-item nav-link" href="/#/upload">Upload</a>
            <a class="nav-item nav-link" href="/#/users">Users</a>
            <a class="nav-item nav-link" href="/#/" @click="logout()">Logout</a>
          </div>
        </div>
      </nav>
      <div class="row"></div>
      <div class="row">
        <div class="col"><router-view /></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    logout(){
      localStorage.clear()
    }
  },
};
</script>

<style>
a {
  color: black;
  text-decoration: none;
  display: inline-block;
}
a:hover,
a:active {
  color: gray;
}
body {
  background: linear-gradient(to right, #00aaff, #00ff6c);
}
.row{
  --bs-gutter-x: 0;
  --bs-gutter-y: 0;
}
#app {
  /* font-family: "Avenir", Helvetica, Arial, sans-serif; */
}
</style>
