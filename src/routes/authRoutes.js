// Route recebe a url e direciona para o controller

const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

const validateMiddleware = require("../middlewares/validateMiddleware");
const authSchema = require("../schemas/authSchema");

const loginLimiter = require("../middlewares/rateLimitMiddleware").loginLimiter;

router.post(
  "/login",
  loginLimiter,
  validateMiddleware(authSchema.authSchema, "body"),
  authController.login,
);

router.post("/refresh", authController.refreshToken);

router.post("/logout", authController.logout);

module.exports = router;
