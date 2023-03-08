import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Sidebar from "./Sidebar";

import ModalAddThuoc from "../Modal/ModalAddThuoc";

const ContentChiTietThuoc = () => {
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
            <div className="container-fluid border shadow rounded">
              <div className="row d-flex align-items-center my-2">
                <div className="col-1">
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => router.push("/admin/thuoc")}
                  >
                    <FaAngleLeft />
                  </button>
                </div>
                <div className="col-11 d-flex justify-content-center">
                  <h3 className="text-info fw-bold">
                    Thông tin chi tiết của thuốc
                  </h3>
                </div>
                <div className="col-12">
                  <div>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      noValidate
                      className="container"
                    >
                      <div className="form-group row my-2">
                        <label className="col-sm-2 col-form-label fw-bold">
                          Tên Thuốc:
                        </label>
                        <div className="col-sm-4">
                          <input
                            {...register("tenLoai", {
                              required: true,
                            })}
                            type="text"
                            required
                            // value={tenLoai}
                            // onChange={handleInputChange}
                            className="form-control form-control-sm inputText"
                          />
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4">
                          {errors?.tenLoai?.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập tên loại thuốc
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="form-group row my-2">
                        <label className="col-sm-2 col-form-label fw-bold">
                          Liều Lượng:
                        </label>
                        <div className="col-sm-4">
                          <input
                            {...register("tenLoai", {
                              required: true,
                            })}
                            type="text"
                            required
                            // value={tenLoai}
                            // onChange={handleInputChange}
                            className="form-control form-control-sm inputText"
                          />
                        </div>
                        <div className="col-sm-2"></div>
                        <div className="col-sm-4">
                          {errors?.tenLoai?.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập tên loại thuốc
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="form-group row my-2">
                        <label className="col-sm-2 col-form-label fw-bold">
                          Công dụng
                        </label>
                        <div className="col-sm-10">
                          <input
                            {...register("tenLoai", {
                              required: true,
                            })}
                            type="text"
                            required
                            // value={tenLoai}
                            // onChange={handleInputChange}
                            className="form-control form-control-sm inputText"
                          />
                        </div>
                        <div className="col-sm-4"></div>
                        <div className="col-sm-8">
                          {errors?.tenLoai?.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập tên loại thuốc
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="form-group row my-2">
                        <label className="col-sm-2 col-form-label fw-bold">
                          Tên Thuốc:
                        </label>
                        <div className="col-sm-10">
                          <input
                            {...register("tenLoai", {
                              required: true,
                            })}
                            type="text"
                            required
                            // value={tenLoai}
                            // onChange={handleInputChange}
                            className="form-control form-control-sm inputText"
                          />
                        </div>
                        <div className="col-sm-4"></div>
                        <div className="col-sm-8">
                          {errors?.tenLoai?.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập tên loại thuốc
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="form-group row my-2">
                        <label className="col-sm-2 col-form-label fw-bold">
                          Tên Thuốc:
                        </label>
                        <div className="col-sm-10">
                          <input
                            {...register("tenLoai", {
                              required: true,
                            })}
                            type="text"
                            required
                            // value={tenLoai}
                            // onChange={handleInputChange}
                            className="form-control form-control-sm inputText"
                          />
                        </div>
                        <div className="col-sm-4"></div>
                        <div className="col-sm-8">
                          {errors?.tenLoai?.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập tên loại thuốc
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="form-group row my-2">
                        <label className="col-sm-2 col-form-label fw-bold">
                          Tên Thuốc:
                        </label>
                        <div className="col-sm-10">
                          <input
                            {...register("tenLoai", {
                              required: true,
                            })}
                            type="text"
                            required
                            // value={tenLoai}
                            // onChange={handleInputChange}
                            className="form-control form-control-sm inputText"
                          />
                        </div>
                        <div className="col-sm-4"></div>
                        <div className="col-sm-8">
                          {errors?.tenLoai?.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập tên loại thuốc
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="form-group row my-2">
                        <label className="col-sm-2 col-form-label fw-bold">
                          Tên Thuốc:
                        </label>
                        <div className="col-sm-10">
                          <input
                            {...register("tenLoai", {
                              required: true,
                            })}
                            type="text"
                            required
                            // value={tenLoai}
                            // onChange={handleInputChange}
                            className="form-control form-control-sm inputText"
                          />
                        </div>
                        <div className="col-sm-4"></div>
                        <div className="col-sm-8">
                          {errors?.tenLoai?.type === "required" && (
                            <span className="text-danger">
                              Vui lòng nhập tên loại thuốc
                            </span>
                          )}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentChiTietThuoc;
