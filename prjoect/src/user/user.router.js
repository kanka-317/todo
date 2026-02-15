// const express = require("express");
// const userController = require("./user.controller.js");

// const userRouter = express.Router();

// userRouter.post("/create", userController.handleCreateUser);

// module.exports = userRouter;
const express = require("express");
const { StatusCodes } = require("http-status-codes");
const { validationResult } = require("express-validator");
const userController = require("./user.controller.js");
const createUserValidator = require("./validators/createUser.validator.js");

const userRouter = express.Router();
/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Shape of task response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Not Authorized error
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "You are not Authorized to perform this request"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               error:
 *                 message: "Your token is either expired or invalid."
 */

userRouter.post("/create", createUserValidator, (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return userController.handleCreateUser(req, res);
  } else {
    res.status(StatusCodes.BAD_REQUEST).json(result.array());
  }
});

module.exports = userRouter;