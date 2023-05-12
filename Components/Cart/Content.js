import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from "react-redux";
import CartIcon from "../Cart/CartIcon";
import ModalAll from "../Modal/ModalAll";
import VND from "../utils/formatVND";
import CartItem from "./CartItem";
import Image from "next/image";
import { useRouter } from "next/router";

const Content = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPriceCartt = useSelector((state) => state.cart.totalPriceCart);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Fragment>
      {windowWidth < 1000 && (
        <div className="container-fluid my-12">
          <div className="row">
            <div className=" col-12 ">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
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

            <div className="col-12 ">
              <div className="container-fluid  border rounded shadow  ">
                <div className="row">
                  <div className="col-12 my-2">
                    <div className="d-flex justify-content-between">
                      <h5 className="text-dark fw-bold">Giỏ hàng</h5>
                      <ModalAll />
                    </div>
                  </div>
                  <CartIcon />
                  <div className="col-12  ">
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

                  <div className="col-12 col-12">
                    <div className="container">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 fixed-bottom bg-light pt-2">
              <div className="container-fluid border rounded shadow pt-2">
                <h4 className="fw-bold">Tổng Tiền:</h4>
                <div className="d-flex justify-content-between ">
                  <span className="text-muted">Tạm Tính</span>
                  <span className="fw-bold">{VND.format(totalPriceCartt)}</span>
                </div>
                <div className="d-flex justify-content-between row pb-2">
                  <Link href="/" className="text-decoration-none  col-6">
                    <button className="btn btn-info text-light ">
                      <span className="fw-bold">Mua Thêm</span>
                    </button>
                  </Link>
                  {totalPriceCartt > 0 && (
                    <Link
                      href="/checkout"
                      className="text-decoration-none text-dark col-6 text-end"
                    >
                      <button className="btn btn-warning text-light">
                        <span className="fw-bold">Đặt hàng</span>
                        <FaAngleRight />
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {windowWidth > 1000 && (
        <div className="container-fluid my-10">
          <div className="row">
            <div className=" col-lg-12 ">
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
            {cartItems.length === 0 && (
              <div
                className="col-lg-12 d-flex justify-content-start flex-column align-items-center "
                onClick={() => router.push("/")}
              >
                <Image
                  className="img-fluid rounded shadow h-50 mt-0"
                  src="/images/illustration-not-found.svg"
                  width={400}
                  height={50}
                />
                <span className="my-3 w-25 text-center fw-bold ">
                  Tiếc quá! LT99 không tìm thấy sản phẩm nào trong giỏ hàng của
                  bạn.
                </span>
                <button className="btn bg-blue-dark text-white  bg-blue-darkHover  btn-lg">
                  Tiếp tục mua hàng
                </button>
              </div>
            )}
            {cartItems.length !== 0 && (
              <>
                <div className=" col-lg-9 ">
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
                        <span className="text-muted me-1">
                          Chính sách giao hàng
                        </span>
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
                                  LT99 Pharmacy giao hàng miễn phí cho đơn hàng
                                  có giá trị từ 300.000 đ trở lên.
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
                                  inventory: item.inventory,
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
                      <span className="fw-bold">
                        {VND.format(totalPriceCartt)}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between row py-3">
                      <Link
                        href="/"
                        className="text-decoration-none  col-6 p-0"
                      >
                        <button className="btn btn-info text-light ">
                          {" "}
                          <span className="fw-bold">Mua Thêm</span>
                        </button>
                      </Link>
                      {totalPriceCartt > 0 && (
                        <Link
                          href="/checkout"
                          className="text-decoration-none text-dark col-6 text-end p-0"
                        >
                          <button className="btn btn-warning text-light">
                            <span className="fw-bold">Thanh Toán</span>
                            <FaAngleRight />
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Content;
