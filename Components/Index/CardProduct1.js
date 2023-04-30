import Link from "next/link";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";
import { toast } from "react-toastify";
import VND from "../utils/formatVND";
import Image from "next/image";
import xuLyTenKhiQuaDai from "../utils/tooLong";
const CardProduct1 = (props) => {
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

  return (
    <Fragment>
      <div className="carousel-item active">
        <div className="card cardProductHover h-100">
          <Link
            href={`/product/${props.id}`}
            className="h-90 text-decoration-none d-flex flex-column justify-content-between align-items-center shadow "
          >
            <Image
              width={300}
              height={400}
              src={props.images}
              alt=""
              className="card-img-top img-fluid"
            />
            <div className="card-body float-left">
              <h6 className="card-title text-dark fw-bold ">
                {xuLyTenKhiQuaDai(props.title)}
              </h6>
              <p className="text-info">
                {VND.format(props.price) + "/" + props.donViTinh}
              </p>
            </div>
          </Link>
          <button
            className="btn btn-primary  btn-info my-2 mx-2 shadow fw-bold fs-12"
            onClick={addToCart}
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default CardProduct1;
