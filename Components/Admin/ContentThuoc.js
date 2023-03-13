import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Sidebar from "./Sidebar";

import ModalAddThuoc from "../Modal/ModalAddThuoc";
import Thuoc from "./Thuoc";
const ContentThuoc = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
  const [dsThuoc, setDsThuoc] = useState([]);
  const [loaiThuocSelected, setLoaiThuocSelected] = useState("Tất cả thuốc");

  // danh sách thuốc theo loại thuốc
  useEffect(() => {
    if (loaiThuocSelected === "Tất cả thuốc") {
      // danh sách tất cả thuốc truyền vào table
      fetch(
        "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc"
      )
        .then((response) => response.json())
        .then((data) => {
          setDsThuoc(data);
        })
        .catch((error) => console.error(error));
    } else {
      console.log(loaiThuocSelected);
      fetch(
        `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/${loaiThuocSelected}/thuoc`
      )
        .then((response) => response.json())
        .then((data) => {
          setDsThuoc(data);
        })
        .catch((error) => console.error(error));
    }
  }, [loaiThuocSelected]);

  useEffect(() => {
    // danh sách loại thuốc truyền vào select option
    fetch(
      "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/"
    )
      .then((response) => response.json())
      .then((data) => {
        setLoaiThuoc(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const onSubmit = (data) => {
    console.log(data);
    // props.submitHandler(data);
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
          `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/tim-thuoc?keyword=${encodeURIComponent(
            searchTerm
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (results.length > 0) setDsThuoc(results);
            else {
              setDsThuoc([]);
            }
          });
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      fetch(
        "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc"
      )
        .then((response) => response.json())
        .then((data) => {
          setDsThuoc(data);
        })
        .catch((error) => console.error(error));
    }
  };
  const addThuocHandler = (data) => {
    fetch(
      `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/${data.maLoai}/thuoc`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenThuoc: data.tenThuoc,

          lieuLuong: data.lieuLuong,
          congDung: data.congDung,
          donViTinh: data.donViTinh,
          quyCachDongGoi: data.quyCachDongGoi,
          tacDungPhu: data.tacDungPhu,
          huongDanSuDung: data.huongDanSuDung,
          soLuong: data.soLuong,
          images: [],
          dsDoiTuong: [],
          thuocKeDon: false,
          moTa: data.moTa,
        }),
      }
    );
  };
  return (
    <Fragment>
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
              <div className="row my-3 d-flex align-items-center">
                <div className="col-4">
                  <form>
                    <input
                      type="text"
                      placeholder="Nhập tên  hoặc công dụng của thuốc muốn tìm"
                      className="form-input w-100 px-2"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                  </form>
                </div>
                <div className="col-2">
                  <form>
                    <select
                      className="form-select form-select-sm py-2"
                      aria-label=".form-select-sm"
                      {...register("loaiThuocName", {})}
                      onChange={(e) => {
                        setLoaiThuocSelected(e.target.value);
                      }}
                    >
                      <option value={"Tất cả thuốc"} key={0} defaultValue>
                        Tất cả thuốc
                      </option>
                      {loaiThuoc.map((loaiThuoc) => (
                        <option value={loaiThuoc.maLoai} key={loaiThuoc.maLoai}>
                          {loaiThuoc.tenLoai}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
                <div className="col-6">
                  <ModalAddThuoc submitHandler={addThuocHandler} />
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên Thuốc</th>
                    <th scope="col">Liều Lượng</th>
                    <th scope="col">Công Dụng</th>
                    <th scope="col">Đơn vị Tính</th>
                    <th scope="col">Số Lượng</th>
                    <th scope="col">Tên Loại Thuốc</th>
                  </tr>
                </thead>
                <tbody>
                  <Thuoc dsThuoc={dsThuoc} />
                  <tr>
                    <button className="btn btn-sm bg-dark rounded me-2 my-2">
                      <FaAngleLeft className="text-white" />
                    </button>
                    <button className="btn btn-sm bg-dark rounded my-2">
                      <FaAngleRight className="text-white" />
                    </button>
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

export default ContentThuoc;
