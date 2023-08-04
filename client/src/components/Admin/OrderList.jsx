import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import Sidebar from "./Sidebar";
import Button from "@mui/material/Button";
import MetaData from "../layouts/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";
import {
  allOrders,
  clearErrors,
  deleteOrder,
  deleteOrderReset,
} from "../../features/order/allOrderSlice";

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, orders, isDeleted } = useSelector(
    (state) => state.allOrders
  );
  // const { error: deleteError, isDeleted } = useSelector(
  //   (state) => state.product
  // );
  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    // if (deleteError) {
    //   toast.error(deleteError);
    //   dispatch(clearErrors());
    // }
    if (isDeleted) {
      toast.success("Order Deleted Successfully");
      dispatch(deleteOrder());
      navigate("/admin/orders");
      dispatch(deleteOrderReset());
    }
    dispatch(allOrders());
  }, [dispatch, error, isDeleted, navigate]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.row.status === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteOrderHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];

  orders &&
    orders.forEach((item) =>
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      })
    );

  return (
    <>
      <MetaData title="ALL ORDERS -ADMIN" />
      <div className="dashboard">
        <Sidebar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </>
  );
};

export default OrderList;
