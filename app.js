require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Users");
});

app.use("/api/users", userRoutes);

app.listen(5000, () => {
  console.log(`Server is listening on the port no 5000`);
});
