import axios from "axios";
import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import CheckOutItem from "./CheckOutItem";

import ModalDiaChi from "../Modal/ModalDiaChi";
import ModalVanChuyen from "../Modal/ModalVanChuyen";
import { useSelector } from "react-redux";
const Content = () => {
  const [giaVanChuyen, setGiaVanChuyen] = useState(16000);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPriceCartt = useSelector((state) => state.cart.totalPriceCart);
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const xuliGia = (data) => {
    console.log(data);
    if (data === "nhanh") {
      setGiaVanChuyen(25000);
    } else setGiaVanChuyen(16000);
  };
  const getDiaChi = (data) => {
    console.log(data);
  };

  return (
    <Fragment>
      <div className="container-fluid my-10 " id="modal-checkout">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <nav aria-label="breadcrumb ">
              <ol className="breadcrumb ">
                <li className="breadcrumb-item">
                  <Link href="/" className="text-muted text-decoration-none">
                    Trang chủ
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/" className="text-muted text-decoration-none">
                    Giỏ Hàng
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/" className="text-info text-decoration-none">
                    Thanh Toán
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
          <div className="col-xl-8 col-lg-8">
            <div className="container px-3 border rounded shadow py-3">
              <h4 className="fw-bold">Giỏ hàng</h4>
              <span className="fw-bold me-2">
                Giỏ hàng (2 sản phẩm - 19.500 đ)
              </span>
              <Link className="text-decoration-none text-info" href="/cart">
                Nhấn để thay đổi
              </Link>
              <div className="row">
                <div className="col-xl-12 col-lg-12">
                  <table className="table mt-3">
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
                        <CheckOutItem
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
            <div className="container px-3 border rounded shadow py-3 mt-3">
              <div className="row px-2">
                <h5 className="fw-bold text-dark">Giao hàng tận nơi</h5>
                <ModalDiaChi sendDataToCheckOut={getDiaChi} />

                <ModalVanChuyen handlerChangeVanChuyen={xuliGia} />
              </div>
            </div>
            <div className="container px-3 border rounded shadow py-3 mt-3">
              <div className="row">
                <h5 className="fw-bold text-dark">Chọn hình thức thanh toán</h5>
                <form>
                  <div className="col-8 border rounded shadow my-3">
                    <div className="container">
                      <div className="row d-flex align-items-center p-3 ">
                        <div className="col-1">
                          <img
                            src="images/checkout/cash.jpg"
                            className="img-fluid imgPaymentMethod "
                          />
                        </div>
                        <div className="col-10 d-flex flex-column">
                          <span className="fw-bold py-0">Tiền mặt</span>
                          <span className="text-muted">
                            Thanh toán bằng tiền mặt khi nhận hàng
                          </span>
                        </div>
                        <div className="col-lg-1 col-xl-1">
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-8 border rounded shadow my-3">
                    <div className="container">
                      <div className="row d-flex align-items-center p-3 ">
                        <div className="col-1">
                          <img
                            src="images/checkout/atm.jpg"
                            className="img-fluid imgPaymentMethod "
                          />
                        </div>
                        <div className="col-10 d-flex flex-column">
                          <span className="fw-bold py-0">Thẻ ATM</span>
                          <span className="text-muted">
                            Bạn sẽ thanh toán trước số tiền của đơn hàng qua thẻ
                            ATM nội địa
                          </span>
                        </div>
                        <div className="col-lg-1 col-xl-1">
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-8 border rounded shadow my-3">
                    <div className="container">
                      <div className="row d-flex align-items-center p-3 ">
                        <div className="col-1">
                          <img
                            src="images/checkout/tin-dung.jpg"
                            className="img-fluid imgPaymentMethod "
                          />
                        </div>
                        <div className="col-10 d-flex flex-column">
                          <span className="fw-bold py-0">Thẻ tín dụng</span>
                          <span className="text-muted">
                            Bạn sẽ thanh toán trước số tiền của đơn hàng qua thẻ
                            tín dụng
                          </span>
                        </div>
                        <div className="col-lg-1 col-xl-1">
                          {" "}
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4  ">
            <div className="container px-4 border rounded shadow py-4 ">
              <h4 className="fw-bold">Tổng Tiền:</h4>
              <div className="d-flex justify-content-between align-items-center ">
                <span className="text-muted">Tạm Tính</span>
                <span className="fw-bold fs-25">
                  {VND.format(totalPriceCartt)}
                </span>
              </div>
              <div className="d-flex justify-content-between my-3">
                <span className="text-muted">Phí vận chuyển</span>
                <span>{VND.format(giaVanChuyen)}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center my-3">
                <span className="text-muted">Thành tiền (Đã bao gồm VAT)</span>
                <span className="fw-bold fs-25 text-warning">
                  {VND.format(giaVanChuyen + totalPriceCartt)}
                </span>
              </div>
              <div className="">
                <p className="text-muted">Ghi chú đơn hàng</p>
                <textarea className="customer-note border-none rounded shadow w-100"></textarea>
              </div>
              {totalPriceCartt > 0 && (
                <div className="row py-3">
                  <Link
                    href="/checkout"
                    className="text-decoration-none text-dark col-12"
                  >
                    <button className="btn btn-warning text-center btn-lg text-light w-100">
                      <span className="fw-bold ">Đặt hàng</span>
                      <FaAngleRight />
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Content;
