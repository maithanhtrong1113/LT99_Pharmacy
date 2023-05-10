import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import CheckOutItem from "./CheckOutItem";

import ModalVanChuyen from "../Modal/ModalVanChuyen";
import ModalAddThongTinKH from "../Modal/ModalAddThongTinKH";
import { useDispatch, useSelector } from "react-redux";
import VND from "../utils/formatVND";
import { toast } from "react-toastify";
import { cartActions } from "@/store/cart-slice";
import { useRouter } from "next/router";
const Content = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [giaVanChuyen, setGiaVanChuyen] = useState(16000);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPriceCartt = useSelector((state) => state.cart.totalPriceCart);
  const [thongTinKhachHang, setThongTinKhachHang] = useState("");
  const [cartDonHang, setCartDonHang] = useState([]);
  const xuliGia = (data) => {
    console.log(data);
    if (data === "nhanh") {
      setGiaVanChuyen(25000);
    } else setGiaVanChuyen(16000);
  };

  const getDiaChi = (data) => {
    setThongTinKhachHang(data);
  };
  const [ghiChu, setGhiChu] = useState("");
  const datHangHandler = () => {
    if (thongTinKhachHang === "") {
      toast.warning("Vui lòng nhập đầy đủ thông tin giao hàng", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        theme: "light",
      });

      return;
    } else {
      const cartSend = cartItems.map((thuoc) => {
        return {
          thuoc: { maThuoc: thuoc.id },
          soLuongThuocDat: thuoc.quantity,
        };
      });
      console.log(thongTinKhachHang.diaChi);
      fetch(
        "http://localhost:8080/QLNT-Server/khach-hang/don-hang/tao-don-hang",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            diaChiGiaoHang: thongTinKhachHang.diaChi,
            khachHang: { maKhachHang: thongTinKhachHang.maKhachHang },
            orderDetails: cartSend,
          }),
        }
      ).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            toast.success("Đặt hàng thành công", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
              theme: "light",
            });
            setTimeout(() => {
              router.push(`/donHang/${data.maDonHang}`);
              dispatch(cartActions.copyAllItem());
              dispatch(cartActions.removeAllItem());
            }, 500);
          });
        } else {
          toast.error("Đặt hàng không thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            theme: "light",
          });
        }
      });
    }
  };
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Fragment>
      {windowWidth > 1000 && (
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
                <span className="fw-bold me-2">{` Giỏ hàng (${
                  cartItems.length
                } sản phẩm - ${VND.format(totalPriceCartt)}) `}</span>
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
                  <h5 className="fw-bold text-dark">Thông tin giao hàng</h5>

                  <ModalAddThongTinKH sendDataToCheckOut={getDiaChi} />
                  <ModalVanChuyen handlerChangeVanChuyen={xuliGia} />
                </div>
              </div>
              <div className="container px-3 border rounded shadow py-3 mt-3">
                <div className="row">
                  <h5 className="fw-bold text-dark">
                    Chọn hình thức thanh toán
                  </h5>
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
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              checked
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
                              Bạn sẽ thanh toán trước số tiền của đơn hàng qua
                              thẻ ATM nội địa
                            </span>
                          </div>
                          <div className="col-lg-1 col-xl-1">
                            {" "}
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              disabled
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
                              Bạn sẽ thanh toán trước số tiền của đơn hàng qua
                              thẻ tín dụng
                            </span>
                          </div>
                          <div className="col-lg-1 col-xl-1">
                            {" "}
                            <input
                              disabled
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
                  <span className="text-muted">
                    Thành tiền (Đã bao gồm VAT)
                  </span>
                  <span className="fw-bold fs-25 text-warning">
                    {VND.format(giaVanChuyen + totalPriceCartt)}
                  </span>
                </div>
                <div className="">
                  <p className="text-muted">Ghi chú đơn hàng</p>
                  <textarea
                    className="customer-note border-none rounded shadow w-100"
                    value={ghiChu}
                    onChange={(e) => {
                      setGhiChu(e.target.value);
                    }}
                  />
                </div>
                {totalPriceCartt > 0 && (
                  <div className="row py-3">
                    <Link
                      href="/checkout"
                      className="text-decoration-none text-dark col-12"
                    >
                      <button
                        type="button"
                        className="btn btn-warning text-center btn-lg text-light w-100"
                        onClick={datHangHandler}
                      >
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
      )}
      {windowWidth < 1000 && (
        <div className="container-fluid my-12 " id="modal-checkout">
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
                <p className="fw-bold me-2 mb-2">{` Giỏ hàng (${
                  cartItems.length
                } sản phẩm - ${VND.format(totalPriceCartt)}) `}</p>
                <Link className="text-decoration-none text-info" href="/cart">
                  Nhấn để thay đổi
                </Link>
                <div className="row">
                  <div className="col-xl-12 col-lg-12">
                    <table className="table mt-3">
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
                  <ModalAddThongTinKH sendDataToCheckOut={getDiaChi} />

                  <ModalVanChuyen handlerChangeVanChuyen={xuliGia} />
                </div>
              </div>
              <div className="container px-3 border rounded shadow py-3 mt-3">
                <div className="row">
                  <h5 className="fw-bold text-dark">
                    Chọn hình thức thanh toán
                  </h5>
                  <form className="w-100">
                    <div className="col-12 border rounded shadow my-3">
                      <div className="container-fluid">
                        <div className="row d-flex align-items-center p-3 ">
                          <div className="col-3">
                            <img
                              src="images/checkout/cash.jpg"
                              className="img-fluid imgPaymentMethod "
                            />
                          </div>
                          <div className="col-7">
                            <p className="fw-bold mb-0">Tiền mặt</p>
                            <span className="text-muted">
                              Thanh toán bằng tiền mặt khi nhận hàng
                            </span>
                          </div>
                          <div className="col-2">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="flexRadioDefault"
                              id="flexRadioDefault1"
                              checked
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
                  <span className="text-muted">
                    Thành tiền (Đã bao gồm VAT)
                  </span>
                  <span className="fw-bold fs-25 text-warning">
                    {VND.format(giaVanChuyen + totalPriceCartt)}
                  </span>
                </div>
                <div className="">
                  <p className="text-muted">Ghi chú đơn hàng</p>
                  <textarea className="customer-note border-none rounded shadow w-100"></textarea>
                </div>
                {totalPriceCartt > 0 && (
                  <div className="row py-3 px-3 fixed-bottom bg-light">
                    <div className="col-6">
                      <p className="mb-0 fw-bold">Thành tiền</p>
                      <p className="mb-0 fw-bold text-info fs-24">
                        {VND.format(totalPriceCartt + giaVanChuyen)}
                      </p>
                    </div>
                    <div className="col-6">
                      <Link
                        href="/checkout"
                        className="text-decoration-none text-dark col-12"
                      >
                        <button
                          className="btn btn-warning text-center btn-lg text-light w-100"
                          onClick={datHangHandler}
                        >
                          <span className="fw-bold ">Đặt hàng</span>
                          <FaAngleRight />
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Content;
