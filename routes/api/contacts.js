const express = require("express");
const ctrl = require("../../controllers/contacts");

const { validateBody, validateId, authenticate } = require("../../middlewares");

const { contactSchemas } = require("../../models/contacts");

const router = express.Router();

router.get("/", authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, validateId, ctrl.getById);

router.post(
  "/",
  authenticate,
  validateBody(contactSchemas.addSchema),
  ctrl.addContact
);

router.delete("/:contactId", authenticate, validateId, ctrl.deleteById);

router.put(
  "/:contactId",
  authenticate,
  validateId,
  validateBody(contactSchemas.addSchema),
  ctrl.updateById
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  validateId,
  validateBody(contactSchemas.updateFavoriteSchema),
  ctrl.updateStatus
);
module.exports = router;
