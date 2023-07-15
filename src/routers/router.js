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
  validateBody,
  validateFavorite,
} = require("../middleware/validateContact");
const { schemas } = require("../model/contact");
const { contrWrapper } = require("../helpers/contrWrapper");
const isValidId = require("../middleware/isValidId");

router.get("/", contrWrapper(getAll));
router.get("/:id", isValidId, contrWrapper(getContactById));
router.post(
  "/",
  validateBody(schemas.addSchema),
  contrWrapper(addNewContact)
);
router.delete("/:id", isValidId, contrWrapper(deleteContact));
router.put(
  "/:id",
  isValidId,
  validateBody(schemas.addSchema),
  contrWrapper(updateCurrentContact)
);
router.patch(
  "/:id/favorite",
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  contrWrapper(updateFavoriteContact)
);

module.exports = router;
