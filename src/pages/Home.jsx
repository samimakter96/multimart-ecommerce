import React, { useEffect, useState } from "react";
import products from "../assets/data/products";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../assets/images/hero-img.png";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/Services";
import ProductList from "../components/UI/ProductList";

const Home = () => {
  const [data, setData] = useState(products);
  const year = new Date().getFullYear();

  useEffect(() => {
    const filteredProducts = products.filter(
      (item) => item.category === "chair"
    );
    setData(filteredProducts);
  }, []);

  return (
    <>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg="6" md="6">
              <div className="hero__content">
                <p className="hero__subtitle">Trending product in {year}</p>
                <h2>Make Your Interior More Minimalistic & Modern</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Sapiente, deleniti molestias. Nostrum numquam dolorem ducimus,
                  labore impedit placeat minima est.
                </p>
                <motion.button whileTap={{ scale: 1.2 }} className="buy__btn">
                  <Link to="/shop">SHOP NOW</Link>
                </motion.button>
              </div>
            </Col>

            <Col lg="6" md="6">
              <div className="hero__img">
                <img src={heroImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            <ProductList data={data} />
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
