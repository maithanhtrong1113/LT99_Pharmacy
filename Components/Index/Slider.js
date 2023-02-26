import React, { Fragment } from "react";

const Slider = () => {
  return (
    <Fragment>
      <div className="row my-10">
        <div
          id="carouselExampleIndicators"
          className="col-8 carousel slide "
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
          </div>
          <div className="carousel-inner  py-2">
            <div className="carousel-item active ">
              <img
                src="images/index/banner1.jpg"
                className="d-block w-100 rounded   "
              />
            </div>
            <div className="carousel-item">
              <img
                src="images/index/banner2.jpg"
                className="d-block w-100 rounded    "
              />
            </div>
            <div className="carousel-item">
              <img
                src="images/index/banner3.jpg"
                className="d-block w-100 rounded    "
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
        <div className="col-4">
          <img
            src="images/index/banner2.jpg"
            className="d-block   rounded img-fluid mb-2 "
          />
          <img
            src="images/index/imgHeader.jpg"
            className="d-block  img-fluid rounded "
          />
        </div>
      </div>
    </Fragment>
  );
};

export default Slider;
