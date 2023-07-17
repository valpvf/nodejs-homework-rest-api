const express = require("express");
const router = express.Router();

const { schemas } = require("../model/contact");
const {
  validateBody,
  validateFavorite,
} = require("../middleware/validateContact");
const isValidId = require("../middleware/isValidId");
const authMiddleware = require("../middleware/auth");
const { contrWrapper } = require("../helpers/contrWrapper");
const {
  getAll,
  getContactById,
  addNewContact,
  deleteContact,
  updateCurrentContact,
  updateFavoriteContact,
} = require("../controllers/contact.controller");

router.get("/", authMiddleware, contrWrapper(getAll));
router.get(
  "/:id",
  authMiddleware,
  isValidId,
  contrWrapper(getContactById)
);
router.post(
  "/",
  authMiddleware,
  validateBody(schemas.addSchema),
  contrWrapper(addNewContact)
);
router.delete(
  "/:id",
  authMiddleware,
  isValidId,
  contrWrapper(deleteContact)
);
router.put(
  "/:id",
  authMiddleware,
  isValidId,
  validateBody(schemas.addSchema),
  contrWrapper(updateCurrentContact)
);
router.patch(
  "/:id/favorite",
  authMiddleware,
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  contrWrapper(updateFavoriteContact)
);

module.exports = router;
