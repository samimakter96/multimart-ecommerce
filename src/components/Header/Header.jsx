import React, { useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { IoMdMenu } from "react-icons/io";
import logo from "../../assets/images/eco-logo.png";
import user_icon from "../../assets/images/user-icon.png";
import "./Header.css";

import { Container, Row } from "reactstrap";
import { useSelector } from "react-redux";
import useAuth from "../../customHooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { toast } from "react-toastify";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "shop",
    display: "Shop",
  },
  {
    path: "cart",
    display: "Cart",
  },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const profileActionRef = useRef(null);

  const stickHeaderFunc = () => {
    if (window.scrollY > 80) {
      headerRef.current.classList.add("stick__header");
    } else {
      headerRef.current.classList.remove("stick__header");
    }
  };

  const logout = () => {
    signOut(auth).then(() => {
      toast.success("Logged Out Successfully");
      navigate("/login");
    }).catch((error) => {
      toast.error(error.message);
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", stickHeaderFunc);

    return () => {
      window.removeEventListener("scroll", stickHeaderFunc);
    };
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const toggleProfileActions = () => {
    profileActionRef.current.classList.toggle("show__profileActions");
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo" onClick={() => navigate("/")}>
              <img src={logo} alt="logo" />
              <h1>Multimart</h1>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {nav__links.map((item, index) => (
                  <li key={index} className="nav__item">
                    <NavLink
                      to={item.path}
                      className={(navClass) =>
                        navClass.isActive ? "nav__active" : ""
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="nav__icons">
              <span className="fav__icon">
                <FaRegHeart size={"22px"} />
                <span className="badge">1</span>
              </span>
              <span className="cart__icon" onClick={() => navigate("/cart")}>
                <GrCart size={"22px"} />
                <span className="badge">{totalQuantity}</span>
              </span>

              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={currentUser ? currentUser.photoURL : user_icon}
                  alt="user_icon"
                  onClick={toggleProfileActions}
                />
                <div
                  className="profile__actions"
                  ref={profileActionRef}
                >
                  {currentUser ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/signup">Signup</Link>
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <IoMdMenu size={"25px"} />
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
