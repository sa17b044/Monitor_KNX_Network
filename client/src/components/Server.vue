<template>
  <div class="container">
    <h1>Server</h1>
    <div class="row">
      <div class="col-4 input_pos">
        <div v-if="!editServer">
          <div>
            <label class="form-label">Source IP</label>
            <input
              class="form-control"
              type="text"
              placeholder="Source IP Address"
              v-model="src_ip"
            />
          </div>
          <div>
            <label class="form-label" for="src_port">Port</label>
            <div v-for="(s_port, i) in src_port" :key="'i' + i">
              <input
                type="number"
                class="form-control"
                v-model="s_port.sPort"
                placeholder="0"
              />
              <div class="btn-group">
                <button
                  class="btn alert-success"
                  @click="addSrcPort(i)"
                  v-show="i == src_port.length - 1"
                >
                  <img src="../assets/plus.png" alt="add" />
                </button>
                <button
                  class="btn alert-danger"
                  @click="removeSrcPort(i)"
                  v-show="i || (!i && src_port.length > 1)"
                >
                  <img src="../assets/minus.png" alt="add" />
                </button>
              </div>
            </div>
          </div>
          <div class="">
            <label class="form-label">Destination IP</label>
            <input
              class="form-control"
              type="text"
              placeholder="Destination IP Address"
              v-model="dst_ip"
            />
          </div>
          <div>
            <label class="form-label">Policy</label>
            <input
              class="form-control"
              type="number"
              placeholder="0"
              v-model="policy"
            />
          </div>
          <div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="logKNXnetip"
              />
              <label class="form-check-label" for="detection"
                >Log KNXnetIP</label
              >
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="logToFile"
              />
              <label class="form-check-label" for="detection">Log file</label>
            </div>
          </div>
          <div>
            <button @click="addItemServer()" class="btn btn-primary">
              Add
            </button>
          </div>
        </div>

        <div v-else>
          <div>
            <label class="form-label">Source IP</label>
            <input
              class="form-control"
              type="text"
              placeholder="Source IP Address"
              v-model="src_ip"
            />
          </div>
          <div>
            <label class="form-label" for="src_port">Port</label>
            <div v-for="(s_port, k) in src_port" :key="'k' + k">
              <input
                type="number"
                class="form-control"
                v-model="s_port.sPort"
              />
              <div class="btn-group">
                <button
                  class="btn alert-success"
                  @click="addSrcPort(k)"
                  v-show="k == src_port.length - 1"
                >
                  <img src="../assets/plus.png" alt="add" />
                </button>
                <button
                  class="btn alert-danger"
                  @click="removeSrcPort(k)"
                  v-show="k || (!k && src_port.length > 1)"
                >
                  <img src="../assets/minus.png" alt="add" />
                </button>
              </div>
            </div>
          </div>
          <div>
            <label class="form-label">Destination IP</label>
            <input
              class="form-control"
              type="text"
              placeholder="Destination IP Address"
              v-model="dst_ip"
            />
          </div>
          <div>
            <label class="form-label">Policy</label>
            <input
              class="form-control"
              type="number"
              placeholder="0"
              v-model="policy"
            />
          </div>
          <div class="col">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="logKNXnetip"
              />

              <label class="form-check-label" for="logKNXnetip"
                >Log KNXnetIP</label
              >
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="logToFile"
              />
              <label class="form-check-label" for="logToFile">Log file</label>
            </div>
          </div>
          <div class="col">
            <button
              class="btn btn-success"
              @click="updateItemServer(selectedItemServer)"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <div class="col-8">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Src.IP</th>
              <th scope="col">Des.IP</th>
              <th scope="col">Port</th>
              <th scope="col">Policy</th>
              <th scope="col">Log KNXnetIP</th>
              <th scope="col">Log file</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, numberList) in itemListS" :key="item._id">
              <th scope="row">{{ ++numberList }}</th>
              <td>{{ item.src_ip }}</td>
              <td>{{ item.dst_ip }}</td>
              <td>
                <div
                  class="col"
                  v-for="(port, indexPort) in item.src_port"
                  :key="indexPort"
                >
                  {{ port.sPort }}
                </div>
              </td>
              <td>{{ item.policy }}</td>
              <td>{{ item.logKNXnetip }}</td>
              <td>{{ item.logToFile }}</td>
              <td>
                <div class="btn-group">
                  <button
                    class="btn btn-warning"
                    @click="editItemServer(i, item)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-danger"
                    @click="removeItemServer(item, i)"
                  >
                    Delete
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
      editServer: false,
      src_ip: "",
      src_port: [
        {
          sPort: ""
        }
      ],
      dst_ip: "",
      policy: "",
      logKNXnetip: false,
      logToFile: false,
      itemListS: [],
      selectedItemServer: ""
    };
  },
  async mounted() {
    const response = await axios.get("http://localhost:8081/api/serverList/");
    this.itemListS = response.data;
  },
  methods: {
    addSrcPort(index) {
      this.src_port.push({ sPort: "" });
    },
    removeSrcPort(index) {
      this.src_port.splice(index, 1);
    },
    async addItemServer() {
      const response = await axios.post(
        "http://localhost:8081/api/serverList/",
        {
          src_ip: this.src_ip,
          src_port: this.src_port,
          dst_ip: this.dst_ip,
          policy: this.policy,
          logKNXnetip: this.logKNXnetip,
          logToFile: this.logToFile
        }
      );
      this.itemListS.push(response.data);
      this.src_ip = "";
      this.dst_ip = "";
      this.policy = "";
      this.logKNXnetip = false;
      this.logToFile = false;
    },
    async removeItemServer(itemServer, i) {
      await axios.delete(
        "http://localhost:8081/api/serverList/" + itemServer._id
      );
      this.itemListS.splice(i, 1);
      const response = await axios.get("http://localhost:8081/api/serverList/");
      this.itemListS = response.data;
    },
    async updateItemServer(itemServer) {
      await axios.put(
        "http://localhost:8081/api/serverList/" + itemServer._id,
        {
          src_ip: this.src_ip,
          src_port: this.src_port,
          dst_ip: this.dst_ip,
          policy: this.policy,
          logKNXnetip: this.logKNXnetip,
          logToFile: this.logToFile
        }
      );
      this.editServer = false;
      const response = await axios.get("http://localhost:8081/api/serverList/");
      this.itemListS = response.data;
    },
    editItemServer(i, itemServer) {
      this.editServer = true;
      this.src_ip = itemServer.src_ip;
      this.src_port = itemServer.src_port;
      this.dst_ip = itemServer.dst_ip;
      this.policy = itemServer.policy;
      this.logKNXnetip = itemServer.logKNXnetip;
      this.logToFile = itemServer.logToFile;
      this.selectedItemServer = itemServer;
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
  color: azure;
  border-radius: 10px;
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
input {
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
  border-radius: 5px;
}
td,tr,th{
padding: 1% 2% 0.5% 2%;
}
</style>
