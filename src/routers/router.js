const express = require("express");
const router = express.Router();
const {
  getAll,
  getContactById,
  addNewContact,
  deleteContact,
  updateCurrentContact,
  updateFavoriteContact,
} = require("../controllers/contact.controller");
const {
  validateContact,
  validateFavorite,
} = require("../middleware/validateContact");
const { schemas } = require("../model/contact");
const { contrWrapper } = require("../helpers/contrWrapper");

router.get("/", contrWrapper(getAll));
router.get("/:id", contrWrapper(getContactById));
router.post(
  "/",
  validateContact(schemas.addSchema),
  contrWrapper(addNewContact)
);
router.delete("/:id", contrWrapper(deleteContact));
router.put(
  "/:id",
  validateContact(schemas.addSchema),
  contrWrapper(updateCurrentContact)
);
router.patch(
  "/:id/favorite",
  validateFavorite(schemas.updateFavoriteSchema),
  contrWrapper(updateFavoriteContact)
);

module.exports = router;
