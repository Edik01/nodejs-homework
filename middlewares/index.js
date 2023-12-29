const authenticate = require("./authenticate");
const validateBody = require("./validateBody");
const validateId = require("./validateId");

module.exports = {
  validateId,
  validateBody,
  authenticate,
};
