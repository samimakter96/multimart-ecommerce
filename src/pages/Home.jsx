import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import "../styles/Home.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Services from "../services/Services";
import ProductList from "../components/UI/ProductList";
import counterImg from "../assets/images/counter-timer-img.png";
import Clock from "../components/UI/Clock";
import useGetData from "../customHooks/useGetData";
import HomeCarousel from "../components/UI/HomeCarousel";
import { PropagateLoader } from "react-spinners";

const Home = () => {
  const { data: products, loading } = useGetData("products");

  const [trendingProducts, setTrendingProducts] = useState([]);
  const [bestSalesProducts, setBestSalesProducts] = useState([]);
  const [mobileProducts, setMobileProducts] = useState([]);
  const [wirelessProducts, setWirelessProducts] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);

  useEffect(() => {
    const filteredTrendingProducts = products.filter(
      (item) => item.category === "chair"
    );

    const filteredBestSalesProducts = products.filter(
      (item) => item.category === "sofa"
    );

    const filteredMobileProducts = products.filter(
      (item) => item.category === "mobile"
    );

    const filteredWirelessProducts = products.filter(
      (item) => item.category === "wireless"
    );

    const filteredPopularProducts = products.filter(
      (item) => item.category === "watch"
    );

    setTrendingProducts(filteredTrendingProducts);
    setBestSalesProducts(filteredBestSalesProducts);
    setMobileProducts(filteredMobileProducts);
    setWirelessProducts(filteredWirelessProducts);
    setPopularProducts(filteredPopularProducts);
  }, [products]);

  return (
    <>
      <section>
        <HomeCarousel />
      </section>

      <Services />

      <section className="trending__products">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Trending Products</h2>
            </Col>
            {loading ? (
              <Col
                lg="12"
                className=" mt-4 d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <PropagateLoader color="#36d7b7" />
              </Col>
            ) : (
              <ProductList data={trendingProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="best__sales">
        <Container>
          <Row>
            <Col lg="12" className="text-center">
              <h2 className="section__title">Best Sales</h2>
            </Col>
            {loading ? (
              <Col
                lg="12"
                className=" mt-4 d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <PropagateLoader color="#36d7b7" />
              </Col>
            ) : (
              <ProductList data={bestSalesProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="timer__count">
        <Container>
          <Row>
            <Col lg="6" md="6" className="count__down-col">
              <div className="clock__top-content">
                <h4 className="text-white fs-6 mb-2">Limited Offers</h4>
                <h3 className="text-white fs-5 mb-3">Quality Armchair</h3>
              </div>
              <Clock />
              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn"
              >
                <Link to="/shop">Visit Store</Link>
              </motion.button>
            </Col>
            <Col lg="6" md="6" className="text-end counter__img">
              <img src={counterImg} alt="counter-img" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h2 className="section__title">New Arrivals</h2>
            </Col>
            {loading ? (
              <Col
                lg="12"
                className=" mt-4 d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <PropagateLoader color="#36d7b7" />
              </Col>
            ) : (
              <ProductList data={mobileProducts} />
            )}
            {loading ? (
              <h5 className="fw-bold">Loading....</h5>
            ) : (
              <ProductList data={wirelessProducts} />
            )}
          </Row>
        </Container>
      </section>

      <section className="poplar__category">
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <Col
                lg="12"
                className=" mt-4 d-flex justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <PropagateLoader color="#36d7b7" />
              </Col>
            </Col>
            {loading ? (
              <h5 className="fw-bold">Loading....</h5>
            ) : (
              <ProductList data={popularProducts} />
            )}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
