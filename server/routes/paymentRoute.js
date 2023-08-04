const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth");
const {
  processPayment,
  sendStripeApiKey,
} = require("../controlleres/paymentController");

router.route("/payment/process").post(isAuth, processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;
