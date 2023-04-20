import Link from "next/link";
import React from "react";
import { FaAngleRight } from "react-icons/fa";
import VND from "../utils/formatVND";

const DonHang = () => {
  return (
    <div className="row border rounded   mx-2 p-3">
      <div className="col-10 my-2">
        <p>
          <span className="text-muted">Mã đơn hàng: </span>
          <span className="fw-bold">123456</span>
        </p>
        <p>
          <span className="text-muted">Giá trị đơn: </span>
          <span className="fw-bold">{VND.format(123456)}</span>
        </p>
      </div>
      <div className="col-2 d-flex justify-content-center my-2 align-items-center">
        <span className="border rounded-pill bg-danger text-white fs-dh p-2">
          Xác Nhận
        </span>
      </div>
      <hr className="col-12" />
      <div className="col-10"></div>
      <div className="col-2 ">
        <Link
          href={`/donHang/${1}`}
          className="text-decoration-none fst-italic d-flex align-items-center justify-content-center fw-bold fs-dh"
        >
          Xem Chi Tiết
          <FaAngleRight />
        </Link>
      </div>
    </div>
  );
};

export default DonHang;
