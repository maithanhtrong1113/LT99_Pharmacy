import React, { Fragment, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";
import More from "./More";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useRouter } from "next/router";
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
  const handlerDeltete = () => {
    props.Deltete(thuoc.maThuoc);
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
            <button
              className="btn btn-sm btn-danger ms-2"
              onClick={handlerDeltete}
            >
              Xóa
            </button>
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export default Thuoc;
