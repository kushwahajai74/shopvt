import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/productSlice";
import productDetailsReducer from "./features/products/productDetailsSlice";
import UserReducer from "./features/user/userSlice";
import userUpdateReducer from "./features/user/userUpdateSlice";
import forgotPassworReducer from "./features/user/forgotPasswordSlice";
import cartReducer from "./features/cart/cartSlice";
import orderReducer from "./features/order/orderSlice";
import myOrdersReducer from "./features/order/myOrderSlice";
import orderDetailsReducer from "./features/order/orderDetailsSlice";
import newReviewReducer from "./features/products/newReviewSlice";
import newProductReducer from "./features/products/newProductSlice";
import allOrderReducer from "./features/order/allOrderSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: UserReducer,
    profile: userUpdateReducer,
    forgotPassword: forgotPassworReducer,
    cart: cartReducer,
    newOrder: orderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    product: newProductReducer,
    allOrders: allOrderReducer,
  },
});
// export the store
export default store;
