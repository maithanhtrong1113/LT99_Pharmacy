import { cartActions } from "@/store/cart-slice";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import ModalItem from "../Modal/ModalItem";
import VND from "../utils/formatVND";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Fragment>
      {windowWidth < 1000 && (
        <div className="row d-flex border shadow my-3 py-2 align-items-center rounded">
          <div className="col-3">
            <Link href={`/product/${id}`}>
              <img src={`${image}`} className="img-fluid sizeImgCart" />
            </Link>
          </div>
          <div className="col-5 ">
            <Link
              href={`/product/${id}`}
              className="text-dark text-center text-decoration-none fs-12"
            >
              {title}
            </Link>
          </div>

          <div className="col-4 d-flex flex-column align-items-end">
            <div className="">
              <ModalItem
                content={<BsTrash className="pointer" />}
                id={id}
              ></ModalItem>
            </div>
            <div className="text-primary">{VND.format(total)}</div>

            <div className="border rounded d-flex justify-content-between align-items-center mt-2 w-100">
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
          </div>
        </div>
      )}
      {windowWidth > 1000 && (
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
      )}
    </Fragment>
  );
};

export default CartItem;
