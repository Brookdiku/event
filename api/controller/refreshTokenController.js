const jwt = require("jsonwebtoken");
require("dotenv").config();
// fetch the data of users
const userDB = {
  users: require("../database/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};

// login function
const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.event_jwt)
    return res.status(401).json({ error: "you are not authorized" });
  console.log(cookies.event_jwt);
  const refreshToken = cookies.event_jwt;
  const foundUser = userDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.status(403).json({ message: "forbidden" });
    const accessToken = jwt.sign(
      { username: foundUser.username },
      process.env.ACCESS_TOKEN,
      { expiresIn: "5min" }
    );
    res.status(200).json({
      message: {
        message: "updated.",
        accessToken: accessToken,
      },
    });
  });
};

module.exports = handleRefreshToken;
