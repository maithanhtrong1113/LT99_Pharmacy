import React, { Fragment, useEffect, useState } from "react";

import { useRouter } from "next/router";
import ModalXoaThuoc from "../Modal/ModalXoaThuoc";
const Thuoc = (props) => {
  const [dropdownStates, setDropdownStates] = useState(
    props.dsThuoc.map((thuoc) => false)
  );

  const handleDropdownToggle = (index) => {
    setDropdownStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  let count = 1;
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
        console.log("thuốc đã được xóa thành công!");
      } else {
        console.error("Có lỗi xảy ra khi  xóa thuốc!");
      }
    });
  };

  return (
    <Fragment>
      {props.dsThuoc.map((thuoc, index) => (
        <tr key={thuoc.maThuoc}>
          <th scope="row">{count++}</th>
          <td>{thuoc.tenThuoc}</td>
          <td>{thuoc.lieuLuong}</td>
          <td>{thuoc.congDung}</td>
          <td>{thuoc.donViTinh}</td>
          <td>{thuoc.soLuong}</td>
          <td>{thuoc.loaiThuoc.tenLoai}</td>
          <td className="d-flex">
            <button
              className="btn btn-sm btn-info ms-2"
              onClick={() => handlerInfo(thuoc.maThuoc)}
            >
              Chỉnh sửa/ Xem chi tiết
            </button>
            <ModalXoaThuoc maThuoc={thuoc.maThuoc} OnClickYes={DeleteHandler} />
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export default Thuoc;
