const verifyRoles=require("../middlewares/verifyRoles");
const ROLES= require("../config/rolesList");
const express = require("express");
const {
  getEvents,
  getEvent,
  createEvent,
  editEvent,
  deleteEvent,
} = require("../controller/eventController");
const router = express.Router();
router.get("/",verifyRoles(ROLES.admin), getEvents);
router.get("/:id",verifyRoles(ROLES.user), getEvent);
router.post("/create",verifyRoles(ROLES.user,ROLES.admin), createEvent);
router.put("/edit:id",verifyRoles(ROLES.user,ROLES.admin), editEvent);
router.delete("/delete:id",verifyRoles(ROLES.user,ROLES.admin), deleteEvent);
module.exports = router;
