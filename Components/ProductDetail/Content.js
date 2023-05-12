import { cartActions } from "@/store/cart-slice";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { BsCartPlus, BsStarFill, BsStarHalf } from "react-icons/bs";
import { useDispatch } from "react-redux";
import ListCard from "../Index/ListCard";
import VND from "../utils/formatVND";

import CartIcon from "./CartIcon";
import TichDiem from "./TichDiem";
import TuVanIcon from "./TuVanIcon";
import { toast } from "react-toastify";
import Image from "next/image";

const Content = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [thuoc, setThuoc] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    fetch(
      `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc/${router.query.id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        return response.json();
      })
      .then((results) => {
        setThuoc(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [router.query.id]);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const addToCart = () => {
    const obj = {
      id: thuoc.thuoc.maThuoc,
      title: thuoc.thuoc.tenThuoc,
      price: thuoc.giaBanLe,
      images: `/images/product/${thuoc.thuoc.maThuoc}.jpg`,
      donViTinh: thuoc.thuoc.donViTinh,
      inventory: thuoc.thuoc.soLuong,
    };
    dispatch(cartActions.addItemToCart(obj));
  };
  console.log(thuoc);
  return (
    <Fragment>
      {windowWidth > 1000 && (
        <div className="container-fluid my-10">
          <div className="row ">
            <div className="col-xl-12 col-lg-12 mb-3  ">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb ">
                  <li className="breadcrumb-item">
                    <Link href="/ " className="text-muted text-decoration-none">
                      Trang chủ
                    </Link>
                  </li>

                  <li className="breadcrumb-item">
                    <Link
                      href="/listProduct"
                      className="text-info text-decoration-none"
                    >
                      Sản phẩm
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="container">
              <div className="row">
                {Object.keys(thuoc).length !== 0 && (
                  <>
                    <div className="col-4 rounded d-flex flex-column align-items-center">
                      <div className="card position-relative shadow">
                        <div className="position-absolute localDiscount fs-12">
                          <span className="text-dark rounded-circle bg-danger p-2 text-white fs-12">
                            -10%
                          </span>
                        </div>
                        <img
                          src={`/images/product/${thuoc.thuoc.maThuoc}.jpg`}
                          className="img-fluid p-3"
                        />
                      </div>
                      <Image
                        src={`/images/product/${thuoc.thuoc.maThuoc}.jpg`}
                        className="img-fluid border border-primary mt-3 p-3 rounded pointer"
                        width={100}
                        height={30}
                      />
                    </div>
                    <div className="col-8">
                      <div className="container">
                        <h4 className="fw-bold">{thuoc.thuoc.tenThuoc}</h4>
                        <div className="row">
                          <div className="col-12">
                            <div className="border rounded p-2 my-3 shadow">
                              <BsStarFill className="text-warning" />
                              <BsStarFill className="text-warning" />
                              <BsStarFill className="text-warning" />
                              <BsStarFill className="text-warning" />
                              <BsStarHalf className="text-warning" />
                              <h4 className="text-success me-2 fw-bold">
                                {`${VND.format(thuoc.giaBanLe)}/${
                                  thuoc.thuoc.donViTinh
                                }`}
                              </h4>
                              <span className="fw-bold ">Giá thị trường:</span>
                              <span className="text-success  bg-ligh me-2 text-decoration-line-through">
                                {` ${VND.format(
                                  thuoc.giaBanLe + (thuoc.giaBanLe * 10) / 100
                                )}`}
                              </span>
                              <span className="text-white bg-info p-1 rounded">
                                {`Tiết kiệm: ${VND.format(
                                  (thuoc.giaBanLe * 10) / 100
                                )}(-10%)`}
                              </span>
                            </div>
                            <div className="container-fluid px-0">
                              <div className="row my-3">
                                <div className="col-4 fw-bold">Danh Mục:</div>
                                <div className="col-8">
                                  <Link
                                    href={`/listProduct/${thuoc.thuoc.loaiThuoc.maLoai}`}
                                    className="text-blue-pastel fw-bold text-decoration-none"
                                  >
                                    {thuoc.thuoc.loaiThuoc.tenLoai}
                                  </Link>
                                </div>
                              </div>
                              <div className="row my-3">
                                <div className="col-4 fw-bold">
                                  Quy Cách Đóng Gói:
                                </div>
                                <div className="col-8">
                                  <span>{thuoc.thuoc.quyCachDongGoi}</span>
                                </div>
                              </div>
                              <div className="row my-3">
                                <div className="col-4 fw-bold">
                                  Cách Sử Dụng:
                                </div>
                                <div className="col-8">
                                  <span>{thuoc.thuoc.huongDanSuDung}</span>
                                </div>
                              </div>
                              <div className="row my-3">
                                <div className="col-4 fw-bold">Liều Lượng:</div>
                                <div className="col-8">
                                  <span>{thuoc.thuoc.lieuLuong}</span>
                                </div>
                              </div>
                              <div className="row my-3">
                                <div className="col-4 fw-bold">
                                  Tác Dụng Phụ:
                                </div>
                                <div className="col-8">
                                  <span>{thuoc.thuoc.tacDungPhu}</span>
                                </div>
                              </div>
                              <div className="row my-3">
                                <div className="col-4 fw-bold">Mô tả ngắn:</div>
                                <div className="col-8">
                                  <p>{thuoc.thuoc.moTa}</p>
                                </div>
                              </div>
                            </div>

                            <div className="w-100 d-flex justify-content-end ">
                              <button
                                className="btn btn-info me-4 text-white rounded-pill btn-lg"
                                onClick={() => {
                                  addToCart();
                                  router.push("/checkout");
                                }}
                              >
                                Mua Ngay
                              </button>
                              <button
                                className="btn btn-warning text-dark rounded-pill btn-lg"
                                onClick={() => {
                                  toast.success(
                                    "Thêm sản phẩm vào giỏ hàng thành công",
                                    {
                                      position: toast.POSITION.TOP_RIGHT,
                                      autoClose: 500,
                                      theme: "light",
                                    }
                                  );
                                  addToCart();
                                }}
                              >
                                <BsCartPlus /> Thêm vào giỏ hàng
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                <div className="col-12">
                  <div className="border rounded my-3 p-3 pb-3  shadow">
                    <h5 className="fw-bold pb-3">Các hình thức giao hàng</h5>
                    <span className=" p-2 rounded bg-primary w-100 text-white me-3">
                      Giao hàng tiết kiệm
                    </span>
                    <span className="p-2 rounded bg-primary text-white w-100">
                      Ahamove
                    </span>
                  </div>
                  <div className="container-fluid border rounded my-3 p-2 pb-3 shadow ">
                    <div className="row">
                      <div className="col-4 text-center fw-bold">
                        <CartIcon />
                        <span className="my-2">
                          Miễn phí vận chuyển cho đơn hàng từ 300.000đ
                        </span>
                      </div>
                      <div className="col-4 text-center fw-bold ">
                        <TuVanIcon />
                        <span className="my-2">
                          Đủ thuốc tốt tư vấn nhiệt tình
                        </span>
                      </div>
                      <div className="col-4 text-center fw-bold">
                        <TichDiem />
                        <span className="my-2">
                          Tích điểm thưởng đổi thưởng và sử dụng điểm cho mọi
                          giao dịch
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row line-space my-2"></div>
          <ListCard />
        </div>
      )}
      {windowWidth < 1000 && (
        <div className="container-fluid my-12">
          <div className="row ">
            <div className="col-xl-12 col-lg-12 ">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb mb-2">
                  <li className="breadcrumb-item">
                    <Link href="/ " className="text-muted text-decoration-none">
                      Trang chủ
                    </Link>
                  </li>

                  <li className="breadcrumb-item">
                    <Link
                      href="/listProduct"
                      className="text-info text-decoration-none"
                    >
                      Sản phẩm
                    </Link>
                  </li>
                </ol>
              </nav>
            </div>
            <div className="container">
              <div className="row">
                {Object.keys(thuoc).length !== 0 && (
                  <>
                    {" "}
                    <div className="col-12">
                      <div className="card shadow ">
                        <img
                          src={`/images/product/${thuoc.thuoc.maThuoc}.jpg`}
                          className="img-fluid"
                        />
                      </div>
                    </div>
                    <div className="col-12 my-2">
                      <div className="container">
                        <h4 className="fw-bold">{thuoc.thuoc.tenThuoc}</h4>
                        <div className="row">
                          <div className="col-12">
                            <div className="border rounded p-2 mt-1 mb-3 shadow">
                              <BsStarFill className="text-warning" />
                              <BsStarFill className="text-warning" />
                              <BsStarFill className="text-warning" />
                              <BsStarFill className="text-warning" />
                              <BsStarHalf className="text-warning" />
                              <h4 className="text-success me-2 fw-bold mb-0">
                                {VND.format(thuoc.giaBanLe)}
                              </h4>
                              <span className="fw-bold">Giá thị trường:</span>
                              <span className="text-success  bg-ligh w-100">
                                {` ${VND.format(
                                  thuoc.giaBanLe + (thuoc.giaBanLe * 5) / 100
                                )}`}
                              </span>
                              <p className="text-muted rounded mb-0 fst-italic bg-info mt-2">
                                {`Tiết kiệm: ${VND.format(
                                  (thuoc.giaBanLe * 5) / 100
                                )}(-5%)`}
                              </p>
                            </div>
                            <div className="container-fluid px-0">
                              <div className="row my-3">
                                <div className="col-4 fw-bold">Danh Mục:</div>
                                <div className="col-8">
                                  <Link
                                    href={`/listProduct/${thuoc.thuoc.loaiThuoc.maLoai}`}
                                    className="text-blue-pastel fw-bold text-decoration-none"
                                  >
                                    {thuoc.thuoc.loaiThuoc.tenLoai}
                                  </Link>
                                </div>
                              </div>
                              <div className="row my-3">
                                <div className="col-4 fw-bold">
                                  Quy Cách Đóng Gói:
                                </div>
                                <div className="col-8">
                                  <span>{thuoc.thuoc.quyCachDongGoi}</span>
                                </div>
                              </div>
                              <div className="row my-3">
                                <div className="col-4 fw-bold">
                                  Cách Sử Dụng:
                                </div>
                                <div className="col-8">
                                  <span>{thuoc.thuoc.huongDanSuDung}</span>
                                </div>
                              </div>
                              <div className="row my-3">
                                <div className="col-4 fw-bold">Liều Lượng:</div>
                                <div className="col-8">
                                  <span>{thuoc.thuoc.lieuLuong}</span>
                                </div>
                              </div>
                              <div className="row my-3">
                                <div className="col-4 fw-bold">
                                  Tác Dụng Phụ:
                                </div>
                                <div className="col-8">
                                  <span>{thuoc.thuoc.tacDungPhu}</span>
                                </div>
                              </div>
                              <div className="row my-3">
                                <div className="col-4 fw-bold">Mô tả ngắn:</div>
                                <div className="col-8">
                                  <p>{thuoc.thuoc.moTa}</p>
                                </div>
                              </div>
                            </div>
                            <div className="fixed-bottom bg-light py-3 d-flex justify-content-between px-3">
                              <button
                                className="btn btn-info mx-4 text-white"
                                onClick={() => {
                                  addToCart();
                                  router.push("/checkout");
                                }}
                              >
                                Mua Ngay
                              </button>
                              <button
                                className="btn btn-warning text-dark"
                                onClick={() => {
                                  toast.success(
                                    "Thêm sản phẩm vào giỏ hàng thành công",
                                    {
                                      position: toast.POSITION.TOP_RIGHT,
                                      autoClose: 500,
                                      theme: "light",
                                    }
                                  );
                                  addToCart();
                                }}
                              >
                                <BsCartPlus /> Thêm vào giỏ hàng
                              </button>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="border rounded my-3 p-3 pb-3 ">
                              <h5 className="fw-bold pb-3">
                                Các hình thức giao hàng
                              </h5>
                              <span className="p-2 rounded bg-primary  me-4 text-white ">
                                Giao hàng tiết kiệm
                              </span>
                              <span className="p-2 rounded bg-primary text-white ">
                                Ahamove
                              </span>
                            </div>
                            <div className="container border rounded my-3 p-2 pb-3 ">
                              <div className="row">
                                <div className="col-4 text-center fw-bold">
                                  <CartIcon />
                                  <span className="my-2 fs-12 ">
                                    Miễn phí vận chuyển cho đơn hàng từ 300.000đ
                                  </span>
                                </div>
                                <div className="col-4 text-center fw-bold ">
                                  <TuVanIcon />
                                  <span className="my-2 fs-12">
                                    Đủ thuốc tốt tư vấn nhiệt tình
                                  </span>
                                </div>
                                <div className="col-4 text-center fw-bold">
                                  <TichDiem />
                                  <span className="my-2 fs-12">
                                    Tích điểm thưởng đổi thưởng và sử dụng điểm
                                    cho mọi giao dịch
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <ListCard />
        </div>
      )}
    </Fragment>
  );
};

export default Content;
