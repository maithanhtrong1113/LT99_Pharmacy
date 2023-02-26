import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BsPerson, BsInfoCircle, BsLock } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import authApi from "../../api/authApi";
import { FiLock } from "react-icons/fi";

import Link from "next/link";
import { authActions } from "@/store/auth";
const ContentLichSuDonHang = () => {
  const router = useRouter();
  let user = {};
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    authApi.fetchUser().then((res) => {
      user = res.data.user;
      setName(user.name);
      setPhone(user.phone);
      setEmail(user.email);
    });
  }, []);

  const logOutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    router.push("/");
  };
  return (
    <Fragment>
      <div className="container my-10   ">
        <div className="row">
          <div className="col-4  rounded shadow py-3">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <img
                    src="/images/user-profile.jpg"
                    className="img-fluid size-img-profile"
                  />
                </div>
                <div className="col-8">
                  <h4>{name}</h4>
                  <span>{email}</span>
                </div>
              </div>
              <hr />
              <div
                className="row py-3 my-2 link-me  "
                onClick={() => {
                  router.push("/me");
                }}
              >
                <div className="col-1">
                  <BsPerson />
                </div>
                <div className="col-11 ">
                  <Link href="/me" className="text-decoration-none  text-dark ">
                    Thông tin cá nhân
                  </Link>
                </div>
              </div>
              <div
                className="row py-3 my-2 link-me  active"
                onClick={() => {
                  router.push("/doiMatKhau");
                }}
              >
                <div className="col-1">
                  <BsInfoCircle />
                </div>
                <div className="col-11  ">
                  <Link
                    href="/donHang"
                    className="text-decoration-none  text-dark"
                  >
                    Lịch sử đơn hàng
                  </Link>
                </div>
              </div>
              <div
                className="row py-3 my-2 link-me"
                onClick={() => {
                  router.push("/doiMatKhau");
                }}
              >
                <div className="col-1">
                  <FiLock />
                </div>
                <div className="col-11  ">
                  <Link
                    href="/doiMatKhau"
                    className="text-decoration-none  text-dark"
                  >
                    Đổi mật khẩu
                  </Link>
                </div>
              </div>
              <div className="row py-3 my-2 link-me" onClick={logOutHandler}>
                <div className="col-1">
                  <AiOutlineLogout />
                </div>
                <div className="col-11  ">
                  <Link href="/" className="text-decoration-none  text-dark">
                    Đăng xuất
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentLichSuDonHang;
