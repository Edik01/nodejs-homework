const { authenticate } = require("../../middlewares");
const express = require("express");
const ctrl = require("../../controllers/users");

const { validateBody } = require("../../middlewares");

const { userSchemas } = require("../../models/users");

const router = express.Router();

router.post(
  "/register",
  validateBody(userSchemas.registerUserSchema),
  ctrl.register
);

router.get("/current", authenticate, ctrl.currentUser);

router.post("/login", validateBody(userSchemas.loginUserSchema), ctrl.login);

router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.updateSubscription),
  ctrl.updateSubscription
);

module.exports = router;
