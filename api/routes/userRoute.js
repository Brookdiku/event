const express = require("express");
const router = express.Router();
const { getUsers, getUser } = require("../controller/userController");
router.get("/", getUsers);
router.get("/:id", getUser);
router.put("/edit:id");
router.delete("/delete:id");

module.exports = router;
