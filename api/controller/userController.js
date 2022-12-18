const userDB = {
  users: require("../database/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const getUsers = async (req, res) => {
  res.status(200).json({ message: userDB.users });
};
const getUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const foundUser=userDB.users.find(user=>user.id===id);
  if(!foundUser)return res.status(404).json({message:"user not found."})
  res.status(200).json({ message: foundUser });
};

module.exports = {
  getUsers,getUser
};
