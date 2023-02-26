import { cartActions } from "@/store/cart-slice";
import Link from "next/link";
import React, { Fragment } from "react";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import ModalItem from "../Modal/ModalItem";
const CartItem = (props) => {
  const { title, quantity, total, price, id, image } = props.item;
  const dispatch = useDispatch();
  const addItem = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        image,
        title,
        price,
      })
    );
  };
  const removeItem = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <Fragment>
      <tr className="pt-4">
        <td>
          <Link href={`/product/${id}`}>
            <img src={`${image}`} className="img-fluid sizeImgCart" />
          </Link>
        </td>
        <td className=" text-info">
          <Link
            href={`/product/${id}`}
            className="text-info text-decoration-none"
          >
            {title}
          </Link>
        </td>
        <td className="text-info">{VND.format(price)}</td>
        <td>
          <div className="border rounded d-flex justify-content-between">
            <button
              className="btn btn-sm bg-light btnSoLuong border "
              onClick={removeItem}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              className="btn btn-sm bg-light btnSoLuong  border "
              onClick={addItem}
            >
              +
            </button>
          </div>
        </td>
        <td className=" text-info">{VND.format(total)}</td>
        <td className="">
          <ModalItem
            content={<BsTrash className="pointer" />}
            id={id}
          ></ModalItem>
        </td>
      </tr>
    </Fragment>
  );
};

export default CartItem;
