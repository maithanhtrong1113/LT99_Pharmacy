import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import ModalAddThuoc from "../Modal/ModalAddThuoc";
import {
  BsCheck2,
  BsFillCartCheckFill,
  BsFillPlusCircleFill,
  BsSearch,
} from "react-icons/bs";
import NguoiDung from "./NguoiDung";
import DatePicker from "react-datepicker";

import {
  AiOutlineClose,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
const onSubmit = (data) => {
  console.log(data);
};
const ContentBanThuoc = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({});
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
  const [searchTerm, setSearchTerm] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [timeoutId1, setTimeoutId1] = useState(null);
  const [dsThuoc, setDsThuoc] = useState([]);
  const [dsNhap, setDsNhap] = useState([]);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [dsKhachHang, setDsKhachHang] = useState([]);
  const [name, setName] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [diaChi, setDiaChi] = useState("");
  const [gioiTinh, setGioiTinh] = useState("");
  const [ngaySinh, setNgaySinh] = useState(new Date());
  const [khachHangCoSan, setKhachHangCoSan] = useState({
    hoTen: "trong",
    soDienThoai: "0925562559",
    diaChi: "NguyenKiem",
    gioiTinh: "Nữ",
    ngaySinh: "2000/11/13",
  });

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log(dsThuoc);
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
      setDsThuoc([]);
    }
  };
  const handleInputChange1 = (event) => {
    const searchTerm1 = event.target.value;
    setSearchTerm1(searchTerm1);

    if (timeoutId1) {
      clearTimeout(timeoutId1); // Xóa timeout trước đó nếu còn tồn tại
    }

    if (searchTerm1.length > 0) {
      const newTimeoutId1 = setTimeout(() => {
        fetch(
          `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/tim-thuoc?keyword=${encodeURIComponent(
            searchTerm1
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (results.length > 0) setDsKhachHang(results);
            else {
              setDsKhachHang([]);
            }
          });
      }, 500);
      setTimeoutId(newTimeoutId1);
    } else {
      setDsKhachHang([]);
    }
  };
  const removeThuocNhap = (maThuoc) => {
    const isThuocExist = dsNhap.find((item) => item.maThuoc === maThuoc);
    if (isThuocExist.soLuongBan === 1) {
      setDsNhap(dsNhap.filter((item) => item.maThuoc !== maThuoc));
    } else {
      isThuocExist.soLuongBan--;
      setDsNhap([...dsNhap]);
    }
  };
  const addThuocNhap = (maThuoc) => {
    const isThuocExist = dsNhap.find((item) => item.maThuoc === maThuoc);
    isThuocExist.soLuongBan++;
    if (isThuocExist.soLuongBan > isThuocExist.soLuong)
      isThuocExist.soLuongBan = isThuocExist.soLuong;
    setDsNhap([...dsNhap]);
  };
  const NhapSoLuong = (maThuoc, soLuongBan) => {
    const isThuocExist = dsNhap.find((item) => item.maThuoc === maThuoc);
    isThuocExist.soLuongBan = parseInt(soLuongBan);
    if (isThuocExist.soLuongBan > isThuocExist.soLuong)
      isThuocExist.soLuongBan = isThuocExist.soLuong;
    setDsNhap([...dsNhap]);
  };
  function kiemTraSoDienThoai(soDienThoai) {
    const re = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/; // Biểu thức chính quy để kiểm tra số điện thoại
    return re.test(soDienThoai);
  }
  const [nameFocus, setNameFocus] = useState(false);
  const [soDienThoaiFocus, setSoDienThoaiFocus] = useState(false);
  const [diaChiFocus, setDiaChiFocus] = useState(false);
  const hanleFocusName = () => {
    setNameFocus(true);
  };
  const hanleFocusSoDienThoai = () => {
    setSoDienThoaiFocus(true);
  };
  const hanleFocusDiaChi = () => {
    setDiaChiFocus(true);
  };
  const submitHanler = (e) => {
    e.preventDefault();
    console.log(
      name,
      diaChi,
      soDienThoai,
      gioiTinh,
      ngaySinh.toLocaleDateString("vi-VN")
    );
  };
  return (
    <Fragment>
      <div className="container-fluid">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 ">
            <NguoiDung />
            <form
              className="container border shadow rounded "
              onSubmit={submitHanler}
              noValidate
            >
              {/* thông tin khách hàng */}
              <div className="row my-3">
                <div className="col-5">
                  <div className="position-relative">
                    {/* tìm kiếm khách hàng */}
                    <input
                      type="text"
                      placeholder="Nhập tên hoặc số điện thoại của khách hàng"
                      className="form-control w-100 px-2 shadow"
                      value={searchTerm1}
                      onChange={handleInputChange1}
                    />

                    <BsSearch className="position-absolute localIconSearch text-dark shadow pointer " />

                    {dsKhachHang.length !== 0 && (
                      <div className="position-absolute container border rounded bg-light">
                        {dsKhachHang.map((khachHang) => (
                          <button
                            type="button"
                            className="text-dark w-100 btn btn-light d-flex justify-content-between align-items-center my-1 border "
                            onClick={() => {
                              setKhachHangCoSan(khachHang);
                            }}
                          >
                            <span>{khachHang.hoTen}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-7"></div>
                <div className="col-9 my-3">
                  <div className="container border shadow rounded p-4">
                    <h4 className="text-center fw-bold text-info">
                      Thông tin khách hàng
                    </h4>
                    <div className="row d-flex align-items-center my-3">
                      <div className="col-3">
                        <label className="fw-bold">Tên</label>
                      </div>
                      <div className="col-9">
                        <input
                          value={name}
                          onFocus={hanleFocusName}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="form-control inputText"
                        />
                      </div>
                      {name === "" && nameFocus && (
                        <>
                          <div className="col-3"></div>
                          <span className="text-danger col-9">
                            Vui lòng nhập tên
                          </span>
                        </>
                      )}
                    </div>
                    <div className="row d-flex align-items-center my-3">
                      <div className="col-3">
                        <label className="fw-bold">Số điện thoại</label>
                      </div>
                      <div className="col-9">
                        <input
                          value={soDienThoai}
                          onChange={(e) => setSoDienThoai(e.target.value)}
                          onFocus={hanleFocusSoDienThoai}
                          type="text"
                          className="form-control inputText"
                        />
                      </div>
                      {soDienThoaiFocus && soDienThoai === "" && (
                        <>
                          <div className="col-3"></div>
                          <span className="col-9 text-danger">
                            Vui lòng nhập số điện thoại
                          </span>
                        </>
                      )}
                      {!kiemTraSoDienThoai(soDienThoai) &&
                        soDienThoai !== "" && (
                          <>
                            <div className="col-3"></div>
                            <span className="col-9 text-danger">
                              Số điện thoại không tồn tại
                            </span>
                          </>
                        )}
                    </div>
                    <div className="row d-flex align-items-center my-3">
                      <div className="col-3">
                        <label className="fw-bold">Địa chỉ</label>
                      </div>
                      <div className="col-9">
                        <input
                          onFocus={hanleFocusDiaChi}
                          type="text"
                          value={diaChi}
                          onChange={(e) => setDiaChi(e.target.value)}
                          className="form-control inputText"
                        />
                      </div>
                      {diaChiFocus && diaChi === "" && (
                        <>
                          <div className="col-3"></div>
                          <span className="col-9 text-danger">
                            Vui lòng nhập địa chỉ
                          </span>
                        </>
                      )}
                    </div>
                    <div className="row d-flex align-items-center my-3">
                      <div className="col-3">
                        <label className="fw-bold">Giới tính</label>
                      </div>
                      <div className="col-3">
                        <select
                          {...register("gioiTinh")}
                          className="w-100 form-control"
                          value={gioiTinh}
                          onChange={(e) => setGioiTinh(e.target.value)}
                        >
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      </div>
                      <div className="col-3">
                        <label className="fw-bold">Ngày sinh</label>
                      </div>
                      <div className="col-3">
                        <DatePicker
                          className="form-select"
                          selected={ngaySinh}
                          onChange={(date) => setNgaySinh(date)}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        setName(khachHangCoSan.hoTen);
                        setSoDienThoai(khachHangCoSan.soDienThoai);
                        setDiaChi(khachHangCoSan.diaChi);
                        setGioiTinh(khachHangCoSan.gioiTinh);
                        setNgaySinh(new Date(khachHangCoSan.ngaySinh));
                      }}
                    >
                      Set Thông tin
                    </button>
                  </div>
                </div>
              </div>

              {/* thêm thuốc cho hóa đơn */}
              <div className="row my-3 d-flex align-items-center">
                <div className="col-5">
                  <div className="position-relative">
                    <input
                      type="text"
                      placeholder="Nhập tên hoặc công dụng của thuốc muốn tìm"
                      className="form-control w-100 px-2 shadow"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                    <BsSearch className="position-absolute localIconSearch text-dark shadow pointer" />

                    {dsThuoc.length !== 0 && (
                      <div className="position-absolute container border rounded bg-light">
                        {dsThuoc.map((thuoc) => (
                          <button
                            type="button"
                            className="text-dark w-100 btn btn-light d-flex justify-content-between align-items-center my-1 border "
                            onClick={() => {
                              if (thuoc.soLuong === 0) return;
                              const isThuocExist = dsNhap.find(
                                (item) => item.maThuoc === thuoc.maThuoc
                              );
                              if (isThuocExist) {
                                isThuocExist.soLuongBan++;
                                setDsNhap([...dsNhap]);
                              } else {
                                thuoc.soLuongBan = 1;
                                setDsNhap([...dsNhap, thuoc]);
                              }
                            }}
                          >
                            <span className="fw-bold">{thuoc.tenThuoc}</span>
                            <div>
                              {thuoc.soLuong > 1 && (
                                <>
                                  <span className="text-muted  ">{`Số lượng tồn: ${thuoc.soLuong} `}</span>
                                  <AiOutlinePlusCircle className="text-info" />
                                </>
                              )}
                              {thuoc.soLuong < 1 && (
                                <span className="text-danger">{`Số lượng tồn: ${thuoc.soLuong} `}</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <span className="fst-italic text-info">
                    Danh sách thuốc khách hàng mua
                  </span>
                  <table className="table table-striped table-bordered table-sm shadow border-rounded">
                    <thead>
                      <tr className="text-center">
                        <th>Mã thuốc</th>
                        <th>Tên thuốc</th>
                        <th>Số lượng</th>
                        <th>Đơn vị tính</th>
                        <th>Liều lượng</th>
                        <th>Thuốc kê đơn</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {dsNhap.map((thuoc) => (
                        <tr key={thuoc.maThuoc} className="text-center">
                          <td>{thuoc.maThuoc}</td>
                          <td>{thuoc.tenThuoc}</td>
                          <td className="w-10 ">
                            <input
                              type="number"
                              value={thuoc.soLuongBan}
                              min={1}
                              onChange={(e) => {
                                if (
                                  e.target.value <= 0 ||
                                  e.target.value === ""
                                ) {
                                  e.target.value = 1;
                                }
                                NhapSoLuong(thuoc.maThuoc, e.target.value);
                              }}
                              className="fw-bold form-control text-center"
                            />
                            <span className=" text-muted">{`Tồn: ${thuoc.soLuong}`}</span>
                          </td>

                          <td>{thuoc.donViTinh}</td>
                          <td>{thuoc.lieuLuong}</td>
                          {thuoc.thuocKeDon && (
                            <td>
                              <BsCheck2 className="text-success fs-20 mt-3 " />
                            </td>
                          )}
                          {!thuoc.thuocKeDon && (
                            <td className="fw-bold ">
                              <AiOutlineClose className="text-danger fs-27 mt-3 " />
                            </td>
                          )}
                          <td>
                            <button
                              className="btn btn-sm bg-danger mx-2 px-2 mt-3 shadow"
                              onClick={() => removeThuocNhap(thuoc.maThuoc)}
                            >
                              <AiOutlineMinusCircle className="text-dark" />
                            </button>
                            <button
                              className="btn btn-sm bg-info mx-2 mt-3 shadow"
                              onClick={() => addThuocNhap(thuoc.maThuoc)}
                            >
                              <BsFillPlusCircleFill className="text-white " />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {dsNhap.length !== 0 && (
                <div className="col-3 mb-3">
                  <button
                    className="btn btn-primary d-flex align-items-center"
                    type="Submit"
                  >
                    <BsFillCartCheckFill className="fs-5 me-2" />
                    Tạo Hóa Đơn
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentBanThuoc;
