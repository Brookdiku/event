const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.sendStatus();
  console.log(authHeader);
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
    if (err) return res.sendStatus(403);
    req.user = decode.username;
    next();
  });
};
module.exports = verifyJWT;
