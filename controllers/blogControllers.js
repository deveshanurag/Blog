const Blog = require("../models/blogModel");

const createBlog = async (req, res) => {
  const { title, content, tags, category } = req.body;

  // Validate request body
  if (!title || !content || !tags || !category) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Create the blog
    const newBlog = await Blog.create({
      title,
      content,
      tags: tags ? tags.split(",") : [],
      category,
      author: req.user._id,
    });

    // Respond with the newly created blog
    res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    // Log error and send response
    console.error("Error creating blog:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const readBlog = async (req, res) => {
  let { page, limit, category, tag } = req.query;
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;
  const query = {};
  if (category) {
    query.category = category;
  }
  if (tag) {
    query.tags = { $in: [tag] };
  }

  try {
    const blogs = await Blog.find(query)
      .populate("author", "name email")
      .skip((page - 1) * limit)
      .limit(limit);
    const totalBlogs = await Blog.countDocuments(query);
    res.status(200).json({
      success: true,
      currentPage: page,
      limit: limit,
      totalBlogs,
      totalPages: Math.ceil(totalBlogs / limit),
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error,
    });
  }
};
const getBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById({ _id: id }).populate(
      "author",
      "name email"
    );
    res.status(200).json({
      success: true,
      data: blog,
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

const editBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById({ _id: id });
    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    if (
      blog.author.toString() === req.user._id.toString() ||
      req.user.role.toString() === "admin"
    ) {
      const update = req.body;
      const updateBlog = await Blog.findByIdAndUpdate({ _id: id }, update, {
        new: true,
      });
      if (updateBlog) {
        res.status(200).json({
          success: true,
          blog: updateBlog,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "Not Authorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findById({ _id: id });
    if (!blog) {
      res.status(404).json({
        success: false,
        message: "Not found",
      });
    }
    if (
      blog.author.toString() === req.user._id.toString() ||
      req.user.role.toString() === "admin"
    ) {
      const deleteBlog = await Blog.findByIdAndDelete({ _id: id });
      if (deleteBlog) {
        res.status(200).json({
          success: true,
        });
      } else {
        res.status(500).json({
          success: false,
          message: "Server Error",
        });
      }
    } else {
      res.status(403).json({
        success: false,
        message: "Not Authorized",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const searchBlog = async (req, res) => {
  const { query, tags, category } = req.query;
  console.log(query, tags, category);

  let searchCriteria = {};

  if (query) {
    searchCriteria.$or = [
      { title: { $regex: query, $options: "i" } },
      { content: { $regex: query, $options: "i" } },
    ];
  }

  if (tags) {
    searchCriteria.tags = { $in: tags.split(",") }; // Match any of the tags
  }

  if (category) {
    searchCriteria.category = category; // Match the category ID
  }

  try {
    const blogs = await Blog.find(searchCriteria).populate(
      "author",
      "name email"
    );
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Error searching blogs." });
  }
};

module.exports = {
  createBlog,
  readBlog,
  getBlog,
  editBlog,
  deleteBlog,
  searchBlog,
};
