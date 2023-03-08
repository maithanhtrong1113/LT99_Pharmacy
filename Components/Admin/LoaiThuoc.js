import React, { Fragment } from "react";
import ModalChinhSuaLoaiThuoc from "../Modal/ModalChinhSuaLoaiThuoc";
import ModalXemLoaiThuoc from "../Modal/ModalXemLoaiThuoc";
import ModalXoaLoaiThuoc from "../Modal/ModalXoaLoaiThuoc";

const LoaiThuoc = (props) => {
  const xoaLoaiThuoc = (data) => {
    //xóa loại thuốc
    fetch(
      `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/loai-thuoc/${data}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        console.log("Loại thuốc đã được xóa thành công!");
      } else {
        console.error("Có lỗi xảy ra khi xóa loại thuốc!");
      }
    });
  };
  let count = 1;
  return (
    <Fragment>
      {props.loaiThuoc.map((loaiThuoc) => (
        <tr key={loaiThuoc.maLoai}>
          <td>{count++}</td>
          <td>{loaiThuoc.tenLoai}</td>
          <td>{loaiThuoc.moTaChung}</td>
          <td className="d-flex">
            <ModalXemLoaiThuoc loaiThuocId={loaiThuoc.maLoai} />
            <ModalChinhSuaLoaiThuoc loaiThuoc={loaiThuoc} />
            <ModalXoaLoaiThuoc
              loaiThuoc={loaiThuoc}
              handlerSubmit={xoaLoaiThuoc}
            />
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export default LoaiThuoc;
