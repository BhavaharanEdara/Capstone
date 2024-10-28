const express = require('express');
const { isLoggedIn } = require('../middlewares/authMiddleware');
const { createKYC, updateKYC, deleteKyc, getKyc } = require('../controller/kycController');
const { upload, uploadImages } = require('../middlewares/uploadImage');

const router = express.Router();


router.use(isLoggedIn);
router.route('/apply').post(upload.any(), uploadImages, createKYC).get(getKyc);
router.route('/update').put(upload.any(), uploadImages, updateKYC);
router.route('/delete').post(deleteKyc);


module.exports = router


