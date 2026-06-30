const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const validate = require('../middlewares/validateMiddleware')
const { PasswordSchema } = require('../Validation_Joi/passwordValidation')
const { createPassword, getPasswords, updatePassword, deletePassword } = require("../controllers/passwordController");

router.use(authMiddleware);


router.post("/", validate(PasswordSchema), createPassword);

router.get("/", getPasswords);

router.put("/:id", updatePassword);

router.delete("/:id", deletePassword);




module.exports = router;