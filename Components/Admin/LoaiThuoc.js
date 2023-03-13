import React, { Fragment } from "react";
import { toast } from "react-toastify";
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
        toast.success("Xóa loại thuốc thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      } else {
        toast.error("Xóa loại thuốc không thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      }
    });
  };
  const chinhSuaLoaiThuocHandler = (data) => {
    // chỉnh sửa thông tin loại thuốc
    fetch(
      `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/loai-thuoc/${data.maLoai}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenLoai: data.tenLoai,
          moTaChung: data.moTaChung,
        }),
      }
    ).then((response) => {
      if (response.ok) {
        toast.success("Chỉnh sửa loại thuốc thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      } else {
        toast.error("Chỉnh sửa loại thuốc không thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
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
            <ModalChinhSuaLoaiThuoc
              loaiThuoc={loaiThuoc}
              chinhSuaLoaiThuoc={chinhSuaLoaiThuocHandler}
            />
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
