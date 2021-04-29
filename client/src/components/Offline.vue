<template>
  <div class="container">
    <h1>Passive</h1>
    <div class="row">
      <div class="col">
        <div>
          <label>Upload a pcap file</label>
        </div>
        <input type="file" @change="onFileSelected" />
        <button class="btn btn-info" @click="run()">Run</button>
      </div>
    </div>
    <!-- {{log}} -->
    <div v-if="logData">
        <div class="alert-danger alert col">
          >_ Source <br />
          IP: {{ sIP }} - Port: {{ sPort }}
        </div>
        <div class="alert-light alert col">
          >_ Destination <br />
          IP: {{ dIP }} - Port: {{ dPort }}
        </div>
        <div class="alert-danger alert col">
          >_ Output : <br />
          {{ log }}
        </div>
        <div v-if="!showBtn">
          <div class="btn-group">
            <button class="btn btn-secondary" @click="showEn()">More</button>
            <button class="btn btn-danger" @click="block()">Block</button>
            <button class="btn btn-success" @click="unblock()">Unblock</button>
          </div>
        </div>
        <div v-else>
          <div id="output" class="alert-secondary alert">
            <p v-for="(par, index) of pars" :key="index">
              {{ par }}
            </p>
          </div>
          <div class="btn-group">
            <button class="btn btn-warning" @click="showDi()">Less</button>
            <button class="btn btn-danger" @click="block()">Block</button>
            <button class="btn btn-success" @click="unblock()">Unblock</button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      output: "",
      allOutput: "",
      sIP: "",
      dIP: "",
      sPort: "",
      dPort: "",
      log: "",
      showBtn: false,
      logData: false,
      selectedFile: null
    };
  },
  computed: {
    pars() {
      return this.output.split("\n");
    }
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
    },
    showEn() {
      this.showBtn = true;
    },
    showDi() {
      this.showBtn = false;
    },
    async run() {
      this.logData = true;
      const fd = new FormData();
      fd.append("file", this.selectedFile, this.selectedFile.name);
      await axios.post("http://localhost:8081/api/configList/", fd, {
        headers: { "content-type": "multipart/form-data" }
      });
      let sse = new EventSource("http://localhost:8081/api/configList/sse");
      sse.addEventListener("message", output => {
        const data = JSON.parse(output.data);
        console.log(data);
        if (data.count % 2 === 0) {
          this.output = data.allOutput + "\n";
          this.log = data.allOutput + "\n";
          const r = /ipv4\(.*\):\s+(.*)\s\->\s+(.*)/gm;
          const m = r.exec(this.log);
          const rPort = /udp\(.*\): (.*):(.*) (.*):(.*) (.*)/gm;
          const mPort = rPort.exec(this.log);
          this.sIP = `${m[1]}`;
          this.dIP = `${m[2]}`;
          this.sPort = `${mPort[2]}`;
          this.dPort = `${mPort[4]}`;
          const reg = /\[\*\*\](.*)/gm;
          this.log = this.log.match(reg).toString();
        }
      });
      await axios.get("http://localhost:8081/api/configList/sse");
    },
    async block() {
      await axios.post("http://localhost:8081/filter/block", {
        ip: this.sIP,
        port: this.sPort
      });
    },
    async unblock() {
      await axios.post("http://localhost:8081/filter/unblock", {
        ip: this.sIP,
        port: this.sPort
      });
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
.container {
  max-width: 1200px;
  border-radius: 10px;
  border: 5px solid black;
  margin: 5% auto;
  padding: 1% 2% 2% 2%;
  background-color: hsla(0, 0%, 0%, 0.255);
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
input {
  display: inline;
  border: 3px solid black;
  border-radius: 10px;
  margin: 1%;
}
.btn {
  border-radius: 10px;
  border: 3px solid black;
}
.alert{
  margin: 0.2% 0% 0.2% 0%;
  border: 3px solid black;
  border-radius: 10px;
}
</style>
