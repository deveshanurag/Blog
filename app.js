require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello Users");
});

app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/categories", categoryRoutes);

app.listen(5000, () => {
  console.log(`Server is listening on the port no 5000`);
});
