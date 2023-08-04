import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./MyOrders.css";
import LaunchIcon from "@mui/icons-material/Launch";
import MetaData from "../layouts/MetaData";
import Loader from "../Loader/Loader";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearErrors, myOrders } from "../../features/order/myOrderSlice";
import { toast } from "react-hot-toast";

const MyOrders = () => {
  const dispatch = useDispatch();

  const { isLoading, error, orders } = useSelector((state) => state.myOrders);

  const { user } = useSelector((state) => state.user);

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
          <Link to={`/order/${params.row.id}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];

  const rows = [];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    } else {
      dispatch(myOrders());
    }
  }, [dispatch, error]);

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

  return (
    <>
      <MetaData title={`${user.name}'s Orders`} />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableRowSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />
          <Typography id="myOrdersHeading">{`${user.name}'s Order`}</Typography>
        </div>
      )}
    </>
  );
};

export default MyOrders;
