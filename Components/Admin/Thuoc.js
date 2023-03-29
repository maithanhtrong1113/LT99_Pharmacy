import React, { Fragment } from "react";
import { useRouter } from "next/router";
import ModalXoaThuoc from "../Modal/ModalXoaThuoc";
import { toast } from "react-toastify";
const Thuoc = (props) => {
  const router = useRouter();
  const handlerInfo = (data) => {
    router.push(`thuoc/${data}`);
  };

  const DeleteHandler = (data) => {
    fetch(
      `  http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/thuoc/${data}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      if (response.ok) {
        toast.success("Xóa thuốc thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      } else {
        toast.error("Xóa thuốc không thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      }
    });
  };

  return (
    <Fragment>
      {props.dsThuoc.length === 0 && (
        <tr className="text-dark">
          <td>Không tìm thấy thuốc</td>
        </tr>
      )}
      {props.dsThuoc.map((thuoc) => (
        <tr key={thuoc.maThuoc}>
          <th scope="row">{thuoc.maThuoc}</th>
          <td>{thuoc.tenThuoc}</td>
          <td>{thuoc.lieuLuong}</td>
          <td>{thuoc.congDung}</td>
          <td>{thuoc.donViTinh}</td>

          <td>{thuoc.loaiThuoc.tenLoai}</td>
          <td className="d-flex">
            <button
              className="btn btn-sm btn-info ms-2"
              onClick={() => handlerInfo(thuoc.maThuoc)}
            >
              Xem chi tiết
            </button>
            <ModalXoaThuoc maThuoc={thuoc.maThuoc} OnClickYes={DeleteHandler} />
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export default Thuoc;
