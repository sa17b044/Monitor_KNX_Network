const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const PORT = 8081;
const app = express();
// routes
const userListRoutes = require("./routes/api/userList.js");
const serverListRoutes = require("./routes/api/serverList.js");
const policyListRoutes = require("./routes/api/policyList");
const configListRoutes = require("./routes/api/configList");
const xmlListRoutes = require("./routes/api/xmlList");
const filterRoutes = require("./routes/filter");
const activeRoutes = require("./routes/active");
const authRoutes = require("./routes/auth");
// Database connection
const dbUrl = "mongodb://127.0.0.1:27017/bsa";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    app.listen(PORT);
    console.log("http://localhost:8081/");
    console.log("Server is running ...");
  })
  .catch((err) => {
    console.log("Error Database connection..." + "\n" + err);
  });
// middelware
app.use(express.static("public"));
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/userList', userListRoutes);
app.use('/api/serverList', serverListRoutes);
app.use('/api/policyList', policyListRoutes);
app.use('/api/configList', configListRoutes);
app.use('/api/xmlList', xmlListRoutes);
app.use('/filter',filterRoutes)
app.use('/active',activeRoutes)
app.use('/auth', authRoutes)

app.get("/", (req, res) => {
  res.send('<a href="http://localhost:8080">http://localhost:8080</a>');
});