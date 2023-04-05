import React, { Fragment } from "react";
import { useRouter } from "next/router";
import ModalXoaThuoc from "../Modal/ModalXoaThuoc";
import { xoaThuoc } from "@/api/thuocApi";
const Thuoc = (props) => {
  const router = useRouter();
  const handlerInfo = (data) => {
    router.push(`thuoc/${data}`);
  };

  const DeleteHandler = async (data) => {
    const res = await xoaThuoc(data);
    props.setDsThuoc(res);
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
          <td>{thuoc.soLuong}</td>
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
