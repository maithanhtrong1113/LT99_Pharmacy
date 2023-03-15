import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaAngleDown, FaAngleRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ModalAddLoaiThuoc from "../Modal/ModalAddLoaiThuoc";
import ProgressBar from "../ProcessBar/ProcessBar";
import LoaiThuoc from "./LoaiThuoc";
import Sidebar from "./Sidebar";

const ContentLoaiThuoc = () => {
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
  const [loaiThuoc, setLoaiThuoc] = useState([]);
  useEffect(() => {
    fetch(
      "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoaiThuoc(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const themLoaiThuoc = (data) => {
    fetch("http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenLoai: data.tenLoai,
        moTaChung: data.moTaChung,
      }),
    }).then((response) => {
      if (response.ok) {
        toast.success("Thêm loại thuốc thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      } else {
        toast.error("Thêm loại thuốc không thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      }
    });

    //   .then((response) => response.json())
    //   .then((data) => {
    //     setLoaiThuoc(data);
    //   })
  };
  const [searchTerm, setSearchTerm] = useState("");

  const [timeoutId, setTimeoutId] = useState(null);

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
          `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/tim-loai-thuoc?keyword=${encodeURIComponent(
            searchTerm
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (results.length > 0) setLoaiThuoc(results);
            else {
              setLoaiThuoc([]);
            }
          });
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      fetch(
        "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoaiThuoc(data);
        })
        .catch((error) => console.error(error));
    }
  };
  return (
    <Fragment>
      <ProgressBar />
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
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
                <span>
                  Mai Thanh Trọng <FaAngleDown />
                </span>
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
              <div className="row my-3 d-flex align-items-center">
                <div className="col-4">
                  <form>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-input w-100 px-2"
                        placeholder="Nhập tên loại thuốc bạn muốn tìm"
                        value={searchTerm}
                        onChange={handleInputChange}
                      />
                      <BsSearch className="position-absolute  localIconSearch" />
                    </div>
                  </form>
                </div>
                <div className="col-8">
                  <ModalAddLoaiThuoc submitHandler={themLoaiThuoc} />
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên Loại Thuốc</th>
                    <th scope="col">Mô tả chung</th>
                  </tr>
                </thead>
                <tbody>
                  <LoaiThuoc loaiThuoc={loaiThuoc} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentLoaiThuoc;
