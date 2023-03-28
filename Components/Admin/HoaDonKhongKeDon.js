import React, { Fragment, useState } from "react";
import { AiFillCloseCircle, AiOutlineMinusCircle } from "react-icons/ai";
import {
  BsCheck2,
  BsFillCartCheckFill,
  BsFillPlusCircleFill,
  BsTrash,
} from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

const HoaDonKhongKeDon = ({ dsNhap1, setDsNhap1 }) => {
  const removeThuocNhap = (maThuoc) => {
    const isThuocExist = dsNhap1.find((item) => item.maThuoc === maThuoc);
    if (isThuocExist.soLuongBan === 1) {
      setDsNhap1(dsNhap1.filter((item) => item.maThuoc !== maThuoc));
    } else {
      isThuocExist.soLuongBan--;
      setDsNhap1([...dsNhap1]);
    }
  };
  const removeThuoc = (maThuoc) => {
    setDsNhap1(dsNhap1.filter((item) => item.maThuoc !== maThuoc));
  };
  const removeALL = () => {
    setDsNhap1([]);
  };
  const addThuocNhap = (maThuoc) => {
    const isThuocExist = dsNhap1.find((item) => item.maThuoc === maThuoc);
    isThuocExist.soLuongBan++;
    if (isThuocExist.soLuongBan > isThuocExist.soLuong)
      isThuocExist.soLuongBan = isThuocExist.soLuong;
    setDsNhap1([...dsNhap1]);
  };
  const NhapSoLuong = (maThuoc, soLuongBan) => {
    const isThuocExist = dsNhap1.find((item) => item.maThuoc === maThuoc);
    isThuocExist.soLuongBan = parseInt(soLuongBan);
    if (isThuocExist.soLuongBan > isThuocExist.soLuong)
      isThuocExist.soLuongBan = isThuocExist.soLuong;
    setDsNhap1([...dsNhap1]);
  };
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
          <table className="table table-striped table-bordered table-sm shadow border-rounded">
            <thead>
              <tr className="text-center">
                <th>Mã thuốc</th>
                <th>Tên thuốc</th>
                <th>Số lượng</th>
                <th>Đơn vị tính</th>
                <th>Liều lượng</th>
                <th>Thuốc kê đơn</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {dsNhap1.map((thuoc) => (
                <tr key={thuoc.maThuoc} className="text-center">
                  <td>{thuoc.maThuoc}</td>
                  <td>{thuoc.tenThuoc}</td>
                  <td className="w-10 ">
                    <input
                      type="number"
                      value={thuoc.soLuongBan}
                      min={1}
                      onChange={(e) => {
                        if (e.target.value <= 0 || e.target.value === "") {
                          e.target.value = 1;
                        }
                        NhapSoLuong(thuoc.maThuoc, e.target.value);
                      }}
                      className="fw-bold form-control text-center"
                    />
                    <span className=" text-muted">{`Tồn: ${thuoc.soLuong}`}</span>
                  </td>

                  <td>{thuoc.donViTinh}</td>
                  <td>{thuoc.lieuLuong}</td>
                  {thuoc.isThuocKeDon && (
                    <td>
                      <BsCheck2 className="text-success fs-20 mt-3 " />
                    </td>
                  )}
                  {!thuoc.isThuocKeDon && (
                    <td className="fw-bold ">
                      <MdOutlineClose className="text-danger fs-27 mt-3 " />
                    </td>
                  )}
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-warning mx-2 px-2 mt-3 shadow"
                      onClick={() => removeThuocNhap(thuoc.maThuoc)}
                    >
                      <AiOutlineMinusCircle className="text-white" />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-info mx-2 mt-3 shadow"
                      onClick={() => addThuocNhap(thuoc.maThuoc)}
                    >
                      <BsFillPlusCircleFill className="text-white " />
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger mx-2 mt-3 shadow"
                      onClick={() => removeThuoc(thuoc.maThuoc)}
                    >
                      <AiFillCloseCircle className="text-white " />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {dsNhap1.length !== 0 && (
        <div className="col-3 mb-3">
          <button
            className="btn btn-primary d-flex align-items-center"
            type="Submit"
          >
            <BsFillCartCheckFill className="fs-5 me-2" />
            Tạo Hóa Đơn
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default HoaDonKhongKeDon;
