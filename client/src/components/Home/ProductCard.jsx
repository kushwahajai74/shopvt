/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const ProductCard = ({ product }) => {
  const options = {
    size: "small",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    // size: window.innerWidth < 600 ? 25 : 20,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name.substring(0, 50)}</p>
      <div>
        <Rating {...options} />
        <span>({product.numberOfReviews} Reviews)</span>
      </div>
      <span>₹{`${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
