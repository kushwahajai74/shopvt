import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../Home/ProductCard";
import { toast } from "react-hot-toast";
import { clearErrors, getProducts } from "../../features/products/productSlice";
import Loader from "../Loader/Loader";
import "./Products.css";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import Rating from "@mui/material/Rating";
import Pagination from "react-js-pagination";
import MetaData from "../layouts/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Tshirts",
  "Headphones",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 150000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const {
    products,
    isLoading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((store) => store.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  const handleRatings = (event, newRating) => {
    setRatings(newRating);
  };

  useEffect(() => {
    dispatch(getProducts({ keyword, currentPage, price, category, ratings }));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);
  const count = filteredProductsCount;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ShopEkart" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Prices</Typography>
            <Slider
              getAriaLabel={() => "Temperature range"}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              min={0}
              max={150000}
            />

            <Typography sx={{ paddingTop: "1vmax" }}>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <Typography sx={{ paddingTop: "1vmax" }}>Ratings Above</Typography>
            <Rating
              name="simple-controlled"
              value={ratings}
              onChange={(event, newValue) => {
                setRatings(newValue);
              }}
              size="small"
            />
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
