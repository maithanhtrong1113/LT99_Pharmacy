import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { BsPerson, BsPersonCircle, BsTelephone } from "react-icons/bs";
import { FaAngleLeft } from "react-icons/fa";
import { FcVip } from "react-icons/fc";
import { MdOutlineLocationOn } from "react-icons/md";
import { useRouter } from "next/router";
import VND from "../utils/formatVND";
import { useState } from "react";
import {
  getChiTietDonHangPhiaKhach,
  huyDonHangPhiaKhach,
} from "@/api/donHangApi";
import { useEffect } from "react";

const ContentChiTietDonHang = () => {
  const router = useRouter();
  const [chiTiet, setChiTiet] = useState({});
  const { id } = router.query;

  async function fetchData() {
    if (typeof id !== null || typeof id !== undefined) {
      const res = await getChiTietDonHangPhiaKhach(id);
      setChiTiet(res);
    }
  }
  useEffect(() => {
    fetchData();
  }, [id]);
  const huyDonHangClick = async () => {
    const res = await huyDonHangPhiaKhach(chiTiet.hoaDon.maDonHang);

    setChiTiet(res);
  };
  return (
    <Fragment>
      <div className="container-fluid my-10">
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
                  <Link
                    href="/donHang"
                    className="text-info text-decoration-none"
                  >
                    Đơn hàng của bạn
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-4">
            <div className="container border shadow rounded d-flex justify-content-center p-3 bg-xanhLo">
              <div className="row w-100 ">
                <div className="col-12 d-flex  flex-column justify-content-center align-items-center">
                  <BsPersonCircle className="fs-40 " />
                  <p className="fw-bold my-2">Khách Hàng </p>
                </div>
                <div className="col-12 bg-light  d-flex rounded  flex-column justify-content-center p-2">
                  <div className="progress ">
                    <div
                      className={`progress-bar progress-bar-striped rounded progress-bar-animated w-25`}
                      role="progressbar"
                      aria-valuenow="75"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    <Image
                      src="/images/heart.png"
                      className="img-fluid p-1"
                      width={50}
                      height={40}
                    />
                    <div className="w-100 d-flex flex-column align-items-center">
                      <span className="fs-14">
                        Để lên hạng bạn cần chi tiêu thêm
                      </span>
                      <span className="fs-dh text-info">8.000.000 đ</span>
                    </div>
                    <FcVip className="fs-40" />
                  </div>
                  <hr />
                  <div className="w-100 d-flex flex-column">
                    <div className=" text-primary d-flex justify-content-between my-1">
                      <span>Điểm tích lũy</span>
                      <span className="fw-bold">0</span>
                    </div>
                    <div className=" text-success d-flex justify-content-between">
                      <span>Điểm có thể dùng</span>
                      <span className="fw-bold">0</span>
                    </div>
                    <div className=" text-danger d-flex justify-content-between">
                      <span>Điểm đã dùng</span>
                      <span className="fw-bold">0</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-12">
            <div className="container border rounded bg-white p-3 shadow">
              <div className="row">
                <div className="col-10"></div>
              </div>
              {Object.keys(chiTiet).length !== 0 && (
                <div className="row">
                  <div className="col-8 my-3">
                    <h5 className="fw-bold ">
                      Chi tiết đơn hàng{" "}
                      <b className="text-success">
                        #{chiTiet.hoaDon.maDonHang}
                      </b>
                    </h5>
                  </div>
                  {chiTiet.hoaDon.trangThai === "WAITTING" && (
                    <div className="col-4 text-end">
                      <button
                        className="btn btn-secondary"
                        onClick={huyDonHangClick}
                      >
                        Hủy Đơn Hàng
                      </button>
                    </div>
                  )}
                  <div className="col-12 d-flex align-items-center fw-bold">
                    Trạng thái đơn hàng:
                    {chiTiet.hoaDon.trangThai === "ACCEPTED" && (
                      <span className="ms-2 border rounded-pill bg-success text-white fs-dh p-2">
                        Xác Nhận
                      </span>
                    )}
                    {chiTiet.hoaDon.trangThai === "DENIED" && (
                      <span className="ms-2 border rounded-pill bg-danger text-white fs-dh p-2">
                        Từ chối
                      </span>
                    )}
                    {chiTiet.hoaDon.trangThai === "CANCELLED" && (
                      <span className="ms-2 border rounded-pill bg-secondary text-white fs-dh p-2">
                        Đã hủy
                      </span>
                    )}
                    {chiTiet.hoaDon.trangThai === "WAITTING" && (
                      <span className="ms-2 border rounded-pill bg-warning text-white fs-dh p-2">
                        Chờ xác nhận
                      </span>
                    )}
                  </div>
                  <div className="col-12 mt-5">
                    <h6 className="fw-bold">Thông tin khách hàng</h6>
                  </div>
                  <div className="col-6 my-2">
                    <div className="w-50 d-flex align-items-center text-muted">
                      <BsPerson className="me-2" />
                      Tên người nhận
                    </div>
                  </div>
                  <div className="col-6 my-2">
                    <span>{chiTiet.hoaDon.tenKhachHang}</span>
                  </div>
                  <div className="col-6 my-2">
                    <div className="w-50 d-flex align-items-center text-muted">
                      <BsTelephone className="me-2" />
                      Số điện thoại
                    </div>
                  </div>
                  <div className="col-6 my-2">
                    <span>{chiTiet.hoaDon.sdtKhachHang}</span>
                  </div>
                  <div className="col-6 my-2">
                    <div className="w-50 d-flex align-items-center text-muted">
                      <MdOutlineLocationOn className="me-2" />
                      Địa chỉ giao hàng
                    </div>
                  </div>
                  <div className="col-6 my-2">
                    <span>Nguyễn Kiêm</span>
                  </div>
                  <div className="col-12 mt-5">
                    <h6 className="fw-bold">
                      Sản phẩm đã đặt: <b>{chiTiet.hoaDon.ngayTaoDonhHang}</b>
                    </h6>
                  </div>
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
                      {chiTiet.hoaDon.chiTietDonHang.map((thuoc) => (
                        <tr>
                          <td>
                            <Link href={`/product/${thuoc.thuoc.maThuoc}`}>
                              <img
                                src={`/images/index/products/product1.jpg`}
                                className="img-fluid sizeImgCart"
                              />
                            </Link>
                          </td>
                          <td>
                            <Link
                              href={`/product/${thuoc.thuoc.maThuoc}`}
                              className="text-decoration-none"
                            >
                              {thuoc.thuoc.tenThuoc}
                            </Link>
                          </td>
                          <td>{VND.format(thuoc.donGia)}</td>
                          <td>{thuoc.soLuong}</td>
                          <td>{VND.format(thuoc.thanhTien)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <hr />
                  <div className="col-12">
                    Tổng tiền:{" "}
                    <b className="fs-20 text-success">
                      {VND.format(chiTiet.hoaDon.tongTruocThue)}
                    </b>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentChiTietDonHang;
