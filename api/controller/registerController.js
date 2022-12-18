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
//register function
const handleRegister = async (req, res) => {
  const username = req?.body?.username;
  const password = req?.body?.password;
  const confirmPassword = req?.body?.confirmPassword;
  const email = req?.body?.email;
  //verify data is not empty
  if (
    !username ||
    username === "" ||
    !password ||
    password === "" ||
    !email ||
    email === "" ||
    !confirmPassword ||
    confirmPassword === ""
  )
    res.status(400).json({ message: "empty form are not acceptable!" });
  // verify data is correct format regex

  // verify data is not repeated
  const duplicate = userDB.users.find((x) => x.email === email);
  if (duplicate)
    return res
      .status(409)
      .json({ message: "user already exist with this email" });

  //encrypt the password
  try {
    const newUser = {
      username: username,
      //encrypt the password with bcrypt here
      password: await bcrypt.hash(password,10),
      email: email,
    };
    userDB.setUsers([...userDB.users, newUser]);
    await fsPromise.writeFile(
      path.join(__dirname, "../", "database", "users.json"),
      JSON.stringify(userDB.users)
    );
    // create jsonwebtoken and send with response as http only cookie
    res.status(200).json({ message: "successfully registered" });
  } catch (error) {
    res.status(error).json({ message: error.message });
  }
};
module.exports = handleRegister;
