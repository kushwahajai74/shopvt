import React, { useEffect, useState } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layouts/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, clearErrors } from "../../features/products/productSlice";
import { toast } from "react-hot-toast";
import Loader from "../Loader/Loader";
// const product = {
//   name: "Black Tshirt",
//   images: [
//     {
//       url: "https://assets.ajio.com/medias/sys_master/root/20230405/S7LC/642d74b3711cf97ba70c370c/-473Wx593H-466021226-black-MODEL.jpg",
//     },
//   ],
//   price: "₹599",
//   _id: "abhishek",
// };

const Home = () => {
  const dispatch = useDispatch();
  const { products, isLoading, error, productsCount } = useSelector(
    (store) => store.products
  );
  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch]);
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="shopEkart" />
          <div className="banner">
            <p>Welcome to shopEkart</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
