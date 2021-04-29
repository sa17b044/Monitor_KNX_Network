<template>
  <div class="container">
    <h1>Users</h1>
    <div class="row">
      <div class="col-4">
        <div v-if="!edit">
          <div class="row">
            <label>User Name</label>
            <div class="col">
              <input type="text" v-model="user_name" />
            </div>
          </div>
          <div class="row">
            <label>Password</label>
            <div class="col">
              <input :type="type" v-model="password" />
              <button class="btn btn-secondary show" @click="showPassword()">
                {{ btnText }}
              </button>
            </div>
          </div>
          <div class="row">
            <label>Confirm password</label>
            <div class="col">
              <input :type="type" v-model="conf_password" />
              <button class="btn btn-secondary show" @click="showPassword()">
                {{ btnText }}
              </button>
            </div>
          </div>
          <div v-if="msg">
            <div class="alert alert-danger">{{ textMsg }}</div>
          </div>
          <div class="row">
            <label>Roles</label>
            <div class="col">
              <select v-model="role">
                <option value="Admin">Admin</option>
                <option value="Read-Only">Read-Only</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button class="btn btn-primary" @click="addItem()">Add</button>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="row">
            <label>User Name</label>
            <div class="col">
              <input type="text" v-model="user_name" />
            </div>
          </div>

          <div class="row">
            <label>Password</label>
            <div class="col">
              <input :type="type" v-model="password" /><button
                class="btn btn-secondary show"
                @click="showPassword()"
              >
                {{ btnText }}
              </button>
            </div>
          </div>

          <div class="row">
            <label>Confirm password</label>
            <div class="col">
              <div>
                <input :type="type" v-model="conf_password" /><button
                  class="btn btn-secondary show"
                  @click="showPassword()"
                >
                  {{ btnText }}
                </button>
              </div>
            </div>
          </div>
          <div v-if="msg">
            <div class="alert alert-danger">{{ textMsg }}</div>
          </div>

          <div class="row">
            <label>Role</label>
            <div class="col">
              <select v-model="role">
                <option value="Admin">Admin</option>
                <option value="Read-Only">Read-Only</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <button class="btn btn-success" @click="updateItem(selectedItem)">
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">User</th>
              <th scope="col">Password</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in itemList" :key="item._id">
              <th scope="row">{{ ++i }}</th>
              <td>{{ item.username }}</td>
              <td>{{ item.password }}</td>
              <td>{{ item.role }}</td>

              <td>
                <div class="btn-group">
                  <button class="btn btn-warning" @click="editItem(i, item)">
                    Edit
                  </button>
                  <button class="btn btn-danger" @click="removeItem(item, i)">
                    Remove
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      edit: false,
      user_name: "",
      password: "",
      conf_password: "",
      role: "",
      itemList: [],
      selectedItem: "",
      msg: false,
      textMsg: "",
      type: "password",
      btnText: "Show"
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/userList/");
    this.itemList = response.data;
  },
  methods: {
    async addItem() {
      if (this.password == this.conf_password) {
        const response = await axios.post(
          "http://localhost:8081/api/userList/",
          {
            username: this.user_name,
            password: this.password,
            role: this.role
          }
        );
        this.itemList.push(response.data);
        this.user = "";
        this.password = "";
        this.conf_password = "";
        this.role = "";
        this.msg = false;
      } else {
        // console.log(this.msg)
        this.msg = true;
        // console.log(this.msg)
        this.textMsg = "Password wrong";
      }
    },
    async removeItem(item, i) {
      await axios.delete("http://localhost:8081/api/userList/" + item._id);
      this.itemList.splice(i, 1);
      const response = await axios.get("http://localhost:8081/api/userList/");
      this.itemList = response.data;
    },
    async updateItem(item) {
      await axios.put("http://localhost:8081/api/userList/" + item._id, {
        username: this.user_name,
        password: this.password,
        role: this.role
      });
      this.edit = false;
      this.user = "";
      this.password = "";
      this.conf_password = "";
      this.role = "";
      const response = await axios.get("http://localhost:8081/api/userList/");
      this.itemList = response.data;
    },

    editItem(i, item) {
      this.edit = true;
      this.user_name = item.username;
      this.password = item.password;
      this.role = item.role;
      this.selectedItem = item;
    },
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.btnText = "Hide";
      } else {
        this.type = "password";
        this.btnText = "Show";
      }
    }
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
.row {
  display: flex;
}
.col-4 {
  color: aliceblue;
  flex-wrap: wrap;
  width: 355px;
  padding: 1% 3% 2% 3%;
}
.col-8 {
  flex-wrap: wrap;
  width: 955px;
  padding: 0% 3% 2% 3%;
}
img {
  width: 15px;
  height: auto;
  padding: 0% 0% 20% 0;
}
.container {
  border-radius: 10px;
  border: 5px solid black;
  margin: 5% auto;
  padding: 10% auto;
  background-color: hsla(0, 0%, 0%, 0.255);
}
h1 {
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  font-size: 50px;
  margin: 2% 5% 1% 5%;
  flex-direction: column;
  border: 3px black solid;
  border-radius: 10px;
  text-align: center;
}
input,
select {
  border: 3px solid black;
  border-radius: 10px;
  padding: 2%;
  margin: 0 0 0.5% 0;
}
.btn {
  border-radius: 10px;
  border: 3px solid black;
}
label {
  margin: 0%;
  font-weight: bold;
}
table {
  color: aliceblue;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}
</style>
