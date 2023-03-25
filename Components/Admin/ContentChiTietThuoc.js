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
  const { id } = router.query;
  const [isShow, setIsShow] = useState(false);
  const toggleShow = () => setIsShow(!isShow);
  const [isShowNhapThuoc, setIsShowNhapThuoc] = useState(false);
  const toggleShowNhapThuoc = () => setIsShowNhapThuoc(!isShowNhapThuoc);
  const [lichSus, setLichSus] = useState([]);
  const today = new Date();
  const [ngaySanXuat, setNgaySanXuat] = useState(
    today.getTime() - 24 * 60 * 60 * 1000
  );
  const [ngayHetHan, setNgayHetHan] = useState(
    today.getTime() + 24 * 60 * 60 * 1000
  );
  const validateSoLuongNhap = (value) => {
    if (value <= 0) {
      return "Giá trị phải lớn hơn 0";
    }
    return true;
  };
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

  const onSubmitNhapThuoc = (dataa) => {
    if (ngayHetHan <= today || ngaySanXuat >= today) return;
    console.log(
      dataa.soLo,
      dataa.soLuongNhap,
      today.toLocaleDateString("en-CA"),
      format(new Date(ngaySanXuat), "yyyy-MM-dd"),
      format(new Date(ngayHetHan), "yyyy-MM-dd")
    );
    fetch(
      `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/thuoc/${id}/nhap-thuoc`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          soLo: dataa.soLo,
          ngayNhapLoThuoc: today.toLocaleDateString("en-CA"),
          ngaySanXuat: format(new Date(ngaySanXuat), "yyyy-MM-dd"),
          ngayHetHan: format(new Date(ngayHetHan), "yyyy-MM-dd"),
          soLuongNhap: dataa.soLuongNhap,
        }),
      }
    ).then((response) => {
      if (response.ok) {
        toast.success("Nhập thuốc thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      } else {
        toast.error("Nhập thuốc không thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      }
    });
    router.push("/admin/thuoc");
  };
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
                        <div className="row ">
                          <div className="col-4">
                            <button
                              className="btn btn-warning me-2"
                              type="submit"
                            >
                              Sửa thông tin thuốc
                            </button>
                            <button
                              className="btn btn-secondary ms-2"
                              type="button"
                              onClick={() => {
                                router.push("/admin/thuoc");
                              }}
                            >
                              Hủy
                            </button>
                          </div>
                          <div className="col-8 text-end">
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
                        <th className="pe-5">Nước Sản Xuất</th>
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
                              "yyyy-MM-dd"
                            )}
                          </td>
                          <td>
                            {format(new Date(lichSu.ngaySanXuat), "yyyy-MM-dd")}
                          </td>
                          <td>
                            {format(new Date(lichSu.ngayHetHan), "yyyy-MM-dd")}
                          </td>
                          <td>{lichSu.soLuongNhap}</td>
                          <td>{lichSu.soLuongTon}</td>
                          <td>{lichSu.giaNhap}</td>
                          <td>{lichSu.giaBanSi}</td>
                          <td>{lichSu.giaBanLe}</td>
                          <td>{lichSu.nhaCungCap}</td>
                          <td>{lichSu.nuocSanXuat}</td>
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
                      Số Lô
                    </label>
                    <div className="col-sm-4">
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
                  {/* Số Lô  Số Lượng*/}
                  <div className="form-group row my-3"></div>
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

                  <button type="submit" className="btn btn-primary my-3">
                    Nhập Thuốc
                  </button>
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
