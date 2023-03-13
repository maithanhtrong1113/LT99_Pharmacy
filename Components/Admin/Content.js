import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaMoneyBillAlt } from "react-icons/fa";
import { MdArrowBackIos, MdManageAccounts } from "react-icons/md";
import { useDispatch } from "react-redux";
import ModalAddNhanVien from "../Modal/ModalAddNhanVien";
import Account from "./Account";
import Sidebar from "./Sidebar";
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
          <Sidebar />
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
                  <Account active={true} vaiTro={"nhanVien"} stt={1} />
                  <Account active={false} vaiTro={"quanLy"} stt={2} />
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
