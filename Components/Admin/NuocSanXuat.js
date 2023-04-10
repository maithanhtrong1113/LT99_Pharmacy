import { chinhSuaCaLamViec, xoaCaLamViec } from "@/api/caLamViecApi";
import React, { Fragment } from "react";
import ModalChinhSuaCaLamViec from "../Modal/ModalChinhSuaCaLamViec";
import ModalXoaCaLamViec from "../Modal/ModalXoaCaLamViec";

const NuocSanXuat = (props) => {
  const xoaCaLamViecHandler = async (id) => {
    const res = await xoaCaLamViec(id);
    props.setCaLamViec(res);
  };
  const chinhSuaCaLamViecc = async (id) => {
    const res = await chinhSuaCaLamViec(id);
    props.setCaLamViec(res);
  };
  return (
    <Fragment>
      {props.nuocSanXuat.length === 0 && (
        <tr className="text-dark">
          <td>Không tìm thấy nước sản xuất</td>
        </tr>
      )}
      {props.nuocSanXuat.map((nuocSanXuat) => (
        <tr key={nuocSanXuat.maNuoc}>
          <td>{nuocSanXuat.maNuoc}</td>
          <td>{nuocSanXuat.tenNuoc}</td>
          <td className="d-flex">
            {/* <ModalChinhSuaCaLamViec
              nuocSanXuat={nuocSanXuat}
              chinhSuaCaLamViecHandler={chinhSuaCaLamViecc}
            />
            <ModalXoaCaLamViec
              caLamViec={caLamViec}
              handlerSubmit={xoaCaLamViecHandler}
            /> */}
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export default NuocSanXuat;
