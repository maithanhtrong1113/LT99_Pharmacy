import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdArrowBackIos, MdManageAccounts } from "react-icons/md";

const Sidebar = () => {
  const router = useRouter();

  const [active, setActive] = useState("");
  const [activeThuoc, setActiveThuoc] = useState("");
  const [activeLoaiThuoc, setActiveLoaiThuoc] = useState("");
  const [activeXuatNhapThuoc, setActiveXuatNhapThuoc] = useState("");
  useEffect(() => {
    if (router.pathname === "/admin/thuoc") {
      setActiveThuoc("bg-info rounded");
    } else if (router.pathname === "/admin") {
      setActive("bg-info rounded");
    } else if (router.pathname === "/admin/loaiThuoc") {
      setActiveLoaiThuoc("bg-info rounded");
    } else if (router.pathname === "/admin/xuatNhapThuoc") {
      setActiveXuatNhapThuoc("bg-info rounded");
    }
  }, []);

  return (
    <Fragment>
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
          <li className={`${active} mb-2`}>
            <Link
              className="btn btn-toggle rounded collapsed w-100 text-white d-flex align-items-center   "
              href="/admin"
            >
              <MdManageAccounts className="text-white me-2" /> Quản lý tài khoản
            </Link>
          </li>
          <li className={`${activeLoaiThuoc} mb-2`}>
            <Link
              className="btn btn-toggle w-100 rounded collapsed text-white  d-flex align-items-center "
              href="/admin/loaiThuoc"
            >
              <FaMoneyBillAlt className="text-white me-2" /> Quản lý loại thuốc
            </Link>
          </li>
          <li className={`${activeThuoc} mb-2`}>
            <Link
              className="btn btn-toggle w-100 rounded collapsed text-white d-flex  align-items-center "
              href="/admin/thuoc"
            >
              <FaMoneyBillAlt className="text-white me-2" /> Quản lý thuốc
            </Link>
          </li>

          <li className={`${activeXuatNhapThuoc} mb-2`}>
            <Link
              href="/admin/xuatNhapThuoc"
              className="btn btn-toggle w-100 rounded collapsed text-white  d-flex align-items-center   "
            >
              <FaMoneyBillAlt className="text-white me-2" /> Quản lý nhập thuốc
            </Link>
          </li>
        </ul>
        <div className="position-absolute localFooter bg-secondary">
          <Link href="/" className="w-100 d-block text-center ">
            <MdArrowBackIos />
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
