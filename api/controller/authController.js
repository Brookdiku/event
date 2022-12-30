const path = require("path");
const fsPromise = require("fs/promises");
const bcrypt = require("bcrypt");
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
const handleLogin = async (req, res) => {
  try {
    const { email, password } = req?.body;
    if (!email || !password)
      res.status(400).json({ note: "empty form are not acceptable!" });
    const foundUser = userDB.users.find((x) => x.email === email);
    if (!foundUser) res.status(400).json({ note: "Oops! user does not exist" });
    //check if the password correct
    else {
      const verifyPassword = await bcrypt.compare(password, foundUser.password);
      if (verifyPassword) {
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
          {
            userInfo: {
              username: foundUser.username,
              roles: roles,
            },
          },
          process.env.ACCESS_TOKEN,
          { expiresIn: "5min" }
        );
        // const refreshToken = jwt.sign(
        //   {
        //     userInfo: {
        //       username: foundUser.username,
        //       roles: roles
        //     },
        //   },
        //   process.env.REFRESH_TOKEN,
        //   { expiresIn: "1d" }
        // );
        // const otherUsers = userDB.users.filter(
        //   (person) => person.username !== foundUser.username
        // );
        // const currentUser = { ...foundUser, refreshToken };
        // userDB.setUsers([...otherUsers, currentUser]);
        // await fsPromise.writeFile(
        //   path.join(__dirname, "../", "database", "users.json"),
        //   JSON.stringify(userDB.users)
        // );
        // res.cookie("event_jwt", refreshToken, {
        //   httpOnly: true,
        //   maxAge: 24 * 60 * 60 * 1000,
        //   secure:true,
        // });
        // res.status(200).json({
        //   roles:foundUser.roles,
        //   email:foundUser.email,
        //   username:foundUser.username,
        //   note: "welcome",
        //   accessToken: accessToken,
        // });
        res.status(200).json({
          message: "loggedIn",
          id: foundUser.id,
          roles: foundUser.roles,
          accessToken: accessToken,
          email: foundUser.email,
          username: foundUser.username,
        });
      } else {
        res.status(400).json({ note: "email or password incorrect!" });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleLogin };
