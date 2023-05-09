import React, { Fragment } from "react";

import ModalChinhSuaLoaiThuoc from "../Modal/ModalChinhSuaLoaiThuoc";
import ModalXemLoaiThuoc from "../Modal/ModalXemLoaiThuoc";
import ModalXoaLoaiThuoc from "../Modal/ModalXoaLoaiThuoc";
import { chinhSuaThuoc, xoaLoaiThuoc } from "@/api/loaiThuocApi";
import { xuLyDiaChiKhiQuaDai } from "../utils/tooLong";

const LoaiThuoc = (props) => {
  const xoaLoaiThuochanler = async (id) => {
    const res = await xoaLoaiThuoc(id);
    props.setLoaiThuoc(res);
  };
  const chinhSuaLoaiThuocHandler = async (id) => {
    const res = await chinhSuaThuoc(id);
    props.setLoaiThuoc(res);
  };
  return (
    <Fragment>
      {props.loaiThuoc.length === 0 && (
        <tr className="text-dark">
          <td>Không tìm thấy loại thuốc</td>
        </tr>
      )}
      {props.loaiThuoc.map((loaiThuoc) => (
        <tr key={loaiThuoc.maLoai}>
          <td>{loaiThuoc.maLoai}</td>
          <td>{loaiThuoc.tenLoai}</td>
          <td>{xuLyDiaChiKhiQuaDai(loaiThuoc.moTaChung)}</td>
          <td className="d-flex">
            <ModalXemLoaiThuoc loaiThuoc={loaiThuoc} />
            <ModalChinhSuaLoaiThuoc
              loaiThuoc={loaiThuoc}
              chinhSuaLoaiThuoc={chinhSuaLoaiThuocHandler}
            />
            <ModalXoaLoaiThuoc
              loaiThuoc={loaiThuoc}
              handlerSubmit={xoaLoaiThuochanler}
            />
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export default LoaiThuoc;
