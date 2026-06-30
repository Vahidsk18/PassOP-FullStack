const express = require("express");
const router = express.Router();

const validate = require("../middlewares/validateMiddleware");
const { registerSchema, loginSchema } = require("../Validation_Joi/userValidation");
const { register, login } = require("../controllers/userController");

const { LoginLimiter, RegisterLimiter } = require('../middlewares/rateLimiter')

router.post("/register", RegisterLimiter, validate(registerSchema), register);
router.post("/login", LoginLimiter, validate(loginSchema), login);

// router.post("/logout", logout);


module.exports = router;