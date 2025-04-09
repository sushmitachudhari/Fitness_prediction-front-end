import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../assets/img1.webp";
import img2 from "../assets/img2.webp";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpg";

// Custom arrow components
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-prev"
      onClick={onClick}
      style={{
        left: "-50px",
        zIndex: 1,
        fontSize: "30px",
        cursor: "pointer",
        color: "#333"
      }}
    >
      ❮
    </div>
  );
};

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="slick-arrow slick-next"
      onClick={onClick}
      style={{
        right: "-25px",
        zIndex: 1,
        fontSize: "30px",
        cursor: "pointer",
        color: "#333"
      }}
    >
      ❯
    </div>
  );
};

const WorkoutSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mt-4 mb-5">
      <h2 className="text-center mb-4">Workout Gallery</h2>
      <Slider {...settings}>
        <div>
          <img
            src={img1}
            alt="Workout 1"
            className="img-fluid p-2"
            style={{ height: "200px", objectFit: "cover", width: "100%" }}
          />
        </div>
        <div>
          <img
            src={img2}
            alt="Workout 2"
            className="img-fluid p-2"
            style={{ height: "200px", objectFit: "cover", width: "100%" }}
          />
        </div>
        <div>
          <img
            src={img3}
            alt="Workout 3"
            className="img-fluid p-2"
            style={{ height: "200px", objectFit: "cover", width: "100%" }}
          />
        </div>
        <div>
          <img
            src={img4}
            alt="Workout 4"
            className="img-fluid p-2"
            style={{ height: "200px", objectFit: "cover", width: "100%" }}
          />
        </div>
      </Slider>
    </div>
  );
};

export default WorkoutSlider;