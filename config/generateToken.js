const jwt = require("jsonwebtoken");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRETE_KEY, { expiresIn: "1hr" });
};

module.exports = generateToken;
