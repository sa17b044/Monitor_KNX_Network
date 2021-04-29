<template>
  <div class="container">
    <h1>Policy</h1>
      <div class="row ">
        <div class="col-2">
          <div v-if="!editPolicy">
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="detection"
                checked="true"
              />
              <label class="form-check-label" for="detection">Detection</label>
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="inspection"
                checked="true"
              />
              <label class="form-check-label" for="inspection"
                >Inspection</label
              >
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                checked="true"
                v-model="individual_addressing"
              />
              <label class="form-check-label" for="individual_addressing"
                >Individual addressing</label
              >
            </div>
            <label class="form-label" for="services">Services</label>
            <div v-for="(service, kk) in services" :key="'k' + kk">
              <input
                type="text"
                class="form-control "
                v-model="service.select"
                placeholder="Services"
              />
              <span class="btn-group">
                <button
                  class="btn alert-success"
                  @click="add(kk)"
                  v-show="kk == services.length - 1"
                >
                  <img src="../assets/plus.png" alt="add" />
                </button>
                <button
                  class="btn alert-danger"
                  @click="remove(kk)"
                  v-show="kk || (!kk && services.length > 1)"
                >
                  <img src="../assets/minus.png" alt="minus" />
                </button>
              </span>
            </div>
            <label class="form-label" for="services">App Services</label>
            <!-- {{services}} -->
            <div v-for="(app, ll) in app_services" :key="'l' + ll">
              <input
                type="text"
                class="form-control "
                v-model="app.select_app"
                placeholder="App Services"
              />
              <span class="btn-group">
                <button
                  class="btn alert-success"
                  @click="addApp(ll)"
                  v-show="ll == app_services.length - 1"
                >
                  <img src="../assets/plus.png" alt="add" />
                </button>
                <button
                  class="btn alert-danger"
                  @click="removeApp(ll)"
                  v-show="ll || (!ll && app_services.length > 1)"
                >
                  <img src="../assets/minus.png" alt="minus" />
                </button>
              </span>
            </div>
            <div>
              <label class="form-label">Group address level</label>
              <input
                class="form-control"
                type="number"
                min="1"
                max="100"
                v-model="group_address_level"
                placeholder="0"
              />
            </div>
            <div>
              <label class="form-label">Group address file</label>
              <select class="form-control" v-model="group_address_file">
                <option v-for="xml in xmlList" :key="xml._id + 1">
                  {{ xml.originalname }}
                </option>
              </select>
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="header"
                checked="false"
              />
              <label class="form-check-label" for="individual_addressing"
                >Header</label
              >
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="payload"
                checked="true"
              />
              <label class="form-check-label" for="individual_addressing"
                >Payload</label
              >
            </div>

            <button class="btn btn-primary" @click="addItem()">Add</button>
          </div>
          <div v-else>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="detection"
                checked="true"
              />
              <label class="form-check-label" for="detection">Detection</label>
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="inspection"
                checked="true"
              />
              <label class="form-check-label" for="inspection"
                >Inspection</label
              >
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                checked="true"
                v-model="individual_addressing"
              />
              <label class="form-check-label" for="individual_addressing"
                >Individual addressing</label
              >
            </div>
            <label class="form-label" for="services">Services</label>
            <div v-for="(service, k) in services" :key="k">
              <input
                type="text"
                class="form-control "
                v-model="service.select"
              />
              <span class="btn-group">
                <button
                  class="btn alert-success"
                  @click="add(k)"
                  v-show="k == services.length - 1"
                >
                  <img src="../assets/plus.png" alt="add" />
                </button>
                <button
                  class="btn alert-danger"
                  @click="remove(k)"
                  v-show="k || (!k && services.length > 1)"
                >
                  <img src="../assets/minus.png" alt="add" />
                </button>
              </span>
            </div>
            <label class="form-label" for="services">App Services</label>
            <div v-for="(app, l) in app_services" :key="l">
              <input
                type="text"
                class="form-control "
                v-model="app.select_app"
              />
              <span class="btn-group">
                <button
                  class="btn alert-success"
                  @click="addApp(l)"
                  v-show="l == app_services.length - 1"
                >
                  <img src="../assets/plus.png" alt="add" />
                </button>
                <button
                  class="btn alert-danger"
                  @click="removeApp(l)"
                  v-show="l || (!l && app_services.length > 1)"
                >
                  <img src="../assets/minus.png" alt="add" />
                </button>
              </span>
            </div>
            <div>
              <label class="form-label">Group address level</label>
              <input
                class="form-control"
                type="number"
                min="1"
                max="100"
                v-model="group_address_level"
              />
            </div>
            <div>
              <label class="form-label">Group address file</label>
              <select class="form-control" v-model="group_address_file">
                <option v-for="xml in xmlList" :key="xml._id">
                  {{ xml.originalname }}
                </option>
              </select>
            </div>
            <div class=" form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="header"
                checked="true"
              />
              <label class="form-check-label" for="individual_addressing"
                >Header</label
              >
            </div>
            <div class="form-check">
              <input
                type="checkbox"
                class="form-check-input"
                v-model="payload"
                checked="true"
              />
              <label class="form-check-label" for="individual_addressing"
                >Payload</label
              >
            </div>
            <button class="btn btn-success" @click="updateItem(selectedItem)">
              Update
            </button>
          </div>
        </div>
        <div class="col-10">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Detection</th>
                <th scope="col">Inspection</th>
                <th scope="col">Individual addressing</th>
                <th scope="col">Services</th>
                <th scope="col">App Services</th>
                <th scope="col">Group address level</th>
                <th scope="col">Group address file</th>
                <th scope="col">Header</th>
                <th scope="col">Payload</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in itemListP" :key="item._id">
                <th scope="row">{{ ++i }}</th>
                <td>{{ item.detection }}</td>
                <td>{{ item.inspection }}</td>
                <td>{{ item.individual_addressing }}</td>
                <td>
                  <div
                    class="col"
                    v-for="(serv, ind) in item.services"
                    :key="ind"
                  >
                    {{ serv.select }}
                  </div>
                </td>
                <td>
                  <div
                    class="col"
                    v-for="(appServ, inde) in item.app_services"
                    :key="inde"
                  >
                    {{ appServ.select_app }}
                  </div>
                </td>
                <td>{{ item.group_address_level }}</td>
                <td>{{ item.group_address_file }}</td>
                <td>{{ item.header }}</td>
                <td>{{ item.payload }}</td>
                <td>
                  <div class="btn-group">
                    <button
                      class="btn btn-warning"
                      @click="editItem(i, item)"
                    >
                      Edit
                    </button>
                    <button
                      class="btn btn-danger"
                      @click="removeItem(item, i)"
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
      services: [
        {
          select: ""
        }
      ],
      app_services: [
        {
          select_app: ""
        }
      ],
      detection: false,
      inspection: false,
      individual_addressing: false,
      group_address_level: "",
      group_address_file: "",
      header: false,
      payload: false,
      itemListP: [],
      editPolicy: false,
      xmlList: [],
      selectedItem: ""
    };
  },
  async mounted() {
    const responseP = await axios.get("http://localhost:8081/api/policyList/");
    this.itemListP = responseP.data;
    // console.log(this.itemListP);
    const resXml = await axios.get("http://localhost:8081/api/xmlList/");
    // console.log("##");
    this.xmlList = resXml.data;
  },
  methods: {
    add(index) {
      this.services.push({ select: "" });
    },
    remove(index) {
      this.services.splice(index, 1);
    },
    addApp(index) {
      this.app_services.push({ select_app: "" });
    },
    removeApp(index) {
      this.app_services.splice(index, 1);
    },
    async addItem() {
      const response = await axios.post(
        "http://localhost:8081/api/policyList/",
        {
          detection: this.detection,
          inspection: this.inspection,
          individual_addressing: this.individual_addressing,
          services: this.services,
          app_services: this.app_services,
          group_address_level: this.group_address_level,
          group_address_file: this.group_address_file,
          header: this.header,
          payload: this.payload
        }
      );
      this.itemListP.push(response.data);
      this.detection = false;
      this.inspection = false;
      this.individual_addressing = false;
      this.group_address_level = "";
      this.header = false;
      this.payload = false;
      const res = await axios.get("http://localhost:8081/api/policyList/");
      console.log(res.data);
    },
    async removeItem(item, i) {
      await axios.delete("http://localhost:8081/api/policyList/" + item._id);
      this.itemListP.splice(i, 1);
      const response = await axios.get("http://localhost:8081/api/policyList/");
      this.itemListP = response.data;
      this.detection = false;
      this.inspection = false;
      this.individual_addressing = false;
      this.group_address_level = "";
      this.header = false;
      this.payload = false;
    },
    async updateItem(item) {
      await axios.put("http://localhost:8081/api/policyList/" + item._id, {
        detection: this.detection,
        inspection: this.inspection,
        individual_addressing: this.individual_addressing,
        group_address_level: this.group_address_level,
        group_address_file: this.group_address_file,
        services: this.services,
        app_services: this.app_services,
        header: this.header,
        payload: this.payload
      });
      this.editPolicy = false;
      const response = await axios.get("http://localhost:8081/api/policyList/");
      this.itemListP = response.data;
    },
    editItem(i, item) {
      console.log(item);
      this.editPolicy = true;
      this.detection = item.detection;
      this.inspection = item.inspection;
      this.individual_addressing = item.individual_addressing;
      this.group_address_level = item.group_address_level;
      this.group_address_file = item.group_address_file;
      this.services = item.services;
      this.app_services = item.app_services;
      this.header = item.header;
      this.payload = item.payload;
      this.selectedItem = item;
    }
  },
  created() {
    if (localStorage.getItem("token") === null || localStorage.getItem("role")=== 'Read-Only')
    this.$router.push("/");  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.row {
  display: flex;
  /* border: 2px solid rebeccapurple; */
}
.col-2 {
  color: aliceblue;
  flex-wrap: wrap;
  width: 355px;
  padding: 1% 1% 2% 1%;
  /* border: 2px solid blue; */
}
.col-10 {
  flex-wrap: wrap;
  width: 1330px;
  padding: 1% 1% 2% 1%;
  /* border: 2px solid ivory; */
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
  max-width: 1700px;
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
input,select {
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
  /* border: 2px solid gold; */
  width: 500px;
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
