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
  return (
    <Fragment>
      <div className="col-3  mb-3">
        <div className="card cardProductHover">
          <Link
            href={`product/${props.id}`}
            className="text-decoration-none d-flex flex-column justify-content-between align-items-center shadow "
          >
            <img src={props.images} className="card-img-top" />
            <div className="card-body">
              <h6 className="card-title text-dark fw-bold">{props.title}</h6>
              <p className="text-info">{VND.format(props.price)}</p>
            </div>
          </Link>
          <button
            className="btn btn-primary  btn-info my-2 mx-3 shadow"
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
