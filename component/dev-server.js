const express = require("express");
const cors = require('cors')
const app = express();
const port = 3000;

app.use("/", express.static(__dirname));

app.use(cors())

app.use(express.static('./dist'))


app.get("/", function (req, res) {
    res.sendFile('./dist/index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  console.log("http://localhost:3000/dist/browser/remote-entry.js")
});
