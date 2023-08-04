import React, { useState } from "react";
import "./Search.css";
import { useNavigate } from "react-router-dom";
import MetaData from "../layouts/MetaData";
const Search = ({ history }) => {
  let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <>
      <MetaData title="SEACRCH -- ShopEkart" />
      <form action="" className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search a Product..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
    </>
  );
};

export default Search;
