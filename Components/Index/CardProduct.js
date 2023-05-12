import Link from "next/link";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";
import { toast } from "react-toastify";
import VND from "../utils/formatVND";
import Image from "next/image";
import xuLyTenKhiQuaDai from "../utils/tooLong";
import { BsCartPlus, BsCartPlusFill } from "react-icons/bs";
import { useEffect } from "react";
import { useState } from "react";
const CardProduct = (props) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    const { title, price, id, images, inventory } = props;

    dispatch(
      cartActions.addItemToCart({ id, title, price, images, inventory })
    );
    toast.success("Đã thêm sản phẩm vào giỏ hàng", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 300,
      theme: "light",
    });
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Fragment>
      <div className="col-6 col-lg-3  mb-3  pb-3 pt-2">
        <div
          className={`card cardProductHover h-100 ${
            windowWidth > 1000 ? "hover15" : " "
          } shadow position-relative`}
        >
          <div className="position-absolute localDiscount fs-12">
            <span className="text-dark rounded-circle bg-danger p-2 text-white fs-12">
              -10%
            </span>
          </div>
          <Link
            href={`/product/${props.id}`}
            className=" h-90 text-decoration-none d-flex flex-column justify-content-between align-items-center shadow "
          >
            <figure>
              <Image
                width={300}
                height={400}
                src={props.images}
                alt=""
                className="card-img-top img-fluid p-3"
              />
            </figure>

            <div className="card-body float-left">
              <h6 className="card-title text-dark fw-bold ">
                {xuLyTenKhiQuaDai(props.title)}
              </h6>

              <p className="text-muted text-decoration-line-through">
                {VND.format(props.price * 1.1) + "/" + props.donViTinh}
              </p>
              <p className="text-blue-pastel">
                {VND.format(props.price) + "/" + props.donViTinh}
              </p>
            </div>
          </Link>
          <button
            className="btn  bg-blue-dark bg-blue-darkHover my-2 mx-2 shadow fw-bold fs-12 d-flexalign-items-center text-dark"
            onClick={addToCart}
          >
            Thêm vào giỏ hàng
          </button>
          {/*  */}
        </div>
      </div>
    </Fragment>
  );
};

export default CardProduct;
