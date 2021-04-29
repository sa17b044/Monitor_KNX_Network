<template>
  <div class="container">
    <h1>Log</h1>
    <div class="row">
      <div class="col"></div>
      <div class="col"><a href="/#/offline">Passive</a></div>
      <div class="col"><a href="/#/online">Active</a></div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    if (
      localStorage.getItem("token") === null ||
      localStorage.getItem("role") === "Read-Only"
    )
      this.$router.push("/");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  max-width: 1200px;
  border-radius: 10px;
  border: 5px solid black;
  margin: 5% auto;
  padding: 1% 2% 2% 2%;
  background-color: hsla(0, 0%, 0%, 0.255);
}
a {
  background-color: rgba(0, 0, 0, 0.35);
  height: 250px;
  display: flex;
  font-size: 50px;
  padding: 25% 0% 0% 0%;
  margin: 0 1% 0 1%;
  flex-direction: column;
  border: 3px black solid;
  border-radius: 10px;
  text-align: center;
}
a:hover {
  color: aliceblue;
  border: 3px aliceblue solid;
  background-color: rgba(0, 0, 0);
}
h1 {
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  font-size: 50px;
  flex-direction: column;
  border: 3px black solid;
  border-radius: 10px;
  text-align: center;
}
</style>
