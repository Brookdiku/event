const cookieParser = require("cookie-parser");
const express = require("express");
const verifyJWT = require("./middlewares/verifyJWT");
const Cors = require('cors')
const app = express();
const whitelist = ["http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(Cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// index route
app.get('/',(req,res)=>{
  res.json({message:"working to improve the service"})
})
// register route
app.use("/register", require("./routes/registerRoute"));
// auth route
app.use("/auth", require("./routes/authRoute"));
//refresh token
app.use("/refresh",require('./routes/refreshRoute'));
//logout 
app.use("/logout",require('./routes/logoutRoute'));
// accessToken verification required
app.use(verifyJWT);
// users route
app.use("/users", require("./routes/userRoute"));
// events route
app.use("/events", require("./routes/eventRoute"));
// app.get("*", (req, res) => {
//   res.json({ message: "route not found!" });
// });
// server initiation 
app.listen("3000", () => {
  console.log("Hello. server started on port 3000!");
});
