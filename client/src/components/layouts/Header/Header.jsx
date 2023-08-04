import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo2.png";
import { BsSearch } from "react-icons/bs";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "28vmax",
  navColor1: "rgba(255, 255, 255, 0.95)",
  logoHoverSize: "10px",
  logoHoverColor: "eb4034",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.8vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "center",
  nav2justifyContent: "space-between",
  nav3justifyContent: "space-between",
  nav4justifyContent: "space-evenly",

  nav1Transition: 0.3,
  link1AnimationTime: 0.1,
  searchIconAnimationTime: 0.7,
  link1ColorHover: "#eb4034",
  link1Margin: "2vmax",
  profileIconUrl: "/login",
  searchIconUrl: "/search",
  cartIconUrl: "/cart",
  searchIcon: true,
  SearchIconElement: BsSearch,
  cartIcon: true,
  CartIconElement: FaShoppingCart,
  profileIcon: true,
  ProfileIconElement: FaUserCircle,
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
};
const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
