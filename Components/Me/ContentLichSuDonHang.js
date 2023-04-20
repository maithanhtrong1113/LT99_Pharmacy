import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaAngleRight } from "react-icons/fa";
import { FcVip } from "react-icons/fc";
import DonHang from "./DonHang";

const ContentLichSuDonHang = () => {
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
          <div className="col-4">
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
          </div>
          <div className="col-8">
            <div className="container border rounded bg-white p-3 shadow">
              <h5 className="fw-bold text-dark">Lịch sử đơn hàng</h5>
              <div className="row d-flex">
                <ul class="nav d-flex justify-content-between ps-2">
                  <li class="nav-item w-25">
                    <button className="btn btn-warning w-100 btn-sm">
                      Chờ xác nhận
                    </button>
                  </li>
                  <li class="nav-item w-25">
                    <button className="btn  btn-success w-100 btn-sm">
                      Đã xác nhận
                    </button>
                  </li>
                  <li class="nav-item w-25">
                    <button className="btn btn-secondary w-100 btn-sm ">
                      Đã hủy
                    </button>
                  </li>
                </ul>
                <hr className="my-3" />
              </div>
              <DonHang />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentLichSuDonHang;
