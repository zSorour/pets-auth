const { Router } = require("express");
const authController = require("../controllers/authController");

const authRouter = Router();

authRouter.post("/signin", authController.signIn);
authRouter.post("/signup", authController.signUp);

module.exports = authRouter;
