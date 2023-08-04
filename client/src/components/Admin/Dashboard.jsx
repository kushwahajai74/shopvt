import React, { useEffect } from "react";
import Sidebar from "./Sidebar.jsx";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import "./DashBoard.css";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../features/products/productSlice.jsx";
import { allOrders } from "../../features/order/allOrderSlice.jsx";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) outOfStock++;
    });

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
  }, [dispatch]);
  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 4000],
      },
    ],
  };
  const lineOptions = {
    responsive: true,
  };
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboardContainer">
        <Typography variant="h1">Dashboard</Typography>
        <div className="dashboardSummary">
          <div>
            <p>
              Toatal Amount <br /> ₹2000
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>product</p>
              <p>{products?.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{orders && orders.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>2</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
          <Line options={lineOptions} data={lineState} />
        </div>
        <div className="doughnutChart">
          <Doughnut options={lineOptions} data={doughnutState} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
