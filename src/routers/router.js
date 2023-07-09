const express = require("express");
const router = express.Router();
const {
  getAll,
  getContactById,
  addNewContact,
  deleteContact,
  updateCurrentContact,
} = require("../controllers/contact.controller");
const { validateContact } = require("../middleware/validateContact");
// const { contactsSchema } = require("../schema/contactsSchema");
const { schemas } = require("../model/contact");
const { contrWrapper } = require("../helpers/contrWrapper");
const { addSchema } = require("../model/contact");

router.get("/", contrWrapper(getAll));
router.get("/:id", contrWrapper(getContactById));
router.post(
  "/",
  validateContact(schemas.addSchema),
  contrWrapper(addNewContact)
);
// router.delete("/:id", contrWrapper(deleteContact));
router.put(
  "/:id",
  validateContact(schemas.addSchema),
  contrWrapper(updateCurrentContact)
);

module.exports = router;
