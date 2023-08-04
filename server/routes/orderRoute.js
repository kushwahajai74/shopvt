const express = require("express");
const {
  newOrder,
  getsingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
} = require("../controlleres/orderController");

const { isAuth, authorizedRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuth, newOrder);
router.route("/order/:id").get(isAuth, getsingleOrder);
router.route("/orders/me").get(isAuth, myOrders);

router.route("/admin/orders").get(isAuth, authorizedRoles("admin"), allOrders);
router
  .route("/admin/order/:id")
  .put(isAuth, authorizedRoles("admin"), updateOrder)
  .delete(isAuth, authorizedRoles("admin"), deleteOrder);

module.exports = router;
