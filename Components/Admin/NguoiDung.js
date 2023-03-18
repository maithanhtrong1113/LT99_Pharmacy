import { authActions } from "@/store/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";

const NguoiDung = () => {
  const [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(authActions.logout());
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
            Mai Thanh Trọng <FaAngleDown />
          </span>
        </button>
        {!isOpen && (
          <div className="container-fluid sub-menu-admin position-absolute bg-white rounded shadow ">
            <div
              className="row p-2 d-flex align-items-center pointer border border-info rounded my-2 mx-1"
              onClick={() => {
                router.push("/me");
              }}
            >
              <div className="col-2">
                <BsPerson className="fs-20 text-info" />
              </div>
              <div className="col-8">
                <Link
                  href="/me"
                  className="text-decoration-none text-info text-center"
                >
                  Hồ sơ cá nhân
                </Link>
              </div>
              <div className="col-2">
                <FaAngleRight className="text-info" />
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
                <button className="btn btn-white w-100 d-flex justify-content-between align-items-center">
                  Đăng xuất
                </button>
              </div>
              <div className="col-2 pointer">
                <FaAngleRight className="text-danger" />
              </div>
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default NguoiDung;
