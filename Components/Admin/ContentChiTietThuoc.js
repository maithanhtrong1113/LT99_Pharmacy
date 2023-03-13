import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import Sidebar from "./Sidebar";
import { toast } from "react-toastify";

const ContentChiTietThuoc = (props) => {
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
  const [Thuoc, setThuoc] = useState({});
  const [loaiThuocSelected, setLoaiThuocSelected] = useState("");
  const [tenThuoc, setTenThuoc] = useState("");
  const [congDung, setCongDung] = useState("");
  const [quyCachDongGoi, setQuyCachDongGoi] = useState("");
  const [donViTinh, setDonViTinh] = useState("");
  const [lieuLuong, setLieuLuong] = useState("");
  const [tacDungPhu, setTacDungPhu] = useState("");
  const [huongDanSuDung, setHuongDanSuDung] = useState("");
  const [moTa, setMoTa] = useState("");
  const [soLuong, setSoLuong] = useState("");
  const [loaiThuocBanDau, setLoaiThuocBanDau] = useState("");
  const { id } = router.query;

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
    // Thông tin chi tiết của thuốc
  }, []);
  useEffect(() => {
    async function fetchData() {
      if (typeof id === "string") {
        try {
          const response = await fetch(
            `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc/${id}`
          );
          const data = await response.json();

          setThuoc(data);
          setTenThuoc(data.tenThuoc);
          setCongDung(data.congDung);
          setQuyCachDongGoi(data.quyCachDongGoi);
          setDonViTinh(data.donViTinh);
          setLieuLuong(data.lieuLuong);
          setTacDungPhu(data.tacDungPhu);
          setHuongDanSuDung(data.huongDanSuDung);
          setMoTa(data.moTa);
          setSoLuong(data.soLuong);
          setLoaiThuocSelected(data.loaiThuoc.maLoai);
          setLoaiThuocBanDau(data.loaiThuoc.maLoai);
        } catch (error) {
          console.error(error);
        }
      }
    }
    fetchData();
  }, [id]);

  const onSubmit = (data) => {
    data = {
      tenThuoc,
      congDung,
      quyCachDongGoi,
      donViTinh,
      lieuLuong,
      tacDungPhu,
      huongDanSuDung,
      moTa,
      soLuong,
      loaiThuocSelected,
    };
    console.log(data);

    // chỉnh sửa thông tin  thuốc
    if (
      tenThuoc !== "" &&
      congDung !== "" &&
      quyCachDongGoi !== "" &&
      donViTinh !== "" &&
      lieuLuong !== "" &&
      tacDungPhu !== "" &&
      huongDanSuDung !== "" &&
      moTa !== ""
    ) {
      fetch(
        `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/loai-thuoc/${data.loaiThuocSelected}/thuoc/${id}`,
        {
          method: "PUT",
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
            moTa: data.moTa,
            images: [],
            dsDoiTuong: [],
            thuocKeDon: true,
          }),
        }
      ).then((response) => {
        if (response.ok) {
          toast.success("Chỉnh sửa loại thuốc thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            theme: "light",
          });
          setTimeout(() => {
            router.push("/admin/thuoc");
          }, 2000);
        } else {
          toast.error("Chỉnh sửa loại thuốc không thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            theme: "light",
          });
        }
      });
    }
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
                    className="btn btn-sm btn-dark"
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
                {Object.keys(Thuoc).length !== 0 && (
                  <div className="col-12">
                    <div>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        className="container"
                      >
                        <div className="row my-4 d-flex align-items-center">
                          <div className="col-2">
                            <label className="fw-bold">Tên Thuốc</label>
                          </div>
                          <div className="col-6 ">
                            <div className="form-outline">
                              <input
                                {...register("tenThuoc", {})}
                                type="text"
                                className="form-control"
                                value={tenThuoc}
                                onChange={(e) => {
                                  setTenThuoc(e.target.value);
                                }}
                              />
                              {tenThuoc === "" && (
                                <span className="text-danger">
                                  Vui lòng nhập tên thuốc
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-2 pr-opx">
                            <label className="fw-bold">Loại Thuốc</label>
                          </div>
                          <div className="col-2 p-sopx">
                            <select
                              className="form-select form-select-sm py-2"
                              aria-label=".form-select-sm"
                              defaultValue={loaiThuocSelected}
                              {...register("loaiThuoc", {})}
                              onChange={(e) => {
                                setLoaiThuocSelected(e.target.value);
                              }}
                            >
                              {loaiThuoc.map((loaiThuoc) => (
                                <option
                                  value={loaiThuoc.maLoai}
                                  key={loaiThuoc.maLoai}
                                  selected={
                                    loaiThuoc.maLoai === loaiThuocSelected
                                      ? "selected"
                                      : null
                                  }
                                >
                                  {loaiThuoc.tenLoai}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="row my-4 d-flex align-items-center">
                          <div className="col-2">
                            <label className="fw-bold">Công Dụng</label>
                          </div>
                          <div className="col-10">
                            <div className="form-outline">
                              <input
                                {...register("congDung", {})}
                                type="text"
                                className="form-control"
                                onChange={(e) => {
                                  setCongDung(e.target.value);
                                }}
                                value={congDung}
                              />
                              {congDung === "" && (
                                <span className="text-danger">
                                  Vui lòng nhập công dụng của thuốc
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row my-4 d-flex align-items-center">
                          <div className="col-2">
                            <label className="fw-bold">Đơn vị tính</label>
                          </div>
                          <div className="col-2">
                            <div className="form-outline">
                              <input
                                {...register("donViTinhh", {})}
                                type="text"
                                className="form-control"
                                value={donViTinh}
                                onChange={(e) => {
                                  setDonViTinh(e.target.value);
                                }}
                              />
                              {donViTinh === "" && (
                                <span className="text-danger">
                                  Vui lòng nhập đơn vị tính
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-2">
                            <label className="fw-bold">Quy cách đóng gói</label>
                          </div>
                          <div className="col-2 p-sopx">
                            <div className="form-outline">
                              <input
                                {...register("quyCachDongGoi", {})}
                                type="text"
                                className="form-control"
                                value={quyCachDongGoi}
                                onChange={(e) => {
                                  setQuyCachDongGoi(e.target.value);
                                }}
                              />
                              {quyCachDongGoi === "" && (
                                <span className="text-danger">
                                  Không được để trống
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-1 pr-opx">
                            <label className="fw-bold">Số lượng</label>
                          </div>
                          <div className="col-3">
                            <div className="form-outline">
                              <input
                                {...register("soLuong", {})}
                                type="text"
                                className="form-control visiblity"
                                value={soLuong}
                                readonly
                              />
                              {soLuong === "" && (
                                <span className="text-danger">
                                  Vui lòng nhập số lượng
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row my-4 d-flex align-items-center">
                          <div className="col-2 pr-opx">
                            <label className="fw-bold">Hướng dẫn sử dụng</label>
                          </div>
                          <div className="col-10">
                            <div className="form-outline">
                              <input
                                {...register("huongDanSuDung", {})}
                                type="text"
                                className="form-control"
                                value={huongDanSuDung}
                                onChange={(e) => {
                                  setHuongDanSuDung(e.target.value);
                                }}
                              />
                              {huongDanSuDung === "" && (
                                <span className="text-danger">
                                  Vui lòng nhập hướng dẫn sử dụng
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row my-4 d-flex align-items-center">
                          <div className="col-2 pr-opx">
                            <label className="fw-bold">Tác dụng phụ</label>
                          </div>
                          <div className="col-4">
                            <div className="form-outline">
                              <input
                                {...register("tacDungPhu", {})}
                                type="text"
                                className="form-control"
                                value={tacDungPhu}
                                onChange={(e) => {
                                  setTacDungPhu(e.target.value);
                                }}
                              />
                              {tacDungPhu === "" && (
                                <span className="text-danger">
                                  Vui lòng nhập tác dụng phụ
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-2 pr-opx">
                            <label className="fw-bold">Liều Lượng</label>
                          </div>
                          <div className="col-4">
                            <div className="form-outline">
                              <input
                                {...register("lieuLuongg", {})}
                                type="text"
                                className="form-control"
                                value={lieuLuong}
                                onChange={(e) => {
                                  setLieuLuong(e.target.value);
                                }}
                              />
                              {lieuLuong === "" && (
                                <span className="text-danger">
                                  Vui lòng nhập liều lượng
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="row my-4 d-flex align-items-center">
                          <div className="col-2 pr-opx">
                            <label className="fw-bold">Mô tả</label>
                          </div>
                          <div className="col-10">
                            <div className="form-outline">
                              <input
                                {...register("moTa", {})}
                                type="text"
                                className="form-control"
                                value={moTa}
                                onChange={(e) => {
                                  setMoTa(e.target.value);
                                }}
                              />
                              {moTa === "" && (
                                <span className="text-danger">
                                  Vui lòng nhập mô tả
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <button className="btn btn-primary mx-2" type="submit">
                          Sửa thông tin thuốc
                        </button>

                        <button
                          className="btn btn-secondary mx-2"
                          type="button"
                          onClick={() => {
                            router.push("/admin/thuoc");
                          }}
                        >
                          Hủy
                        </button>
                      </form>
                    </div>
                  </div>
                )}
                {Object.keys(Thuoc).length === 0 && (
                  <div className="col-12"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentChiTietThuoc;
