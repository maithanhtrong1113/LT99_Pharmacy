import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaMoneyBillAlt } from "react-icons/fa";
import { MdArrowBackIos, MdManageAccounts } from "react-icons/md";
import { useDispatch } from "react-redux";
import ModalAddNhanVien from "../Modal/ModalAddNhanVien";
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
              <li className="bg-info rounded mb-2">
                <Link
                  className="btn btn-toggle rounded collapsed w-100 text-white d-flex align-items-center   "
                  href="/admin"
                >
                  <MdManageAccounts className="text-white me-2" /> Quản lý tài
                  khoản
                </Link>
              </li>

              <li className=" mb-2">
                <Link
                  className="btn btn-toggle w-100 rounded collapsed text-white d-flex  align-items-center "
                  href="/admin/thuoc"
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
            <div className="container border shadow rounded ">
              <div className="row my-3 d-flex align-items-center">
                <div className="col-4">
                  <form>
                    <input type="text" className="form-input w-100 px-2" />
                  </form>
                </div>
                <div className="col-8">
                  <ModalAddNhanVien />
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Email</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Vai trò</th>
                  </tr>
                </thead>
                <tbody>
                  <Account active={true} vaiTro={"khachHang"} stt={1} />
                  <Account active={true} vaiTro={"nhanVien"} stt={2} />
                  <Account active={false} vaiTro={"quanLy"} stt={3} />
                  <Account active={true} vaiTro={"khachHang"} stt={4} />
                  <Account active={true} vaiTro={"khachHang"} stt={5} />
                  <Account active={true} vaiTro={"khachHang"} stt={6} />
                  <Account active={true} vaiTro={"khachHang"} stt={7} />
                  <Account active={true} vaiTro={"khachHang"} stt={8} />
                  <Account active={true} vaiTro={"khachHang"} stt={9} />
                  <Account active={true} vaiTro={"khachHang"} stt={10} />
                  <tr>
                    <td>
                      <button className="btn btn-dark me-3 ">
                        <FaAngleLeft className="text-white" />
                      </button>
                      <button className="btn btn-dark ">
                        <FaAngleRight className="text-white" />
                      </button>
                    </td>
                  </tr>
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
