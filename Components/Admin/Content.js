import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { FaAngleRight, FaMoneyBillAlt } from "react-icons/fa";
import { MdArrowBackIos, MdManageAccounts } from "react-icons/md";
import { useDispatch } from "react-redux";
import Account from "./Account";
const index = () => {
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
              <img
                src="images/logo.png"
                style={{ width: "100px" }}
                className="img-fluid rounded mx-5 my-2"
              />
            </Link>

            <hr className="text-white" />
            <ul className="list-unstyled vh-100">
              <li className="bg-info rounded mb-2">
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
                      href="/"
                      className="rounded text-decoration-none text-white"
                    >
                      Tài khoản của nhân viên
                    </Link>
                  </li>
                  <li className="nav-item  p-2  ms-3 ">
                    <Link
                      href="/"
                      className=" rounded text-decoration-none text-white"
                    >
                      Tài khoản của khách hàng
                    </Link>
                  </li>
                </ul>
              </div>
              <li className="mb-2">
                <button
                  className="btn btn-toggle w-100 rounded collapsed text-white  d-flex align-items-center   "
                  data-bs-toggle="collapse"
                  data-bs-target="#home-collapse1"
                >
                  <FaMoneyBillAlt className="text-white me-2" /> Quản lý hóa đơn{" "}
                </button>
              </li>
              <div className="collapse " id="home-collapse1">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1  small  ">
                  <li className="nav-item p-2  ms-3 ">
                    <Link
                      href="/"
                      className="text-white rounded text-decoration-none"
                    >
                      Tài khoản của nhân viên
                    </Link>
                  </li>
                  <li className="nav-item p-2  ms-3">
                    <Link
                      href="/"
                      className="text-white rounded text-decoration-none"
                    >
                      Tài khoản của khách hàng
                    </Link>
                  </li>
                </ul>
              </div>
              <li className="mb-2">
                <button
                  className="btn btn-toggle w-100 rounded collapsed text-white  d-flex align-items-center "
                  data-bs-toggle="collapse"
                  data-bs-target="#home-collapse2"
                >
                  <FaMoneyBillAlt className="text-white me-2" /> Quản lý danh
                  mục
                </button>
              </li>
              <div className="collapse " id="home-collapse2">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1  small  ">
                  <li className="nav-item p-2  ms-3 ">
                    <Link
                      href="/"
                      className="text-white rounded text-decoration-none"
                    >
                      Tài khoản của nhân viên
                    </Link>
                  </li>
                  <li className="nav-item p-2  ms-3">
                    <Link
                      href="/"
                      className="text-white rounded text-decoration-none"
                    >
                      Tài khoản của khách hàng
                    </Link>
                  </li>
                </ul>
              </div>
              <li className=" mb-2">
                <button
                  className="btn btn-toggle w-100 rounded collapsed text-white d-flex  align-items-center "
                  data-bs-toggle="collapse"
                  data-bs-target="#home-collapse3"
                >
                  <FaMoneyBillAlt className="text-white me-2" /> Quản lý thuốc
                </button>
              </li>
              <div className="collapse " id="home-collapse3">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1  small  ">
                  <li className="nav-item p-2  ms-3 ">
                    <Link
                      href="/"
                      className="text-white rounded text-decoration-none"
                    >
                      Tài khoản của nhân viên
                    </Link>
                  </li>
                  <li className="nav-item p-2  ms-3">
                    <Link
                      href="/"
                      className="text-white rounded text-decoration-none"
                    >
                      Tài khoản của khách hàng
                    </Link>
                  </li>
                </ul>
              </div>
              <li className="mb-2">
                <button
                  className="btn btn-toggle w-100 rounded collapsed text-white  d-flex align-items-center   "
                  data-bs-toggle="collapse"
                  data-bs-target="#home-collapse4"
                >
                  <FaMoneyBillAlt className="text-white me-2" /> Quản lý hóa đơn{" "}
                </button>
              </li>
              <div className="collapse " id="home-collapse4">
                <ul className="btn-toggle-nav list-unstyled fw-normal pb-1  small  ">
                  <li className="nav-item p-2  ms-3 ">
                    <Link
                      href="/"
                      className="text-white rounded text-decoration-none"
                    >
                      Tài khoản của nhân viên
                    </Link>
                  </li>
                  <li className="nav-item p-2  ms-3">
                    <Link
                      href="/"
                      className="text-white rounded text-decoration-none"
                    >
                      Tài khoản của khách hàng
                    </Link>
                  </li>
                </ul>
              </div>
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
                <img
                  src="images/user-profile.jpg"
                  className="img-profile me-2"
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
                      <img
                        src="images/profile.png "
                        className="bg-gray rounded-circle img-profile"
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
                      <img
                        src="images/logout.png "
                        className="bg-gray rounded-circle img-profile"
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
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Email</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Vai trò</th>
                  </tr>
                </thead>
                <tbody>
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                  <Account />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default index;
