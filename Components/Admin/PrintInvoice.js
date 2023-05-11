import React, { useState } from "react";
import { useRef } from "react";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

import { useReactToPrint } from "react-to-print";
import VND from "../utils/formatVND";

function PrintInvoice({ dsNhap, tongTienHoaDon }) {
  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });

  return (
    <div>
      <button onClick={generatePDF} type="button">
        In Hoá đơn
      </button>
      {isTableVisible && (
        <table
          className="table table-striped table-bordered table-sm shadow border-rounded "
          ref={componentPDF}
        >
          <thead>
            <tr className="text-center">
              <th>Mã thuốc</th>
              <th>Tên thuốc</th>
              <th>Thuốc kê đơn</th>
              <th>Đơn vị tính</th>
              <th>Số lượng</th>
              <th>Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {dsNhap.map((thuoc) => (
              <tr key={thuoc.thuoc.maThuoc} className="text-center">
                <td className="w-10">{thuoc.thuoc.maThuoc}</td>
                <td className="fw-bold">{thuoc.thuoc.tenThuoc}</td>
                {thuoc.thuoc.isThuocKeDon && (
                  <td>
                    <BsCheck2 className="text-success fs-20  " />
                  </td>
                )}
                {!thuoc.thuoc.isThuocKeDon && (
                  <td className="fw-bold ">
                    <MdOutlineClose className="text-danger fs-27  " />
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
                </td>
                <td className="fw-bold">{VND.format(thuoc.thuoc.thanhTien)}</td>
              </tr>
            ))}
            <tr className="fw-bold">
              <td className="fw-bold">Tổng tiền:</td>
              <td>{VND.format(tongTienHoaDon)}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PrintInvoice;
