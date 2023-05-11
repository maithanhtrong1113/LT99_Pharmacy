import React, { Fragment } from "react";
import { useRouter } from "next/router";
import ModalXoaThuoc from "../Modal/ModalXoaThuoc";
import { xoaThuoc } from "@/api/thuocApi";
import { MdOutlineClose } from "react-icons/md";
import { BsCheck2 } from "react-icons/bs";
import ModalXemThuoc from "../Modal/ModalXemThuoc";
import xuLyTenKhiQuaDai, { xuLyDiaChiKhiQuaDai } from "../utils/tooLong";
import { useSelector } from "react-redux";
const Thuoc = (props) => {
  const router = useRouter();
  const handlerInfo = (data) => {
    router.push(`thuoc/${data}`);
  };

  const DeleteHandler = async (data) => {
    const res = await xoaThuoc(data);
    props.setTotal(Math.ceil(res.length / 12));
    if (Math.ceil(res.length / 12) < props.page) {
      props.setPage(Math.ceil(res.length / 12));
    }
    props.setDsThuoc(props.getItems(res, props.page));
  };
  const role = useSelector((state) => state.auth.role);

  return (
    <Fragment>
      {props.dsThuoc.length === 0 && (
        <tr className="text-dark">
          <td>Không tìm thấy thuốc</td>
        </tr>
      )}
      {props.dsThuoc.map((thuoc) => (
        <tr key={thuoc.thuoc.maThuoc}>
          <th scope="row">{thuoc.thuoc.maThuoc}</th>
          <td>{xuLyDiaChiKhiQuaDai(thuoc.thuoc.tenThuoc)}</td>
          <td>
            {thuoc.thuoc.isThuocKeDon === true ? (
              <BsCheck2 className="text-success fs-20" />
            ) : (
              <MdOutlineClose className="text-danger fs-20" />
            )}
          </td>
          <td>{thuoc.thuoc.loaiThuoc.tenLoai}</td>
          <td>{thuoc.thuoc.soLuong}</td>

          <td className="d-flex">
            <ModalXemThuoc thuoc={thuoc.thuoc} />
            {role === 1 && (
              <button
                className="btn btn-sm btn-warning ms-2"
                onClick={() => handlerInfo(thuoc.thuoc.maThuoc)}
              >
                Chỉnh sửa
              </button>
            )}
            {role == 1 && (
              <ModalXoaThuoc
                maThuoc={thuoc.thuoc.maThuoc}
                OnClickYes={DeleteHandler}
              />
            )}
          </td>
        </tr>
      ))}
    </Fragment>
  );
};

export default Thuoc;
