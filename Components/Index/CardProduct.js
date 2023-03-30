import Link from "next/link";
import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "@/store/cart-slice";
import { toast } from "react-toastify";
const CardProduct = (props) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    const { title, price, id, images } = props;
    dispatch(cartActions.addItemToCart({ id, title, price, images }));
    toast.success("Đã thêm sản phẩm vào giỏ hàng", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 300,
      theme: "light",
    });
  };

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const xuLyTenKhiQuaDai = (chuoi) => {
    if (chuoi.length > 40) {
      chuoi = chuoi.slice(0, 40) + "...";
    }
    return chuoi;
  };
  return (
    <Fragment>
      <div className="col-6 col-lg-3  mb-3 shadow pb-3">
        <div className="card cardProductHover h-100">
          <Link
            href={`product/${props.id}`}
            className="h-90 text-decoration-none d-flex flex-column justify-content-between align-items-center shadow "
          >
            <img src={props.images} className="card-img-top" />
            <div className="card-body">
              <h6 className="card-title text-dark fw-bold">
                {xuLyTenKhiQuaDai(props.title)}
              </h6>
              <p className="text-info">{VND.format(props.price)}</p>
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

export default CardProduct;
