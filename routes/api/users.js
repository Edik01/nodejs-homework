const { authenticate, upload, validateBody } = require("../../middlewares");
const express = require("express");
const ctrl = require("../../controllers/users");

const { userSchemas } = require("../../models/users");

const router = express.Router();

router.post(
  "/register",
  validateBody(userSchemas.registerUserSchema),
  ctrl.register
);

router.get("/current", authenticate, ctrl.currentUser);

router.post("/logout", authenticate, ctrl.logout);

router.post("/login", validateBody(userSchemas.loginUserSchema), ctrl.login);

router.patch(
  "/",
  authenticate,
  validateBody(userSchemas.updateSubscription),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
