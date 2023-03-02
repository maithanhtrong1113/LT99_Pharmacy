import React, { Fragment, useState } from "react";

import {
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
  FaThList,
  FaAngleDown,
  FaAngleRight,
} from "react-icons/fa";

import "bootstrap/dist/css/bootstrap.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Image from "next/image";
import { AiOutlineUnorderedList } from "react-icons/ai";
const Navigation = () => {
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const [isOpen, setIsOpen] = useState(true);
  const [isOpen1, setIsOpen1] = useState(true);
  const toggle1 = () => setIsOpen1(!isOpen1);
  const router = useRouter();
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const logOutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    toggle1();
  };
  return (
    <Fragment>
      <div className="container-fluid bg-info fixed-top shadow">
        <div className="row align-items-center py-3">
          <div className="col-lg-1  d-block">
            <Link href="/">
              <Image
                src="/images/logo.png"
                className="img-fluid rounded"
                width={100}
                height={100}
                alt=""
              />
            </Link>
          </div>
          <div className="col-lg-2 col-2 position-relative">
            <div
              className="btn border w-100 d-flex justify-content-evenly align-items-center bg-white "
              onClick={toggle}
            >
              <FaThList className="text-dark" />
              <span className="text-decoration-none"> Danh Mục</span>
              <FaAngleDown />
            </div>
          </div>
          {!isOpen && (
            <div className="container position-absolute localDanhMuc">
              <div className="arrow-up"></div>
              <div
                className="flex-shrink-0 p-3  border rounded bg-white"
                style={{ width: "300px" }}
              >
                <ul className="list-unstyled ps-0 ">
                  <li className="mb-1">
                    <Link href="/listProduct">
                      <button className="btn btn-toggle  rounded ">
                        Dược phẩm
                      </button>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href="/">
                      <button className="btn btn-toggle  rounded ">
                        Chăm sóc sức khỏe
                      </button>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href="/">
                      <button className="btn btn-toggle rounded ">
                        Chăm sóc cá nhân
                      </button>
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href="/">
                      <button className="btn btn-toggle rounded ">
                        Thực phẩm chức năng
                      </button>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
          <div className="col-lg-6 col-6">
            <form action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control mx-2 rounded"
                  placeholder="Bạn đang muốn tìm gì..."
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-white text-info pointer px-2  py-2 pointer text-dark">
                    <FaSearch size="1em" className="me-2" />
                    Tìm Kiếm
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-3 col-3 d-flex justify-content-evenly ">
            {!isAuth && (
              <Link
                href="/signin"
                className="btn border-none bg-white d-flex align-items-center "
              >
                <FaUserCircle className="text-dark  me-2" />
                <span className="text-decoration-none text-dark ">
                  {" "}
                  Đăng nhập/ Đăng ký
                </span>
              </Link>
            )}
            {isAuth && (
              <div
                className="profile-user position-relative pointer bg-white px-2 py-1 rounded d-flex align-items-center"
                onClick={toggle1}
              >
                <Image
                  src="/images/anh-dai-dien.jpg"
                  className="img-fluid size-img-profile rounded-circle me-2"
                  alt=""
                  width={100}
                  height={100}
                />
                <span className="text-dark">Mai Thanh Trọng</span>
              </div>
            )}
            {!isOpen1 && (
              <div className="container-fluid sub-menu position-absolute bg-white rounded shadow ">
                <div
                  className="row p-2 d-flex align-items-center pointer"
                  onClick={() => {
                    router.push("/me");
                  }}
                >
                  <div className="col-2">
                    <Image
                      src="/images/profile.png "
                      className="bg-gray rounded-circle img-profile"
                      alt=""
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="col-8">
                    <Link
                      href="/me"
                      className="text-decoration-none text-dark text-center"
                    >
                      Hồ sơ cá nhân
                    </Link>
                  </div>
                  <div className="col-2">
                    <FaAngleRight />
                  </div>
                </div>
                <div
                  className="row p-2 d-flex align-items-center pointer"
                  onClick={() => {
                    router.push("/admin");
                  }}
                >
                  <div className="col-2">
                    <MdOutlineAdminPanelSettings className="fs-30 bg-gray rounded-circle " />
                  </div>
                  <div className="col-8">
                    <Link
                      href="/admin"
                      className="text-decoration-none text-dark text-center"
                    >
                      Quản lí
                    </Link>
                  </div>
                  <div className="col-2">
                    <FaAngleRight />
                  </div>
                </div>

                <div
                  className="row p-2 d-flex align-items-center"
                  onClick={logOutHandler}
                >
                  <div className="col-2 pointer">
                    <Image
                      src="/images/logout.png "
                      className="bg-gray rounded-circle img-profile"
                      width={100}
                      height={100}
                      alt=""
                    />
                  </div>
                  <div className="col-8">
                    <button className="btn btn-white w-100 d-flex justify-content-between align-items-center">
                      Đăng xuất
                    </button>
                  </div>
                  <div className="col-2 pointer">
                    <FaAngleRight />
                  </div>
                </div>
              </div>
            )}
            <Link
              href="/cart"
              className="btn d-flex align-items-center border-none text-white bg-white position-relative px-3"
            >
              <FaShoppingCart className="text-dark" />
              <span className="px-1  text-white position-absolute localCart  bg-cart">
                {cartQuantity}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Navigation;
