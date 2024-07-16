import React from "react";
import { FiPlus } from "react-icons/fi";
import { motion } from "framer-motion";
import { Col } from "reactstrap";
import "../../styles/ProductCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "../../redux/slices/cartSlice";
import { toast } from 'react-toastify';

const ProductCard = ({ item }) => {
  console.log(item)
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(
      addItem({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );

    toast.success(`${item.productName} added to cart`)
  };
  return (
    <Col lg="3" md="4" className="mb-2">
      <div className="product__item">
        <Link to={`/product/${item.id}`}>
          <div className="product__img">
            <motion.img whileHover={{ scale: 0.9 }} src={item.imgUrl} alt="" />
          </div>
          <div className="p-2 product__info">
            <h3 className="product__name">{item.productName}</h3>
            <span>{item.category}</span>
          </div>
        </Link>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToCart}>
            <FiPlus className="plus__btn" />
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
