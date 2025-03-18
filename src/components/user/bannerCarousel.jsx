import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

const banners = [
  { img: "https://theme.hstatic.net/200000845405/1001223012/14/home_slider_image_1.jpg?v=420", link: "https://example.com/2" },
  { img: "https://cdn1.fahasa.com/media/magentothem/banner7/BlingboxT125_840X320_1.jpg", link: "https://example.com/2" },
  { img: "https://cdn1.fahasa.com/media/magentothem/banner7/hoisacht3_840x320_2.jpg", link: "https://example.com/2" },
];

const BannerCarousel = () => {
  const [hover, setHover] = useState(false);
  let sliderRef = null;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "400px",
        position: "relative",
        overflow:'hidden'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Slider ref={(slider) => (sliderRef = slider)} {...settings}>
        {banners.map((banner, index) => (
          <Box
            key={index}
            component="img"
            src={banner.img}
            alt={`Banner ${index + 1}`}
            sx={{
              display:'flex',
              justifyContent:'center',
              alignItems:"center",
              maxWidth:'100%',
              maxHeight:'50%',
              objectFit: "cover",
            }}
          />
        ))}
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

export default BannerCarousel;
