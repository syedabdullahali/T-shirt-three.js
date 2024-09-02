const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/user-account',require("./route/client/user-account"));
app.use('/admin',require("./route/admin/adminAccount"));








app.get("/", async (req, res) => {
  res.send(`+
    <div style="display: flex; justify-content: center; align-items: center; height: 100%; width: 100%;">
      <div>
        <h2>Welcome to Urban Clap Clone</h2>
        <h3>Backend  🎊 🎊</h3>
      </div>
    </div>
  `);
});


module.exports = app;
