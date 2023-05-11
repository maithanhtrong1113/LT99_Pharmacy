import Image from "next/image";
import React, { Fragment, useState } from "react";
import { useRef } from "react";
import {
  AiFillCloseCircle,
  AiOutlineMinusCircle,
  AiOutlinePrinter,
} from "react-icons/ai";
import {
  BsCheck2,
  BsFillCartCheckFill,
  BsFillPlusCircleFill,
  BsTrash,
} from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import VND from "../utils/formatVND";

const HoaDonKhongKeDon = ({
  dsNhap1,
  setDsNhap1,
  tongTienHoaDon1,
  khachHangCoSan,
  showIn1,
}) => {
  const removeThuocNhap = (maThuoc) => {
    const isThuocExist = dsNhap1.find((item) => item.thuoc.maThuoc === maThuoc);
    if (isThuocExist.thuoc.soLuongBan === 1) {
      setDsNhap1(dsNhap1.filter((item) => item.thuoc.maThuoc !== maThuoc));
    } else {
      isThuocExist.thuoc.soLuongBan--;
      console.log(isThuocExist.thuoc.soLuongBan);
      isThuocExist.thuoc.thanhTien =
        isThuocExist.giaBanLe * isThuocExist.thuoc.soLuongBan;

      setDsNhap1([...dsNhap1]);
    }
  };
  const removeThuoc = (maThuoc) => {
    setDsNhap1(dsNhap1.filter((item) => item.thuoc.maThuoc !== maThuoc));
  };
  const removeALL = () => {
    setDsNhap1([]);
  };
  const addThuocNhap = (maThuoc) => {
    const isThuocExist = dsNhap1.find((item) => item.thuoc.maThuoc === maThuoc);
    isThuocExist.thuoc.soLuongBan++;

    if (isThuocExist.thuoc.soLuongBan > isThuocExist.thuoc.soLuong)
      isThuocExist.thuoc.soLuongBan = isThuocExist.thuoc.soLuong;
    isThuocExist.thuoc.thanhTien =
      isThuocExist.giaBanLe * isThuocExist.thuoc.soLuongBan;
    setDsNhap1([...dsNhap1]);
  };

  const NhapSoLuong = (maThuoc, soLuongBan) => {
    const isThuocExist = dsNhap1.find((item) => item.thuoc.maThuoc === maThuoc);
    isThuocExist.thuoc.soLuongBan = parseInt(soLuongBan);
    if (isThuocExist.thuoc.soLuongBan > isThuocExist.thuoc.soLuong)
      isThuocExist.thuoc.soLuongBan = isThuocExist.thuoc.soLuong;
    isThuocExist.thuoc.thanhTien =
      isThuocExist.giaBanLe * isThuocExist.thuoc.soLuongBan;
    setDsNhap1([...dsNhap1]);
  };
  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });
  return (
    <Fragment>
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-between my-1 align-items-center">
            <span className="fst-italic text-info ">
              Danh sách thuốc khách hàng mua
            </span>
            {dsNhap1.length !== 0 && (
              <button
                className="btn btn-danger"
                type="button"
                onClick={removeALL}
              >
                <BsTrash className="fs-16" />
              </button>
            )}
          </div>
          <div ref={componentPDF}>
            <div className="container hide">
              <div className="row">
                <div className="col-6">
                  <Image
                    src="/images/logo.png"
                    className="img-fluid rounded mx-5 my-2 "
                    width={100}
                    height={100}
                    priority
                    alt=""
                  />
                </div>
                <div className="col-6 mt-4">
                  <b>Loại Hóa đơn:</b> Hóa đơn không kê đơn
                  <br />
                  <b>Ngày: </b>
                  {new Date().toLocaleDateString("vi-VN")}
                  {`      ${new Date()
                    .getHours()
                    .toString()
                    .padStart(2, "0")}: ${new Date()
                    .getMinutes()
                    .toString()
                    .padStart(2, "0")}: ${new Date()
                    .getSeconds()
                    .toString()
                    .padStart(2, "0")} `}
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <b>Tên khách hàng</b>
                </div>
                <div className="col-6">{khachHangCoSan.hoTen}</div>
              </div>
              <div className="row">
                <div className="col-6">
                  <b>Số điện thoại</b>
                </div>
                <div className="col-6">{khachHangCoSan.soDienThoai}</div>
              </div>
              <div className="row">
                <div className="col-6">
                  <b>Nhân viên bán hàng</b>
                </div>
                <div className="col-6">
                  {localStorage.getItem("tenNhanVien")}
                </div>
              </div>
            </div>
            <table className="table table-striped table-bordered table-sm shadow border-rounded">
              <thead>
                <tr className="text-center">
                  <th>Mã thuốc</th>
                  <th>Tên thuốc</th>
                  <th>Thuốc kê đơn</th>
                  <th>Đơn vị tính</th>
                  <th>Số lượng</th>
                  <th>Thành tiền</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {dsNhap1.map((thuoc) => (
                  <tr key={thuoc.thuoc.maThuoc} className="text-center">
                    <td>{thuoc.thuoc.maThuoc}</td>
                    <td className="fw-bold">{thuoc.thuoc.tenThuoc}</td>
                    {thuoc.thuoc.isThuocKeDon && (
                      <td>
                        <BsCheck2 className="text-success fs-20 mt-3 " />
                      </td>
                    )}
                    {!thuoc.thuoc.isThuocKeDon && (
                      <td className="fw-bold ">
                        <MdOutlineClose className="text-danger fs-27 mt-3 " />
                      </td>
                    )}

                    <td>{thuoc.thuoc.donViTinh}</td>
                    <td className="w-10">
                      <input
                        type="number"
                        value={thuoc.thuoc.soLuongBan}
                        min={1}
                        onChange={(e) => {
                          if (e.target.value <= 0 || e.target.value === "") {
                            e.target.value = 1;
                          }
                          NhapSoLuong(thuoc.thuoc.maThuoc, e.target.value);
                        }}
                        className="fw-bold form-control text-center"
                      />
                      <span className=" text-muted print-hide">{`Tồn: ${thuoc.thuoc.soLuong}`}</span>
                    </td>
                    <td className="fw-bold">
                      {VND.format(thuoc.thuoc.thanhTien)}
                    </td>
                    <td className="print-hide">
                      <button
                        type="button"
                        className="btn btn-sm btn-warning mx-2 px-2 mt-3 shadow"
                        onClick={() => removeThuocNhap(thuoc.thuoc.maThuoc)}
                      >
                        <AiOutlineMinusCircle className="text-white" />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-info mx-2 mt-3 shadow"
                        onClick={() => addThuocNhap(thuoc.thuoc.maThuoc)}
                      >
                        <BsFillPlusCircleFill className="text-white " />
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger mx-2 mt-3 shadow"
                        onClick={() => removeThuoc(thuoc.thuoc.maThuoc)}
                      >
                        <AiFillCloseCircle className="text-white " />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="fw-bold">Tổng tiền:</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="fw-bold">{VND.format(tongTienHoaDon1)} </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {dsNhap1.length !== 0 && (
        <div className="d-flex">
          <div className="col-3 mb-3">
            <button
              className="btn btn-primary d-flex align-items-center"
              type="Submit"
            >
              <BsFillCartCheckFill className="fs-5 me-2" />
              Tạo Hóa Đơn
            </button>
          </div>
          {showIn1 && (
            <div className="col-3 mb-3 ">
              <button
                onClick={generatePDF}
                type="button"
                className="btn btn-secondary"
              >
                <AiOutlinePrinter className="fs-5 me-2" /> In Hoá đơn
              </button>
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default HoaDonKhongKeDon;
