import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

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
        color: "#333",
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
        color: "#333",
      }}
    >
      ❯
    </div>
  );
};

const WorkoutSlider = () => {
  const [images, setImages] = useState([]);
  const [workoutTypes, setWorkoutTypes] = useState([]);

  const apiKey = "5Jun9J6pswMlTxnZRiMVNanwzuHCKBam1Q9bAIBYIY6w2fxo90aG9lHB";

  useEffect(() => {
    const fetchWorkoutTypes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/admin/workout/view");
        const workoutNames = response.data.map((item) => item.workout_type_name);
        setWorkoutTypes(workoutNames);
      } catch (error) {
        console.error("Error fetching workout types from the database:", error);
      }
    };

    fetchWorkoutTypes();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const allImages = [];

        for (const type of workoutTypes) {
          const response = await axios.get("https://api.pexels.com/v1/search", {
            headers: {
              Authorization: apiKey,
            },
            params: {
              query: type,
              per_page: 1,
              page: 1,
              safe_search: true,
            },
          });

          const photos = response.data.photos;
          if (photos.length > 0) {
            allImages.push({
              ...photos[0],
              workoutType: type,
            });
          }
        }

        setImages(allImages);
      } catch (error) {
        console.error("Error fetching images from Pexels:", error);
      }
    };

    if (workoutTypes.length > 0) {
      fetchImages();
    }
  }, [workoutTypes]);

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
        {images.length > 0 ? (
          images.map((photo, idx) => (
            <div key={idx} style={{ position: "relative" }}>
              <img
                src={photo.src.medium}
                alt={photo.workoutType}
                className="img-fluid p-2"
                style={{ height: "200px", objectFit: "cover", width: "100%" }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "10px",
                  left: "10px",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "8px",
                  fontSize: "14px",
                }}
              >
                {photo.workoutType}
              </div>
            </div>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </Slider>
    </div>
  );
};

export default WorkoutSlider;
