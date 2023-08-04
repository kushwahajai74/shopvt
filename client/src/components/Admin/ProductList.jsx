import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import "./ProductList.css";
import {
  clearErrors,
  getAdminProducts,
} from "../../features/products/productSlice";
import Sidebar from "./Sidebar";
import Button from "@mui/material/Button";
import MetaData from "../layouts/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";

import {
  deleteProduct,
  deleteProductReset,
} from "../../features/products/newProductSlice";

const ProductList = () => {
  const dispatch = useDispatch();

  const { isLoading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product
  );
  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      toast.success("Product Deleted Successfully");
      dispatch(deleteProductReset());
    }
    dispatch(getAdminProducts());
  }, [dispatch, error, isDeleted, deleteError]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
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
            <Link to={`/admin/product/${params.row.id}`}>
              <EditIcon />
            </Link>
            <Button onClick={() => deleteProductHandler(params.row.id)}>
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];
  const rows = [];

  products &&
    products.forEach((item) =>
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      })
    );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="ALL Products -ADMIN" />
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
      )}
    </>
  );
};

export default ProductList;
