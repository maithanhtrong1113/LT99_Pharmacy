import { cartActions } from "@/store/cart-slice";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import ModalItem from "../Modal/ModalItem";
import VND from "../utils/formatVND";
const CartItem = (props) => {
  const { title, quantity, total, price, id, image, inventory } = props.item;
  const dispatch = useDispatch();
  const addItem = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        image,
        title,
        price,
        inventory,
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
              className="text-dark text-center text-decoration-none "
            >
              <b className="fw-bold">{title}</b>
            </Link>
          </div>

          <div className="col-4 d-flex flex-column align-items-end">
            <div className="">
              <ModalItem
                content={<BsTrash className="pointer" />}
                id={id}
              ></ModalItem>
            </div>
            <div className="text-success fw-bold">{VND.format(total)}</div>
            <div className="d-flex justify-content-evenly w-100">
              <div className=" rounded d-flex align-items-center justify-content-between mt-2 w-100">
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
        </div>
      )}
      {windowWidth > 1000 && (
        <tr className="pt-4">
          <td>
            <Link href={`/product/${id}`}>
              <img src={`${image}`} className="img-fluid sizeImgCart" />
            </Link>
          </td>
          <td className="text-blue-pastel">
            <Link
              href={`/product/${id}`}
              className="text-blue-pastel text-decoration-none"
            >
              {title}
            </Link>
          </td>
          <td className="text-blue-pastel">{VND.format(price)}</td>
          <td>
            <div className="d-flex flex-column align-items-center w-100 justify-content-center">
              <div className=" rounded d-flex justify-content-between w-100 align-items-center">
                <button
                  className="btn btn-sm bg-light btnSoLuong border "
                  onClick={removeItem}
                >
                  -
                </button>
                <span className="fw-bold mx-2">{quantity}</span>
                <button
                  className="btn btn-sm bg-light btnSoLuong  border "
                  onClick={addItem}
                >
                  +
                </button>
              </div>
              <div className="text-muted">Kho:{`${inventory}`}</div>
            </div>
          </td>
          <td className=" text-blue-pastel">{VND.format(total)}</td>
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
