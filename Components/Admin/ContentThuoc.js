import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { FaAngleRight, FaMoneyBillAlt } from "react-icons/fa";
import { MdArrowBackIos, MdManageAccounts } from "react-icons/md";
import { useDispatch } from "react-redux";
import Account from "./Account";
import Thuoc from "./Thuoc";
const ContentThuoc = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
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
      <div className="container-fluid ">
        <div className="row d-flex">
          <div className="col-2 p-2 bg-dark shadow position-relative ">
            <Link href="/">
              <Image
                src="/images/logo.png"
                className="img-fluid rounded mx-5 my-2"
                width={100}
                height={100}
                alt=""
              />
            </Link>

            <hr className="text-white" />
            <ul className="list-unstyled vh-100 navbarSideLiHover">
              <li className=" rounded mb-2">
                <button
                  className="btn btn-toggle rounded collapsed w-100 text-white d-flex align-items-center   "
                  data-bs-toggle="collapse"
                  data-bs-target="#home-collapse"
                >
                  <MdManageAccounts className="text-white me-2" /> Quản lý tài
                  khoản
                </button>
              </li>
              <div className="collapse" id="home-collapse">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1  small ">
                  <li className="nav-item p-2  ms-3">
                    <Link
                      href="/admin"
                      className="rounded text-decoration-none text-white"
                    >
                      Tài khoản nhân viên
                    </Link>
                  </li>
                  <li className="nav-item  p-2  ms-3 ">
                    <Link
                      href="/admin"
                      className=" rounded text-decoration-none text-white"
                    >
                      Tài khoản khách hàng
                    </Link>
                  </li>
                </ul>
              </div>
              <li className=" mb-2">
                <Link
                  className="bg-info btn btn-toggle w-100 rounded collapsed text-white d-flex  align-items-center "
                  href="/"
                >
                  <FaMoneyBillAlt className="text-white me-2" /> Quản lý thuốc
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  href="/"
                  className="btn btn-toggle w-100 rounded collapsed text-white  d-flex align-items-center   "
                >
                  <FaMoneyBillAlt className="text-white me-2" /> Quản lý hóa đơn
                </Link>
              </li>

              <li className="mb-2">
                <Link
                  className="btn btn-toggle w-100 rounded collapsed text-white  d-flex align-items-center "
                  href="/"
                >
                  <FaMoneyBillAlt className="text-white me-2" /> Quản lý danh
                  mục
                </Link>
              </li>
            </ul>
            <div className="position-absolute localFooter bg-secondary">
              <Link href="/" className="w-100 d-block text-center ">
                <MdArrowBackIos />
              </Link>
            </div>
          </div>
          <div className="col-10 ">
            <div className="container d-flex justify-content-end rounded border shadow mb-4 position-relative ">
              <button className="btn  " onClick={toggle}>
                <Image
                  src="/images/user-profile.jpg"
                  className="img-profile me-2"
                  width={100}
                  height={100}
                  alt=""
                />
                <span>Mai Thanh Trọng</span>
              </button>
              {!isOpen && (
                <div className="container-fluid sub-menu-admin position-absolute bg-white rounded shadow ">
                  <div
                    className="row p-2 d-flex align-items-center pointer"
                    onClick={() => {
                      router.push("/me");
                    }}
                  >
                    <div className="col-2">
                      <Image
                        width={100}
                        height={100}
                        src="/images/profile.png "
                        className="bg-gray rounded-circle img-profile"
                        alt=""
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
                    className="row p-2 d-flex align-items-center"
                    onClick={logOutHandler}
                  >
                    <div className="col-2 pointer">
                      <Image
                        width={100}
                        height={100}
                        src="/images/logout.png "
                        className="bg-gray rounded-circle img-profile"
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
            </div>
            <div className="container border shadow rounded">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên Thuốc</th>
                    <th scope="col">Loại Thuốc</th>
                    <th scope="col">Đơn Vị Tính</th>
                    <th scope="col">Ngày Sản Xuất</th>
                    <th scope="col">Ngày Hết Hạn</th>
                    <th scope="col">Số Lượng</th>
                  </tr>
                </thead>
                <tbody>
                  <Thuoc />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentThuoc;
