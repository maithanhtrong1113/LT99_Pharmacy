import React, { Fragment, useEffect, useState } from "react";

const Slider = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Fragment>
      <div className="row my-10 d-flex align-items-center ">
        <div
          id="carouselExampleIndicators"
          className="col-12 col-lg-8 carousel slide "
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="3"
              aria-label="Slide 4"
            ></button>
          </div>
          <div className="carousel-inner ">
            <div className="carousel-item active ">
              <img
                src="images/index/t4.jpg"
                className="d-block w-100 rounded img-fluid  "
              />
            </div>
            <div className="carousel-item">
              <img
                src="images/index/t41.png"
                className="d-block w-100 rounded img-fluid  "
              />
            </div>
            <div className="carousel-item  ">
              <img
                src="images/index/t4.jpg"
                className="d-block w-100 rounded img-fluid  "
              />
            </div>
            <div className="carousel-item">
              <img
                src="images/index/t41.png"
                className="d-block w-100 rounded img-fluid  "
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        {windowWidth > 1000 && (
          <div className="col-lg-4">
            <img
              src="images/index/sideimg.jpg"
              className="d-block img-fluid rounded mb-2 w-100"
            />
            <img
              src="images/index/banner2.jpg"
              className="d-block  rounded img-fluid mb-2 "
            />
          </div>
        )}
        <div className="col-12"></div>
      </div>
    </Fragment>
  );
};

export default Slider;
