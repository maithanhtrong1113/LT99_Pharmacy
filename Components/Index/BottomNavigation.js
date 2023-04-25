import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BsCart, BsCartCheck, BsTruck } from "react-icons/bs";
import { FaShippingFast, FaShoppingCart } from "react-icons/fa";
import { MdLocalShipping, MdOutlineMedicalServices } from "react-icons/md";

const BottomNavigation = () => {
  const router = useRouter();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Fragment>
      {windowWidth < 1000 && (
        <div className="container fixed-bottom bg-light shadow">
          <div className="row py-2 mx-2">
            <div
              className={`col-3 d-flex justify-content-center flex-column align-items-center ${
                router.asPath === "/" ? "bg-customNav2" : " "
              }`}
              onClick={() => {
                router.push("/");
              }}
            >
              <AiOutlineHome className="fs-20 " />
              <span className="fw-bold fs-12">Trang chủ</span>
            </div>
            <div
              className={`col-3 d-flex justify-content-center flex-column align-items-center ${
                router.asPath === "/listProduct" ? "bg-customNav2" : " "
              }`}
              onClick={() => {
                router.push("/listProduct");
              }}
            >
              <MdOutlineMedicalServices className="fs-20" />
              <span className="fw-bold fs-12">Danh mục</span>
            </div>
            <div
              className="col-3  d-flex justify-content-center flex-column align-items-center"
              onClick={() => {
                router.push("/cart");
              }}
            >
              <BsCart className="fs-20" />
              <span className="fw-bold fs-12">Giỏ hàng</span>
            </div>
            <div
              className="col-3  d-flex justify-content-center flex-column align-items-center px-0"
              onClick={() => {
                router.push("/checkout");
              }}
            >
              <BsTruck className="fs-20" />
              <span className="fw-bold fs-12">Thanh toán</span>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default BottomNavigation;
