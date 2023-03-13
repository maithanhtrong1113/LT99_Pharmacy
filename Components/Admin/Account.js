import Link from "next/link";
import React, { Fragment, useState } from "react";
import { AiOutlineMore } from "react-icons/ai";

const Account = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isOpenTrangThai, setIsOpenTrangThai] = useState(true);
  const [isOpenVaiTro, setIsOpenVaiTro] = useState(true);
  const toggleTrangThai = () => setIsOpenTrangThai(!isOpenTrangThai);
  const toggleVaiTro = () => setIsOpenVaiTro(!isOpenVaiTro);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <Fragment>
      <tr className="position-relative">
        <th scope="row">{props.stt}</th>
        <td>maithanhtrong1113@gmail.com</td>
        <td>
          {props.active && (
            <button className="btn btn-success btn-sm me-2">
              Đang hoạt động
            </button>
          )}
          {!props.active && (
            <button className="btn btn-danger btn-sm me-2 ">Vô hiệu hóa</button>
          )}
        </td>
        <td>
          {props.vaiTro === "nhanVien" && (
            <button className="btn btn-warning btn-sm me-2">Nhân viên</button>
          )}

          {props.vaiTro === "quanLy" && (
            <button className="btn btn-primary btn-sm me-2">Quản lý</button>
          )}
        </td>
        <td>
          <button className="btn" onClick={toggle}>
            <AiOutlineMore />
          </button>
          {!isOpen && (
            <div className="position-absolute localMorePerson">
              <div className="container bg-white rounded">
                <div className="row p-1 rounded shadow border">
                  <div className="col-12 my-2">
                    <button className="btn btn-sm btn-secondary  w-100">
                      Xem chi tiết
                    </button>
                  </div>
                  <div className="col-12 my-2">
                    <button
                      className="btn btn-sm btn-secondary w-100"
                      onClick={toggleVaiTro}
                    >
                      Cập nhập vai trò
                    </button>
                  </div>
                  <div className="col-12 my-2">
                    <button
                      className="btn btn-sm btn-secondary w-100"
                      onClick={toggleTrangThai}
                    >
                      Cập nhập trạng thái
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!isOpenVaiTro && !isOpen && (
            <div className="container position-absolute localVaiTro bg-light rounded shadow border">
              <div className="row">
                <div className="col-12 my-2">
                  <button className="btn btn-sm btn-warning my-1 w-100">
                    Nhân viên
                  </button>
                </div>
                <div className="col-12">
                  <button className="btn btn-sm btn-info my-1 w-100">
                    Khách hàng
                  </button>
                </div>
                <div className="col-12">
                  <button className="btn btn-sm btn-primary my-1 w-100">
                    Quản lí
                  </button>
                </div>
              </div>
            </div>
          )}
          {!isOpenTrangThai && !isOpen && (
            <div className="container position-absolute localTrangThai bg-light rounded shadow border">
              <div className="row">
                <div className="col-12 my-2">
                  <button className="btn btn-sm btn-success my-1 w-100">
                    Đang hoạt động
                  </button>
                </div>
                <div className="col-12">
                  <button className="btn btn-sm btn-danger   my-1 w-100">
                    Vô hiệu hóa
                  </button>
                </div>
              </div>
            </div>
          )}
        </td>
      </tr>
    </Fragment>
  );
};

export default Account;
