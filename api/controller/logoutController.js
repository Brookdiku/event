const usersDB = {
  users: require("../database/users.json"),
  setusers: function (data) {
    this.users = data;
  },
};
const handleLogout = async (req, res) => {
  if (!req.cookies?.event_jwt) return res.sendStatus(200);
  const refreshToken = req.cookies.event_jwt;
  const foundUser =  usersDB.users.find(person=>person.refreshToken===refreshToken);
  if (!foundUser) {
    res.clearCookie("event_jwt", { httpOnly: true }).sendStatus(204); // clearcookie,
  }
  const updatedFoundUser = {...foundUser,refreshToken:""};
  const otherUsers = usersDB.users.filter(x=>x.refreshToken!==refreshToken);
  usersDB.setusers([...otherUsers,updatedFoundUser])
  res.clearCookie("event_jwt", { httpOnly: true }); // clearcookie,
  res.sendStatus(204);
};
module.exports = handleLogout;
