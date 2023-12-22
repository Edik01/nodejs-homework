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

router.post("/login", validateBody(userSchemas.loginUserSchema), ctrl.login);
module.exports = router;
