import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { AiFillMedicineBox } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import {
  MdArrowBackIos,
  MdCategory,
  MdLabelImportant,
  MdManageAccounts,
} from "react-icons/md";

const Sidebar = () => {
  const router = useRouter();
  const [active, setActive] = useState("");
  const [activeThuoc, setActiveThuoc] = useState("");
  const [activeLoaiThuoc, setActiveLoaiThuoc] = useState("");
  const [activeXuatNhapThuoc, setActiveXuatNhapThuoc] = useState("");
  const [activeThongKe, setActiveThongKe] = useState("");
  useEffect(() => {
    if (router.pathname === "/admin/thuoc") {
      setActiveThuoc("bg-info rounded");
    } else if (router.pathname === "/admin") {
      setActive("bg-info rounded");
    } else if (router.pathname === "/admin/loaiThuoc") {
      setActiveLoaiThuoc("bg-info rounded");
    } else if (router.pathname === "/admin/xuatNhapThuoc") {
      setActiveXuatNhapThuoc("bg-info rounded");
    } else if (router.pathname === "/admin/thongKe") {
      setActiveThongKe("bg-info rounded");
    }
  }, []);

  return (
    <Fragment>
      <div className="col-2 p-2 bg-dark shadow position-relative ">
        <Link href="/">
          <Image
            src="/images/logo.png"
            className="img-fluid rounded mx-5 my-2 "
            width={100}
            height={100}
            priority
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
              <MdManageAccounts className="text-secondary me-2" /> Quản lý tài
              khoản
            </Link>
          </li>
          <li className={`${activeLoaiThuoc} mb-2`}>
            <Link
              className="btn btn-toggle w-100 rounded collapsed text-white  d-flex align-items-center "
              href="/admin/loaiThuoc"
            >
              <MdCategory className="text-danger me-2" /> Quản lý loại thuốc
            </Link>
          </li>
          <li className={`${activeThuoc} mb-2`}>
            <Link
              className="btn btn-toggle w-100 rounded collapsed text-white d-flex  align-items-center "
              href="/admin/thuoc"
            >
              <AiFillMedicineBox className="text-warning me-2" /> Quản lý thuốc
            </Link>
          </li>

          <li className={`${activeXuatNhapThuoc} mb-2`}>
            <Link
              href="/admin/xuatNhapThuoc"
              className="btn btn-toggle w-100 rounded collapsed text-white  d-flex align-items-center   "
            >
              <MdLabelImportant className="text-success me-2 " />
              Nhập thuốc
            </Link>
          </li>
          <li className={`${activeThongKe} mb-2`}>
            <Link
              href="/admin/thongKe"
              className="btn btn-toggle w-100 rounded collapsed text-white  d-flex align-items-center   "
            >
              <BsFillBarChartFill className="text-primary me-2 " /> Thống Kê
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
