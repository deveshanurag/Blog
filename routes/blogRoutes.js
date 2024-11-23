const express = require("express");
const router = express.Router();
const {
  createBlog,
  readBlog,
  getBlog,
  editBlog,
} = require("../controllers/blogControllers");
const protect = require("../middlewares/authMiddleware");

router.route("/").post(protect, createBlog).get(readBlog);
router.route("/:id").get(getBlog);
router.route("/:id").put(protect, editBlog);
module.exports = router;
