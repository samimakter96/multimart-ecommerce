import React, { useState, useEffect } from "react";
import CommonSection from "../components/UI/CommonSection";
import { Container, Row, Col } from "reactstrap";
import { IoSearchSharp } from "react-icons/io5";
import "../styles/Shop.css";
import { PropagateLoader } from "react-spinners";
import ProductList from "../components/UI/ProductList";
import useGetData from "../customHooks/useGetData";

const Shop = () => {
  const { data: products, loading } = useGetData("products");
  const [productsData, setProductsData] = useState([]);

  // Update productsData when products are fetched
  useEffect(() => {
    setProductsData(products);
  }, [products]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;

    // Check if filterValue is not the default "Filter By Category" option
    if (filterValue !== "Filter By Category") {
      const filteredProducts = products.filter(
        (item) => item.category === filterValue
      );

      setProductsData(filteredProducts);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredSearchProducts = products.filter((item) =>
      item.productName.toLowerCase().includes(searchValue)
    );

    setProductsData(filteredSearchProducts);
  };

  return (
    <div>
      <CommonSection title="Products" />

      <section>
        <Container>
          <Row>
            <Col lg="3" md="6">
              <div className="filter__widget">
                <select onChange={handleFilter}>
                  <option value="Filter By Category">Filter By Category</option>
                  <option value="sofa">Sofa</option>
                  <option value="mobile">Mobile</option>
                  <option value="chair">Chair</option>
                  <option value="watch">Watch</option>
                  <option value="wireless">Wireless</option>
                </select>
              </div>
            </Col>
            <Col lg="3" md="6" className="text-end">
              <div className="filter__widget">
                <select>
                  <option>Sort By</option>
                  <option value="ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </div>
            </Col>
            <Col lg="6" md="12">
              <div className="search__box">
                <input
                  type="text"
                  placeholder="Search...."
                  onChange={handleSearch}
                />
                <span>
                  <IoSearchSharp size={"20px"} />
                </span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section>
        <Container>
          <Row>
            {loading ? (
              <h1 className="text-center fs-4">
                <PropagateLoader color="#36d7b7" />
              </h1>
            ) : productsData.length === 0 ? (
              <h1 className="text-center fs-4">No products are found!</h1>
            ) : (
              <ProductList data={productsData} />
            )}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default Shop;
