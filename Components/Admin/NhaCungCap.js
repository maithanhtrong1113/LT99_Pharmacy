import React, { Fragment } from "react";
import { chinhSuaNhaCungCap, xoaNhaCungCap } from "@/api/nhaCungCapApi";
import ModalChinhSuaNhaCungCap from "../Modal/ModalChinhSuaNhaCungCap";
import ModalXoaNhaCungCap from "../Modal/ModalXoaNhaCungCap";
import ModalCacLoThuoc from "../Modal/ModalCacLoThuoc";
import xuLyTenKhiQuaDai, { xuLyDiaChiKhiQuaDai } from "../utils/tooLong";

const NhaCungCap = (props) => {
  const xoaNhaCungCapHandler = async (id) => {
    const res = await xoaNhaCungCap(id);
    props.setNhaCungCap(res);
  };
  const chinhSuaNhaCungCapp = async (id) => {
    const res = await chinhSuaNhaCungCap(id);
    props.setNhaCungCap(res);
  };
  return (
    <Fragment>
      {props.nhaCungCap.length === 0 && (
        <tr className="text-dark">
          <td>Không tìm thấy nhà cung cấp</td>
        </tr>
      )}
      {props.nhaCungCap.map((nhaCungCap) => (
        <tr key={nhaCungCap.maNhaCungCap}>
          <td>{nhaCungCap.maNhaCungCap}</td>
          <td>{nhaCungCap.tenNhaCungCap}</td>
          <td>{xuLyDiaChiKhiQuaDai(nhaCungCap.diaChi)}</td>
          <td>{nhaCungCap.soDienThoai}</td>
          <td className="d-flex">
            <ModalCacLoThuoc nhaCungCap={nhaCungCap} />
            <ModalChinhSuaNhaCungCap
              nhaCungCap={nhaCungCap}
              chinhSuaNhaCungCapHandler={chinhSuaNhaCungCapp}
            />
            <ModalXoaNhaCungCap
              nhaCungCap={nhaCungCap}
              handlerSubmit={xoaNhaCungCapHandler}
            />
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export default NhaCungCap;
