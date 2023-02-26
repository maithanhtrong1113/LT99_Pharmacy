import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import CartIcon from "../Cart/cartIcon";
import ModalAll from "../Modal/ModalAll";
import CartItem from "./CartItem";

const Content = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPriceCartt = useSelector((state) => state.cart.totalPriceCart);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return (
    <Fragment>
      <div className="container-fluid my-10">
        <div className="row">
          <div className="col-xl-12 col-lg-12 ">
            <nav aria-label="breadcrumb ">
              <ol className="breadcrumb ">
                <li className="breadcrumb-item">
                  <Link href="/" className="text-muted text-decoration-none ">
                    Trang chủ
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/" className="text-info text-decoration-none">
                    Giỏ hàng
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-xl-9 col-lg-9 ">
            <div className="container px-3 border rounded shadow py-3 ">
              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <div className="d-flex justify-content-between">
                    <h5 className="text-dark fw-bold">Giỏ hàng</h5>
                    <ModalAll />
                  </div>
                </div>
                <CartIcon />
                <div className="col-xl-9 col-lg-9 py-3 ">
                  <div className="progress ">
                    <div
                      className={`progress-bar progress-bar-striped rounded progress-bar-animated w-25`}
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-3 py-2 d-flex align-items-center position-relative ">
                  <span className="text-muted me-1">Chính sách giao hàng</span>
                  <span
                    className="chinhSachSpan bg-secondary text-light pointer "
                    onClick={toggle}
                  >
                    ?
                  </span>
                  {!isOpen && (
                    <div className=" container border rounded position-absolute localChinhSach bg-light p-3">
                      <div className="row">
                        <div className="col-12-xl col-12-lg d-flex justify-content-between ">
                          <h5 className="fw-bold text-info">
                            Chính sách giao hàng
                          </h5>
                          <AiOutlineClose
                            className="pointer text-danger "
                            onClick={toggle}
                          />
                        </div>
                        <div className="col-12-xl col-12-lg">
                          <p className="fs-14 text-success">
                            LT99 Pharmacy giao hàng miễn phí cho đơn hàng có giá
                            trị từ 300.000 đ trở lên.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="col-xl-12 col-lg-12">
                  <table className="table">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Đơn giá</th>
                        <th scope="col">Số Lượng</th>
                        <th scope="col">Thành tiền</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <CartItem
                          key={item.id}
                          item={{
                            id: item.id,
                            title: item.title,
                            image: item.image,
                            quantity: item.quantity,
                            total: item.totalPrice,
                            price: item.price,
                          }}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-3  ">
            <div className="container px-4 border rounded shadow py-4 ">
              <h4 className="fw-bold">Tổng Tiền:</h4>
              <div className="d-flex justify-content-between ">
                <span className="text-muted">Tạm Tính</span>
                <span className="fw-bold">{VND.format(totalPriceCartt)}</span>
              </div>
              <div className="d-flex justify-content-between row py-3">
                <Link href="/" className="text-decoration-none  col-6">
                  <button className="btn btn-info text-light ">
                    {" "}
                    <span className="fw-bold">Mua Thêm</span>
                  </button>
                </Link>

                <Link
                  href="/checkout"
                  className="text-decoration-none text-dark col-6 text-end"
                >
                  <button className="btn btn-warning text-light">
                    <span className="fw-bold">Đặt hàng</span>
                    <FaAngleRight />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Content;
