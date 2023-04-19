import React, { Fragment } from "react";
import { useRouter } from "next/router";
import ModalXoaThuoc from "../Modal/ModalXoaThuoc";
import { xoaThuoc } from "@/api/thuocApi";
import { MdOutlineClose } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";
import ModalXemThuoc from "../Modal/ModalXemThuoc";
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
          <td>
            {thuoc.isThuocKeDon === true ? (
              <BsCheck2 className="text-success fs-20" />
            ) : (
              <MdOutlineClose className="text-danger fs-20" />
            )}
          </td>
          <td>{thuoc.congDung}</td>
          <td>{thuoc.soLuong}</td>
          <td>{thuoc.loaiThuoc.tenLoai}</td>
          <td className="d-flex">
           <ModalXemThuoc thuoc={thuoc}/>
            <button
              className="btn btn-sm btn-warning ms-2"
              onClick={() => handlerInfo(thuoc.maThuoc)}
            >
              Chỉnh sửa
            </button>
            <ModalXoaThuoc maThuoc={thuoc.maThuoc} OnClickYes={DeleteHandler} />
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export default Thuoc;
