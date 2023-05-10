import React, { Fragment } from "react";
import ModalChinhSuaNuocSanXuat from "../Modal/ModalChinhSuaNuocSanXuat";
import { chinhSuaNuocSanXuat, xoaNuocSanXuat } from "@/api/nuocSanXuatApi";
import ModalXoaNuocSanXuat from "../Modal/ModalXoaNuocSanXuat";

const NuocSanXuat = (props) => {
  const xoaNuocSanXuatHandler = async (id) => {
    const res = await xoaNuocSanXuat(id);
    props.setNuocSanXuat(res);
  };
  const chinhSuaNuocSanXuatt = async (id) => {
    const res = await chinhSuaNuocSanXuat(id);
    props.setNuocSanXuat(res);
  };
  return (
    <Fragment>
      {props.nuocSanXuat.length === 0 && (
        <tr className="text-dark">
          <td>Không tìm thấy nơi sản xuất</td>
        </tr>
      )}
      {props.nuocSanXuat.map((nuocSanXuat) => (
        <tr key={nuocSanXuat.maNuoc}>
          <td>{nuocSanXuat.maNuoc}</td>
          <td>{nuocSanXuat.tenNuoc}</td>
          <td className="d-flex">
            <ModalChinhSuaNuocSanXuat
              nuocSanXuat={nuocSanXuat}
              chinhSuaNuocSanXuatHandler={chinhSuaNuocSanXuatt}
            />
            <ModalXoaNuocSanXuat
              nuocSanXuat={nuocSanXuat}
              handlerSubmit={xoaNuocSanXuatHandler}
            />
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export default NuocSanXuat;
