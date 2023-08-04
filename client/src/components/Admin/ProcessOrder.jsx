import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { Link, useNavigate, useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Sidebar from "./Sidebar";
import { toast } from "react-hot-toast";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import {
  clearErrors,
  getOrderDetails,
} from "../../features/order/orderDetailsSlice";
import Loader from "../Loader/Loader";
import Button from "@mui/material/Button";

import {
  updateOrder,
  updateOrderReset,
} from "../../features/order/allOrderSlice";

const ProcessOrder = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { order, error, isLoading } = useSelector(
    (state) => state.orderDetails
  );
  const { error: updateError, isUpdated } = useSelector(
    (state) => state.allOrders
  );

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder({ id, myForm }));
  };
  useEffect(() => {
    if (isUpdated) {
      toast.success("Order Updated Successfully");
      dispatch(updateOrderReset());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    } else {
      dispatch(getOrderDetails(id));
    }
  }, [dispatch, error, id, updateError, isUpdated]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Process Order" />
          <div className="dashboard">
            <Sidebar />
            <div className="confirmOrderPage">
              <div>
                <div className="confirmshippingArea">
                  <Typography>Shipping Info</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p>Name:</p>
                      <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                      <p>Phone:</p>
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </div>
                    <div>
                      <p>Address:</p>
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="orderDetailsCartItems">
                  <Typography>Payment</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </div>

                    <div>
                      <p>Amount:</p>
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                  </div>

                  <Typography>Order Status</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>

                  <Typography>Order Items:</Typography>
                  <div className="orderDetailsCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X ₹{item.price} ={" "}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>Process Order</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">Choose Category</option>
                      {order.orderStatus === "Processing" && (
                        <option value="Shipped">Shipped</option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <option value="Delivered">Delivered</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      isLoading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProcessOrder;
