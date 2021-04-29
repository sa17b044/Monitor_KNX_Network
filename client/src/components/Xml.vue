<template>
  <div class="container">
    <h1>XML</h1>
    <div class="row">
      <div class="col">
        <label>Upload a XML file</label>
        <br />
        <input
          type="file"
          @change="onFileSelected"
          style="display: none"
          ref="fileInput"
        />
        <button class="btn btn-light" @click="$refs.fileInput.click()">
          XML
        </button>
        <button @click="onUploadFile()" class="btn btn-warning">
          Send to Server
        </button>
        <div v-if="alert">
          <div class="alert alert-success">Done</div>
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
      selectedFile: null,
      selectedFilePcap: null,
      alert: false
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
    },
    async onUploadFile() {
      const fd = new FormData();
      fd.append("file", this.selectedFile, this.selectedFile.name);
      await axios.post("http://localhost:8081/api/xmlList/", fd, {
        headers: { "content-type": "multipart/form-data" }
      });
      this.alert = true;
      setTimeout(() => (this.alert = false), 1000);
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
.col {
  flex-wrap: wrap;
  width: 355px;
  padding: 1% 3% 2% 3%;
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
.alert{
  margin: 0.2% 0% 0.2% 0%;
  border: 3px solid black;
  border-radius: 10px;
}
</style>
