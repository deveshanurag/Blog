const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Users");
});

app.listen(5000, () => {
  console.log(`Server is listening on the port no 5000`);
});
