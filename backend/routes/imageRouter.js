const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { upload, uploadImages } = require('../middlewares/uploadImage');
const router = express.Router();


router.use(isLoggedIn);
router.route("/upload").put(upload.any(), uploadImages);

module.exports = router


