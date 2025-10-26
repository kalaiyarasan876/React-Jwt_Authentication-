const express = require('express');
const { registerUser, loginUser, logoutUser, getUser } = require('../controllers/auth.controller');
const { registerValidation, loginValidation } = require('../validations/auth.validation');
const { validateRequest } = require('../middleware/validate');
const rateLimit = require('express-rate-limit');
const { verifyToken } = require("../middleware/authMiddleware");

const profileController = require("../controllers/ProfileController");
// const imageController = require("../controllers/imageController");

const { upload } = require("../middleware/uploadMiddleware");

const router = express.Router();

// const loginLimiter = rateLimit({
//     windowMs: 60 * 1000,
//     max: 3,
//     message: {
//         success: false,
//         message: "Too many login attempts. Try again after 1 minutes."
//     },
// })

router.post("/register", validateRequest(registerValidation), registerUser);
router.post("/login", validateRequest(loginValidation), loginUser);
router.post("/logout", logoutUser);
router.get("/me", verifyToken, getUser);
router.get("/profiles", profileController.getProfile);
router.post("/uploadImage", upload.single('image'), profileController.uploadImage);
// router.get("/:id", profileController.getImage);


module.exports = router;
