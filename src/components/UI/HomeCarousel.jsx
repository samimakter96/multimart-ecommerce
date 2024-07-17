import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import '../../styles/HomeCarousel.css';

const HomeCarousel = () => {
  const images = [
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  return (
    <swiper-container
      space-between="10"
      slides-per-view="1"
      pagination="true"
      navigation="true"
      autoplay={{ delay: 1000 }}
    >
      {images.map((src, index) => (
        <swiper-slide key={index} lazy="true">
          <img
            src={src}
            loading="lazy"
            alt=""
          />
          <button 
            className="shop__btn"
          >
            <Link to="/shop">SHOP NOW</Link>
          </button>
        </swiper-slide>
      ))}
    </swiper-container>
  );
};

export default HomeCarousel;
