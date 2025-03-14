import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import CardProduct from "./cardProduct";

const BannerProduct = () => {
  const [hover, setHover] = useState(false);
  let sliderRef = null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  }

  return (
    <Box
      sx={{
        width: "100%",
        height:'500px',
        position: "relative",
        overflow: "visible",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Slider ref={(slider) => (sliderRef = slider)} {...settings} >
        <CardProduct/>
        <CardProduct/>
        <CardProduct/>
        <CardProduct/>
        <CardProduct/>
        <CardProduct/>
        <CardProduct/>
        <CardProduct/>
        <CardProduct/>
        <CardProduct/>
      </Slider>

      {/* Nút Previous */}
      <IconButton
        onClick={() => sliderRef.slickPrev()}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          display: hover ? "flex" : "none",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" }
        }}
      >
        <ArrowBackIos />
      </IconButton>

      {/* Nút Next */}
      <IconButton
        onClick={() => sliderRef.slickNext()}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transition: 'transform 0.3s',
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.5)",
          color: "white",
          display: hover ? "flex" : "none",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" }
        }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default BannerProduct;
