import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { FaAngleLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import NguoiDung from "./NguoiDung";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import VND from "../utils/formatVND";
import ModalAddNhaCungCap1 from "../Modal/ModalAddNhaCungCap1";
import { getAllNhaCungCap } from "@/api/nhaCungCapApi";
import { BsThreeDots } from "react-icons/bs";
import { lichSuNhapThuoc } from "@/api/lichSuNhapThuocApi";
import ModalAddNuocSanXuat from "../Modal/ModalAddNuocSanXuat";
import { getAllNuocSanXuat } from "@/api/nuocSanXuatApi";
import ModalAddNuocSanXuat1 from "../Modal/ModalAddNuocSanXuat1";

const ContentChiTietThuoc = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({});

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
  const [loaThuocBanDau, setLoaiThuocBanDau] = useState("");
  const [thuocKeDon, setThuocKeDon] = useState("");
  const { id } = router.query;
  const [isShow, setIsShow] = useState(false);
  const [nhaCungCap, setNhaCungCap] = useState([]);
  const [nuocSanXuat, setNuocSanXuat] = useState([]);
  const toggleShow = () => {
    if (isShowNhapThuoc === true) setIsShowNhapThuoc(false);
    setIsShow(!isShow);
  };
  const [isShowNhapThuoc, setIsShowNhapThuoc] = useState(false);
  const toggleShowNhapThuoc = () => {
    if (isShow === true) setIsShow(false);
    setIsShowNhapThuoc(!isShowNhapThuoc);
  };
  const [lichSus, setLichSus] = useState([]);
  const today = new Date();
  const [ngaySanXuat, setNgaySanXuat] = useState(
    new Date(today.getFullYear(), today.getMonth() - 1, today.getDate())
  );
  const [ngayHetHan, setNgayHetHan] = useState(
    new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())
  );
  const [ngayNhapThuoc, setNgayNhapThuoc] = useState(new Date());
  const validateSoLuongNhap = (value) => {
    if (value <= 0) {
      return "Giá trị phải lớn hơn 0";
    }
    return true;
  };
  useEffect(() => {
    fetchDataNhaCungCap();
    fetchDataNuocSanXuat();
    // danh sách loại thuốc truyền vào select option
    fetch(
      "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/"
    )
      .then((response) => response.json())
      .then((data) => {
        setLoaiThuoc(data);
      })
      .catch((error) => console.error(error));
    // Thông tin lịch sử nhập thuốc
    fetch(
      `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/thuoc/${id}/lich-su-nhap-thuoc`
    )
      .then((response) => response.json())
      .then((data) => {
        setLichSus(data);
      })
      .catch((error) => console.error(error));

    // thông tin thuốc
    fetchData();
  }, []);
  async function fetchData() {
    if (typeof id === "string") {
      try {
        const response = await fetch(
          `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc/${id}`
        );
        const data = await response.json();
        console.log(data);
        setThuoc(data);
        setTenThuoc(data.thuoc.tenThuoc);
        setCongDung(data.thuoc.congDung);
        setQuyCachDongGoi(data.thuoc.quyCachDongGoi);
        setDonViTinh(data.thuoc.donViTinh);
        setLieuLuong(data.thuoc.lieuLuong);
        setTacDungPhu(data.thuoc.tacDungPhu);
        setHuongDanSuDung(data.thuoc.huongDanSuDung);
        setMoTa(data.thuoc.moTa);
        setSoLuong(data.thuoc.soLuong);
        setLoaiThuocSelected(data.thuoc.loaiThuoc.maLoai);
        setLoaiThuocBanDau(data.thuoc.loaiThuoc.maLoai);
        setThuocKeDon(data.thuoc.isThuocKeDon);
      } catch (error) {
        console.error(error);
      }
    }
  }
  const handlerSuaTHuocSubmit = (e) => {
    e.preventDefault();
    console.log(
      tenThuoc,
      congDung,
      quyCachDongGoi,
      donViTinh,
      lieuLuong,
      tacDungPhu,
      huongDanSuDung,
      moTa,
      loaiThuocSelected
    );
    // chỉnh sửa thông tin  thuốc

    fetch(
      `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/loai-thuoc/${loaiThuocSelected}/thuoc/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenThuoc: tenThuoc,
          lieuLuong: lieuLuong,
          congDung: congDung,
          donViTinh: donViTinh,
          quyCachDongGoi: quyCachDongGoi,
          huongDanSuDung: huongDanSuDung,
          tacDungPhu: tacDungPhu,
          moTa: moTa,
          images: [],
          dsDoiTuong: [],
          isThuocKeDon: thuocKeDon,
        }),
      }
    ).then((response) => {
      if (response.ok) {
        toast.success("Chỉnh sửa  thuốc thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
        fetchData();
      } else {
        toast.error("Chỉnh sửa  thuốc không thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      }
    });
  };
  const [selectedNCC, setNCC] = useState({});
  const [selectedNSX, setNSX] = useState({});
  const onSubmitNhapThuoc = (dataa) => {
    if (ngayHetHan <= today || ngaySanXuat >= today) return;
    const nhaCungCapValue =
      Object.keys(selectedNCC).length === 0
        ? { maNhaCungCap: nhaCungCap[0].maNhaCungCap }
        : { maNhaCungCap: selectedNCC };
    const NSXvalue =
      Object.keys(selectedNSX).length === 0
        ? { maNuoc: nuocSanXuat[0].maNuoc }
        : { maNuoc: selectedNSX };

    fetch(
      `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/thuoc/${id}/nhap-thuoc`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          soLo: dataa.soLo,
          ngayNhapLoThuoc: today.toISOString().slice(0, 10),
          ngaySanXuat: format(new Date(ngaySanXuat), "yyyy-MM-dd"),
          ngayHetHan: format(new Date(ngayHetHan), "yyyy-MM-dd"),
          soLuongNhap: dataa.soLuongNhap,
          giaNhap: dataa.giaNhap,
          giaBanSi: dataa.giaBanSi,
          giaBanLe: dataa.giaBanLe,
          nhaCungCap: nhaCungCapValue,
          nuocSanXuat: NSXvalue,
        }),
      }
    ).then((response) => {
      if (response.ok) {
        toast.success("Nhập thuốc thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
        fetchData();
        fetchDataLichSuNhapThuoc(id);
      } else {
        toast.error("Nhập thuốc không thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      }
    });
  };
  async function fetchDataNhaCungCap() {
    const data = await getAllNhaCungCap();
    setNhaCungCap(data);
  }
  async function fetchDataNuocSanXuat() {
    const data = await getAllNuocSanXuat();
    setNuocSanXuat(data);
  }
  async function fetchDataLichSuNhapThuoc(id) {
    const data = await lichSuNhapThuoc(id);
    setLichSus(data);
  }
  return (
    <Fragment>
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 ">
            <NguoiDung />
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
                    Chỉnh sửa thông tin thuốc
                  </h3>
                </div>
                {Object.keys(Thuoc).length !== 0 && (
                  <div className="col-12">
                    <div>
                      <form
                        onSubmit={handlerSuaTHuocSubmit}
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
                            <label className="fw-bold">Mã Thuốc</label>
                          </div>
                          <div className="col-2 p-sopx">
                            <div className="form-outline">
                              <input
                                type="text"
                                className="form-control visiblity"
                                value={id}
                                readOnly
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row my-4 d-flex align-items-center">
                          <div className="col-2">
                            <label className="fw-bold">Công Dụng</label>
                          </div>
                          <div className="col-6">
                            <div className="form-outline">
                              <input
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
                          <div className="col-2 pr-opx">
                            <label className="fw-bold">Loại Thuốc</label>
                          </div>
                          <div className="col-2 p-sopx">
                            <select
                              className="form-select form-select-sm py-2"
                              aria-label=".form-select-sm"
                              defaultValue={loaiThuocSelected}
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
                            <label className="fw-bold">Đơn vị tính</label>
                          </div>
                          <div className="col-2">
                            <div className="form-outline">
                              <input
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
                                type="text"
                                className="form-control"
                                value={quyCachDongGoi}
                                onChange={(e) => {
                                  setQuyCachDongGoi(e.target.value);
                                }}
                              />
                              {quyCachDongGoi === "" && (
                                <span className="text-danger">
                                  Vui lòng nhập quy cách đóng gói
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
                                type="text"
                                className="form-control visiblity"
                                value={soLuong}
                                readOnly
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
                          <div className="col-4">
                            <div className="form-outline">
                              <textarea
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
                          <div className="col-2 pr-opx">
                            <label className="fw-bold">Thuốc Kê Đơn</label>
                          </div>
                          <div className="col-4">
                            <div className="form-outline">
                              <select
                                type="text"
                                className="form-select"
                                value={thuocKeDon}
                                onChange={(e) => {
                                  setThuocKeDon(e.target.value);
                                }}
                              >
                                <option value="true">Có</option>
                                <option value="false">Không</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-7">
                            <button
                              className="btn btn-warning me-2 w-50"
                              type="submit"
                            >
                              Sửa thông tin thuốc
                            </button>
                            <button
                              className="btn btn-danger btn- ms-2 w-25"
                              type="button"
                              onClick={() => {
                                router.push("/admin/thuoc");
                              }}
                            >
                              Hủy
                            </button>
                          </div>
                          <div className="col-5 text-end">
                            <button
                              className="btn btn-primary me-2 "
                              type="button"
                              onClick={toggleShowNhapThuoc}
                            >
                              Nhập thuốc
                            </button>
                            <button
                              className="btn btn-info "
                              type="button"
                              onClick={toggleShow}
                            >
                              Xem Lịch Sử Nhập Thuốc
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
                {Object.keys(Thuoc).length === 0 && (
                  <div className="col-12"></div>
                )}
              </div>
            </div>
            {/* lich sử nhập thuốc */}
            {isShow && (
              <div className="container-fluid border shadow rounded my-3">
                <div className="row text-center ">
                  <h4 className="text-info my-2">Lịch sử nhập thuốc</h4>
                </div>
                <div className="table-responsive">
                  <table className="tableNhap table-striped table">
                    <thead>
                      <tr>
                        <th className="pe-5">Mã Lô Thuốc</th>
                        <th className="pe-5"> Số Lô</th>
                        <th className="pe-5">Ngày Nhập </th>
                        <th className="pe-5">Ngày Sản Xuất</th>
                        <th className="pe-5">Ngày Hết Hạn</th>
                        <th className="pe-5">Số Lượng Nhập</th>
                        <th className="pe-5">Số Lượng Tồn</th>
                        <th className="pe-5">Giá Nhập</th>
                        <th className="pe-5">Giá Bán Sỉ</th>
                        <th className="pe-5">Giá Bán Lẻ</th>
                        <th className="pe-5">Nhà Cung Cấp</th>
                        <th className="pe-5">Nơi Sản Xuất</th>
                      </tr>
                    </thead>

                    <tbody>
                      {lichSus.map((lichSu) => (
                        <tr>
                          <td>{lichSu.maLoThuoc}</td>
                          <td>{lichSu.soLo}</td>
                          <td>
                            {format(
                              new Date(lichSu.ngayNhapLoThuoc),
                              "dd-MM-yyyy"
                            )}
                          </td>
                          <td>
                            {format(new Date(lichSu.ngaySanXuat), "dd-MM-yyyy")}
                          </td>
                          <td>
                            {format(new Date(lichSu.ngayHetHan), "dd-MM-yyyy")}
                          </td>
                          <td>{lichSu.soLuongNhap}</td>
                          <td>{lichSu.soLuongTon}</td>
                          <td className="fw-bold">
                            {VND.format(lichSu.giaNhap)}
                          </td>
                          <td className="fw-bold">
                            {VND.format(lichSu.giaBanSi)}
                          </td>
                          <td className="fw-bold">
                            {VND.format(lichSu.giaBanLe)}
                          </td>
                          <td>
                            {lichSu.nhaCungCap === null ? (
                              <BsThreeDots />
                            ) : (
                              lichSu.nhaCungCap.tenNhaCungCap
                            )}
                          </td>
                          <td>
                            {lichSu.nuocSanXuat === null
                              ? ""
                              : lichSu.nuocSanXuat.tenNuoc}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* Nhập Thuốc */}
            {isShowNhapThuoc && (
              <div className="container-fluid border shadow rounded my-3">
                <div className="row my-3">
                  <h4 className="text-info text-center fw-bold">Nhập Thuốc</h4>
                </div>
                <form
                  onSubmit={handleSubmit(onSubmitNhapThuoc)}
                  noValidate
                  className="form-control form-control-sm mb-2"
                >
                  <div className="form-group row my-3">
                    <label className="col-sm-3 col-form-label fw-bold text-info">
                      Số lượng
                    </label>
                    <div className="col-sm-3">
                      <input
                        {...register("soLuongNhap", {
                          required: true,
                          validate: validateSoLuongNhap,
                        })}
                        type="number"
                        min={1}
                        required
                        defaultValue={1}
                        className="form-control form-control-sm inputText"
                      />
                      {errors?.soLuongNhap?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập số lượng
                        </span>
                      )}
                      {errors.soLuongNhap && (
                        <span className="text-danger">
                          {errors.soLuongNhap.message}
                        </span>
                      )}
                    </div>
                    <label className="col-sm-2 col-form-label fw-bold text-info">
                      Giá Nhập
                    </label>
                    <div className="col-sm-4">
                      <input
                        {...register("giaNhap", {
                          required: true,
                          validate: validateSoLuongNhap,
                        })}
                        type="text"
                        required
                        defaultValue={1000}
                        className="form-control form-control-sm inputText"
                      />
                      {errors?.giaNhap?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập giá nhập thuốc
                        </span>
                      )}
                      {errors.giaNhap && (
                        <span className="text-danger">
                          {errors.giaNhap.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="form-group row my-3">
                    <label className="col-sm-3 col-form-label fw-bold text-info">
                      Giá bán sĩ (VNĐ)
                    </label>
                    <div className="col-sm-3">
                      <input
                        {...register("giaBanSi", {
                          required: true,
                          validate: validateSoLuongNhap,
                        })}
                        type="number"
                        required
                        defaultValue={1000}
                        className="form-control form-control-sm inputText"
                      />
                      {errors?.giaBanSi?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập giá bán sĩ
                        </span>
                      )}
                      {errors.giaBanSi && (
                        <span className="text-danger">
                          {errors.giaBanSi.message}
                        </span>
                      )}
                    </div>
                    <label className="col-sm-2 col-form-label fw-bold text-info">
                      Giá bán lẻ (VNĐ)
                    </label>
                    <div className="col-sm-4">
                      <input
                        {...register("giaBanLe", {
                          required: true,
                          validate: validateSoLuongNhap,
                        })}
                        type="number"
                        required
                        defaultValue={1000}
                        className="form-control form-control-sm inputText"
                      />
                      {errors?.giaBanLe?.type === "required" && (
                        <span className="text-danger">Vui lòng giá bán lẻ</span>
                      )}
                      {errors.giaBanSi && (
                        <span className="text-danger">
                          {errors.giaBanSi.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-3">
                    <label className="col-sm-3 col-form-label fw-bold text-info">
                      Số Lô
                    </label>
                    <div className="col-sm-9">
                      <input
                        {...register("soLo", {
                          required: true,
                        })}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                      {errors?.soLo?.type === "required" && (
                        <span className="text-danger">Vui lòng nhập số lô</span>
                      )}
                    </div>
                  </div>

                  {/* Ngày sản xuất ngày hết hạn */}
                  <div className="form-group row my-3 d-flex align-items-center">
                    <label className="col-sm-3 fw-bold text-info">
                      Ngày sản xuất:
                    </label>
                    <div className="col-sm-3">
                      <DatePicker
                        className="form-select  "
                        selected={ngaySanXuat}
                        onChange={(date) => setNgaySanXuat(date)}
                        dateFormat="yyyy/MM/dd"
                      />
                      {ngaySanXuat >= today && (
                        <span className="text-danger">
                          Ngày sản xuất phải nhỏ hơn ngày hiện tại
                        </span>
                      )}
                    </div>

                    <label className="col-sm-2 fw-bold  text-info">
                      Ngày hết hạn
                    </label>
                    <div className="col-sm-4">
                      <DatePicker
                        className="form-select  form-control-sm"
                        selected={ngayHetHan}
                        onChange={(date) => setNgayHetHan(date)}
                        dateFormat="yyyy/MM/dd"
                      />
                      {ngayHetHan <= today && (
                        <p className="text-danger">
                          Ngày hết hạn phải lớn hơn ngày hiện tại
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-3 d-flex align-items-center">
                    <label className="col-sm-3 fw-bold text-info">
                      Ngày nhập thuốc:
                    </label>
                    <div className="col-sm-3">
                      <DatePicker
                        className="form-select  "
                        selected={ngayNhapThuoc}
                        onChange={(date) => setNgayNhapThuoc(date)}
                        dateFormat="yyyy/MM/dd"
                      />
                    </div>
                  </div>
                  {/* nhà cung cấp */}
                  <div className="form-group row my-2  d-flex align-items-center">
                    <label className="col-sm-3 col-form-label fw-bold text-info">
                      Nhà Cung Cấp:
                    </label>
                    <div className="col-sm-3">
                      <select
                        className="form-select"
                        value={selectedNCC}
                        defaultValue={nhaCungCap[0]}
                        onChange={(e) => {
                          setNCC(e.target.value);
                        }}
                      >
                        {nhaCungCap.map((nhaCungCap) => (
                          <option
                            key={nhaCungCap.maNhaCungCap}
                            value={nhaCungCap.maNhaCungCap}
                          >
                            {nhaCungCap.tenNhaCungCap}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-sm-3">
                      <ModalAddNhaCungCap1 setNhaCungCap={setNhaCungCap} />
                    </div>
                  </div>
                  {/* nước sản xuất */}
                  <div className="form-group row my-2  d-flex align-items-center">
                    <label className="col-sm-3 col-form-label fw-bold text-info">
                      Nơi Sản Xuất
                    </label>
                    <div className="col-sm-3">
                      <select
                        className="form-select"
                        value={selectedNSX}
                        defaultValue={nuocSanXuat[0]}
                        onChange={(e) => {
                          setNSX(e.target.value);
                        }}
                      >
                        {nuocSanXuat.map((nuocSanXuat) => (
                          <option
                            key={nuocSanXuat.maNuoc}
                            value={nuocSanXuat.maNuoc}
                          >
                            {nuocSanXuat.tenNuoc}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-sm-3">
                      <ModalAddNuocSanXuat1 setNuocSanXuat={setNuocSanXuat} />
                    </div>
                  </div>
                  <div className="row d-flex justify-content-between mx-2">
                    <button
                      type="button"
                      className="btn btn-danger btn-sm my-3 w-25"
                      onClick={toggleShowNhapThuoc}
                    >
                      Hủy
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm my-3 w-25"
                    >
                      Nhập thuốc
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentChiTietThuoc;
