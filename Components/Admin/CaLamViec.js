import { chinhSuaCaLamViec, xoaCaLamViec } from "@/api/caLamViecApi";
import React, { Fragment } from "react";
import ModalChinhSuaCaLamViec from "../Modal/ModalChinhSuaCaLamViec";
import ModalXoaCaLamViec from "../Modal/ModalXoaCaLamViec";

const LoaiThuoc = (props) => {
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
      {props.caLamViec.length === 0 && (
        <tr className="text-dark">
          <td>Không tìm thấy ca làm việc</td>
        </tr>
      )}
      {props.caLamViec.map((caLamViec) => (
        <tr key={caLamViec.maCaLam}>
          <td>{caLamViec.maCaLam}</td>
          <td>{caLamViec.tenCa}</td>
          <td>{caLamViec.soGioLam}</td>
          <td className="d-flex">
            <ModalChinhSuaCaLamViec
              caLamViec={caLamViec}
              chinhSuaCaLamViecHandler={chinhSuaCaLamViecc}
            />
            <ModalXoaCaLamViec
              caLamViec={caLamViec}
              handlerSubmit={xoaCaLamViecHandler}
            />
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export default LoaiThuoc;
