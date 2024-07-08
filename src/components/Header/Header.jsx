import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegHeart } from "react-icons/fa";
import { GrCart } from "react-icons/gr";
import { IoMdMenu } from "react-icons/io";
import logo from "../../assets/images/eco-logo.png";
import user_icon from "../../assets/images/user-icon.png";
import "./Header.css";

import { Container, Row } from "reactstrap";

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

  const stickHeaderFunc = () => {
    if (window.scrollY > 80) {
      headerRef.current.classList.add("stick__header");
    } else {
      headerRef.current.classList.remove("stick__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", stickHeaderFunc);

    return () => {
      window.removeEventListener("scroll", stickHeaderFunc);
    };
  }, []);

  const menuToggle = () => menuRef.current.classList.toggle('active__menu')

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>Multimart</h1>
              </div>
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
              <span className="cart__icon">
                <GrCart size={"22px"} />
                <span className="badge">1</span>
              </span>

              <span>
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={user_icon}
                  alt="user_icon"
                />
              </span>
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
