import React from "react";
import { motion } from "framer-motion";
import { Col } from "reactstrap";
import "../../styles/ProductCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addFavorite } from "../../redux/slices/cartSlice";
import { FaRegHeart } from "react-icons/fa";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();

  const addToFavorite = () => {
    dispatch(
      addFavorite({
        id: item.id,
        productName: item.productName,
        price: item.price,
        imgUrl: item.imgUrl,
      })
    );

    toast.success(`${item.productName} added to favorite`);
  };

  return (
    <Col lg="3" md="4" className="mb-4">
      <div className="product__item">
        <Link to={`/product/${item.id}`}>
          <div className="product__img">
            <motion.img
              initial={{ opacity: 0 }} // Start with opacity 0
              animate={{ opacity: 1 }} // Animate to full opacity
              transition={{ duration: 0.5 }} // Animation duration
              whileHover={{ scale: 1.05 }} // Scale up on hover
              src={item.imgUrl}
              alt=""
            />
          </div>
          <div className="p-2 product__info">
            <h3 className="product__name">{item.productName}</h3>
            <span>{item.category}</span>
          </div>
        </Link>
        <div className="product__card-bottom d-flex align-items-center justify-content-between p-2">
          <span className="price">${item.price}</span>
          <motion.span whileTap={{ scale: 1.2 }} onClick={addToFavorite}>
            <FaRegHeart className="heart__btn" />
          </motion.span>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
