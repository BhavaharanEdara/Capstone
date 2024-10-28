const express = require('express');
const { createUser, login, verifyUser, verifyPhone, sendOtpMail, sendMobileOtp, updateUser, logout, deleteUser } = require('../controller/userController');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/register').post(createUser);
router.route('/login').post(login);

router.use(isLoggedIn);
router.route("/updateUser").put(updateUser);

router.route("/send-otp-mail").post(sendOtpMail);
router.route('/emailVerify').put(verifyUser)

router.route("/send-otp-sms").post(sendMobileOtp);
router.route('/phoneVerify').put(verifyPhone);

router.route("/logout").post(logout)
router.route("/delete").delete(deleteUser)

module.exports = router


