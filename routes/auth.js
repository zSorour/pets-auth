const { Router } = require("express");
const authController = require("../controllers/authController");
const validators = require("../validators/petOwnerValidator");

const authRouter = Router();

authRouter.post("/signin", authController.signIn);
authRouter.post("/signup", validators.signUpValidator(), authController.signUp);

module.exports = authRouter;
