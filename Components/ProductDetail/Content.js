import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { BsCartPlus, BsStarFill, BsStarHalf } from "react-icons/bs";
import ListCard from "../Index/ListCard";

import CartIcon from "./CartIcon";
import TichDiem from "./TichDiem";
import TuVanIcon from "./TuVanIcon";
const Content = () => {
  const router = useRouter();
  return (
    <Fragment>
      <div className="container-fluid my-10">
        <div className="row">
          <div className="col-xl-12 col-lg-12 bg-gray mb-3">
            <nav aria-label="breadcrumb ">
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
              <div className="col-4">
                <div className="card">
                  <img
                    src="/images/index/products/product1.jpg"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-8">
                <div className="container">
                  <h4 className="fw-bold">
                    Thực phẩm bảo vệ sức khỏe viên uống tinh dầu hoa anh thảo
                    Blackmores Evening Primrose Oil (Chai 190 viên)
                  </h4>
                  <div className="row">
                    <div className="col-6">
                      <div className="border rounded p-2 my-3 shadow">
                        <BsStarFill className="text-warning" />
                        <BsStarFill className="text-warning" />
                        <BsStarFill className="text-warning" />
                        <BsStarFill className="text-warning" />
                        <BsStarHalf className="text-warning" />
                        <h4 className="text-success me-2 fw-bold">700.000 đ</h4>
                        <span className="fw-bold">Giá thị trường:</span>
                        <span className="text-success  bg-ligh me-2">
                          {` ${700000 + (700000 * 20) / 100}đ`}
                        </span>
                        <span className="text-white bg-info p-1 rounded">
                          {`Tiết kiệm: ${(700000 * 20) / 100}đ(-20%)`}
                        </span>
                      </div>
                      <p>
                        Thực phẩm bảo vệ sức khỏe viên uống tinh dầu hoa anh
                        thảo Blackmores Evening Primrose Oil được nhập khẩu từ
                        Úc, giúp cung cấp nguồn acid béo thiết yếu omega-6, acid
                        gamma-linolenic (GLA), có tác dụng chống oxy hóa, hỗ trợ
                        làm giảm các triệu chứng tiền kinh nguyệt.
                      </p>
                      <div className="border rounded w-15 d-inline-block ">
                        <button className="btn btn-sm btn-light">-</button>
                        <span>0</span>
                        <button className="btn btn-sm btn-light">+</button>
                      </div>
                      <div className="w-85 d-inline-block ">
                        <button
                          className="btn btn-info mx-4 text-white"
                          onClick={() => {
                            router.push("/cart");
                          }}
                        >
                          Mua Ngay
                        </button>
                        <button
                          className="btn btn-warning text-dark"
                          onClick={() => router.push("/cart")}
                        >
                          <BsCartPlus /> Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="border rounded my-3 p-3 pb-3 ">
                        <h5 className="fw-bold pb-3">
                          Các hình thức giao hàng
                        </h5>
                        <span className="p-2 rounded bg-primary  me-3 text-white ">
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
                              Tích điểm thưởng đổi thưởng và sử dụng điểm cho
                              mọi giao dịch
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Content;
