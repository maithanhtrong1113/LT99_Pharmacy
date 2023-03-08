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
            <Dropdown
              isOpen={dropdownStates[index]}
              toggle={() => handleDropdownToggle(index)}
            >
              <DropdownToggle caret className="btn btn-sm"></DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={() => handlerInfo(thuoc.maThuoc)}>
                  Xem chi tiết/ Chỉnh Sửa
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <button className="btn btn-sm btn-danger ms-2">Xóa</button>
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export default Thuoc;
