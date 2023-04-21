import { authActions } from "@/store/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineLogout, AiOutlineUnlock } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import ModalChangePass from "../Modal/ModalChangePass";

const NguoiDung = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(authActions.logout());
    router.push("/signin");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    toggle();
  };

  return (
    <Fragment>
      <div className="container d-flex justify-content-end rounded border shadow mb-4 position-relative ">
        <button className="btn" onClick={toggle}>
          <Image
            src="/images/user-profile.jpg"
            className="img-profile me-2"
            width={100}
            height={100}
            alt=""
          />
          <span>
            {/* Xin chào: <b>{localStorage.getItem("tenNhanVien")}</b> */}
            <FaAngleDown />
          </span>
        </button>
        {!isOpen && (
          <div className="container-fluid sub-menu-admin position-absolute bg-white rounded shadow ">
            <div className="row p-2 d-flex align-items-center pointer border border-info rounded my-2 mx-1">
              <div className="col-2">
                <BsPerson className="fs-20 text-info" />
              </div>
              <div className="col-8">
                <button className="btn btn-sm btn-white w-100 text-start fw-bold text-info">
                  Cập nhập thông tin cá nhân
                </button>
              </div>
              <div className="col-2">
                <FaAngleRight className="text-info fs-20" />
              </div>
            </div>
            <div className="row p-2 d-flex align-items-center  border border-warning rounded my-2 mx-1">
              <div className="col-2 pointer">
                <AiOutlineUnlock className="fs-20 text-warning" />
              </div>
              <div className="col-8">
                <ModalChangePass />
              </div>
              <div className="col-2 pointer">
                <FaAngleRight className="text-warning fs-20" />
              </div>
            </div>
            <div
              className="row p-2 d-flex align-items-center  border border-danger rounded my-2 mx-1"
              onClick={logOutHandler}
            >
              <div className="col-2 pointer">
                <AiOutlineLogout className="fs-20 text-danger" />
              </div>
              <div className="col-8">
                <button className="fw-bold text-danger btn btn-white w-100 d-flex justify-content-between align-items-center">
                  Đăng xuất
                </button>
              </div>
              <div className="col-2 pointer">
                <FaAngleRight className="text-danger fs-20" />
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default NguoiDung;
