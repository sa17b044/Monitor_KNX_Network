<template>
  <div class="container">
    <div class="pos">
    <h1>Please Login</h1>
    <input type="text" v-model="username" placeholder="User" />
    <input type="user" v-model="password" placeholder="Password" />
    <button class="btn btn-primary" @click="login()">Login</button>
  </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async login() {
      await axios
        .post("http://localhost:8081/auth/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          if (res.status === 200) {
            console.log(res.data)
            localStorage.setItem("token", res.data.token);
            if (res.data.role !== "Admin") {
            localStorage.setItem("role", res.data.role);
              console.log("online");
              this.$router.push("/online");
            }else{
              localStorage.setItem("role", res.data.role);
              console.log("home");
              this.$router.push("/home");
            }
          }
        });
      this.password = "";
      this.username = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input {
  display: block;
  border: 3px solid black;
  border-radius: 10px;
  padding: 2%;
}
.btn {
  border-radius: 10px;
  border: 3px solid black;
}
.container {
  border-radius: 10px;
  border: 5px solid black;
  margin: 5% auto;
  padding: 10% auto;
  background-color: hsla(0, 0%, 0%, 0.255);
}
.pos{
  margin: 5% auto;
  max-width: 260px;
}
</style>
