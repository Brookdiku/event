const express = require("express");
const {
  getEvents,
  getEvent,
  createEvent,
  editEvent,
  deleteEvent,
} = require("../controller/eventController");
const router = express.Router();
router.get("/", getEvents);
router.get("/:id", getEvent);
router.post("/create", createEvent);
router.put("/edit:id", editEvent);
router.delete("/delete:id", deleteEvent);
module.exports = router;
