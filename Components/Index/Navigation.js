import React, { Fragment, useEffect, useState } from "react";

import {
  FaShoppingCart,
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
import { getAllLoaiThuocKhach } from "@/api/loaiThuocApi";
import { BsArrowLeft, BsArrowRight, BsSearch } from "react-icons/bs";

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [bg, setbg] = useState("bg-customNav");
  useEffect(() => {
    fetchData();
    const listenToScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (winScroll < 250) {
        setbg("bg-customNav");
      } else {
        setbg("bg-customNav");
      }
    };
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);
  const [loaiThuoc, setLoaiThuoc] = useState([]);

  async function fetchData() {
    const data = await getAllLoaiThuocKhach();
    setLoaiThuoc(data);
  }
  const danhMuc = [];
  for (let i = 1; i <= loaiThuoc.length; i++) {
    danhMuc.push(
      <li className="mb-1">
        <Link href={`/listProduct/${loaiThuoc[i - 1].maLoai}`}>
          <button className="btn btn-toggle  rounded ">
            {loaiThuoc[i - 1].tenLoai}
          </button>
        </Link>
      </li>
    );
  }
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const [dsThuoc, setDsThuoc] = useState([]);
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log(searchTerm);
    if (timeoutId) {
      clearTimeout(timeoutId); // Xóa timeout trước đó nếu còn tồn tại
    }

    if (searchTerm.length > 0) {
      const newTimeoutId = setTimeout(() => {
        fetch(
          `http://localhost:8080/QLNT-Server/khach-hang/xem-thuoc/tim-thuoc?keyword=${encodeURIComponent(
            searchTerm
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (results.length > 0) setDsThuoc(results.slice(0, 5));
            else {
              setDsThuoc([]);
            }
          });
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      setDsThuoc([]);
    }
  };
  return (
    <Fragment>
      {windowWidth < 1000 && (
        <div className="container-fluid bg-customNav fixed-top shadow">
          <div className="row align-items-center py-3 d-flex">
            <div className="col-3">
              <Link href="/">
                <Image
                  src="/images/logo.png"
                  className="img-fluid rounded"
                  width={100}
                  height={50}
                  alt=""
                />
              </Link>
            </div>
            <div className="col-2 position-relative">
              <div
                className="btn border w-100 d-flex justify-content-evenly align-items-center bg-white "
                onClick={toggle}
              >
                <FaThList className="text-dark" />
              </div>
            </div>
            {!isOpen && (
              <div className="container position-absolute localDanhMuc1">
                <div className="arrow-up"></div>
                <div
                  className="flex-shrink-0 p-3  border rounded bg-white"
                  style={{ width: "300px" }}
                >
                  <ul className="list-unstyled ps-0 ">{danhMuc}</ul>
                </div>
              </div>
            )}
            <div className="col-5">
              <div className="input-group position-relative d-flex align-items-center">
                <input
                  type="text"
                  className="form-input form-control mx-2 rounded "
                  placeholder=""
                  onFocus={() => setShow(true)}
                  onBlur={() => setShow(false)}
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                <BsSearch className="position-absolute localIconSearch1" />
              </div>
            </div>
            <div
              className={`position-absolute localTimKiem w-100  ${
                show ? "localTimKiemshow" : ""
              } p-0`}
            >
              <div className="p-3 border rounded bg-white w-100 shadow vh-100">
                <button className="btn bg-blue-dark mb-2">
                  <BsArrowLeft />
                </button>
                <br />
                {dsThuoc.length === 0 && searchTerm !== null && (
                  <span className="fw-bold">Không tìm thấy sản phẩm</span>
                )}
                {dsThuoc.length === 0 && searchTerm === null && (
                  <span className="fw-bold">
                    Nhập tên sản phẩm bạn muốn tìm
                  </span>
                )}
                {dsThuoc.map((thuoc) => (
                  <div className="row w-100  px-0 mx-0">
                    <Link
                      href={`/product/${thuoc.thuoc.maThuoc}`}
                      className="text-decoration-none w-100 rounded bg-blue-dark py-2 my-1 text-white bg-blue-darkHover"
                    >
                      {thuoc.thuoc.tenThuoc}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-2 d-flex justify-content-evenly ">
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
      )}
      {windowWidth > 1000 && (
        <div className={`container-fluid ${bg} fixed-top shadow`}>
          <div className="row align-items-center py-3 hoverDanhMucShow">
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
            <div className="col-lg-2 position-relative hoverDanhMuc">
              <div
                className="btn border w-100 d-flex justify-content-evenly align-items-center bg-white  "
                onClick={toggle}
              >
                <FaThList className="text-dark" />
                <span className="text-decoration-none fw-bold"> Danh Mục</span>
                <FaAngleDown />
              </div>
            </div>

            <div className="position-absolute localDanhMuc w-25  ">
              <div className="arrow-up ms-5"></div>
              <div className="flex-shrink-0 p-3  border rounded bg-white w-100 shadow">
                <ul className="list-unstyled ps-0 ">{danhMuc}</ul>
              </div>
            </div>

            <div className="col-lg-5 position-relative formTimKiem">
              <div className="input-group position-relative d-flex align-items-center ">
                <input
                  type="text"
                  className="form-input form-control mx-2 rounded "
                  placeholder="Bạn đang muốn tìm gì..."
                  onFocus={() => setShow(true)}
                  onBlur={() => setShow(false)}
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                <BsSearch className="position-absolute localIconSearch1 " />
              </div>
            </div>

            <div
              className={`position-absolute localTimKiem w-50 ${
                show ? "localTimKiemshow" : ""
              } `}
            >
              <div className="p-3 border rounded bg-white w-100 shadow">
                {dsThuoc.length === 0 && searchTerm !== null && (
                  <span className="fw-bold">Không tìm thấy sản phẩm</span>
                )}
                {dsThuoc.length === 0 && searchTerm === null && (
                  <span className="fw-bold">
                    Nhập tên sản phẩm bạn muốn tìm
                  </span>
                )}
                {dsThuoc.map((thuoc) => (
                  <div className="row w-100  px-0 mx-0">
                    <Link
                      href={`/product/${thuoc.thuoc.maThuoc}`}
                      className="text-decoration-none w-100 rounded bg-blue-dark py-2 my-1 text-white bg-blue-darkHover"
                    >
                      {thuoc.thuoc.tenThuoc}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-4  d-flex justify-content-evenly ">
              <button
                className="btn btn-light w-50 d-flex justify-content-evenly fw-bold"
                onClick={() => router.push("/admin/banThuoc")}
              >
                <MdOutlineAdminPanelSettings className="adminIcon" />
                Trang Bán Thuốc
              </button>
              <Link
                href="/cart"
                className="btn d-flex align-items-center border-none text-white bg-white position-relative px-3"
              >
                <FaShoppingCart className="text-dark" />
                <span className="px-1 text-white position-absolute localCart  bg-cart">
                  {cartQuantity}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Navigation;
