import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useReactToPrint } from "react-to-print";
import {
  BsCheck2,
  BsFillCartCheckFill,
  BsFillPlusCircleFill,
  BsSearch,
  BsTrash,
} from "react-icons/bs";
import NguoiDung from "./NguoiDung";
import DatePicker from "react-datepicker";
import {
  AiFillCloseCircle,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlinePrinter,
} from "react-icons/ai";
import { useForm } from "react-hook-form";
import { MdOutlineClose } from "react-icons/md";
import HoaDonKhongKeDon from "./HoaDonKhongKeDon";
import { toast } from "react-toastify";
import VND from "../utils/formatVND";
import khachHang from "@/pages/admin/khachHang";
import PrintInvoice from "./PrintInvoice";
import { useRef } from "react";
import Image from "next/image";
const ContentBanThuoc = () => {
  const {
    register,

    formState: { errors },
  } = useForm({});

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
  const [gioiTinh, setGioiTinh] = useState("Nam");
  const [ngaySinh, setNgaySinh] = useState(new Date());
  const [khachHangCoSan, setKhachHangCoSan] = useState({});
  const [dsNhap1, setDsNhap1] = useState([]);
  const [optionThuoc, setOptionThuoc] = useState("Chỉ thuốc kê đơn");
  const [tab, setTab] = useState("KeDon");
  const [noiKham, setNoiKham] = useState("");
  const [noiKhamFocus, setNoiKhamFocus] = useState(false);
  const [bacSi, setBacSi] = useState("");
  const [bacSiFocus, setBacSiFocus] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);
  const [soDienThoaiFocus, setSoDienThoaiFocus] = useState(false);
  const [tongTienHoaDon, setTongTienHoaDon] = useState(0);
  const [tongTienHoaDon1, setTongTienHoaDon1] = useState(0);
  const [showIn, setShowIn] = useState(false);
  const [showIn1, setShowIn1] = useState(false);
  useEffect(() => {
    if (tab === "KhongKeDon") {
      setOptionThuoc("Chỉ thuốc không kê đơn");
    }
    setTongTienHoaDon(0);
    dsNhap.forEach((item) => {
      setTongTienHoaDon((prev) => (prev += item.thuoc.thanhTien));
    });
    setTongTienHoaDon1(0);
    dsNhap1.forEach((item) => {
      setTongTienHoaDon1((prev) => (prev += item.thuoc.thanhTien));
    });
  }, [tab, dsNhap, dsNhap1]);
  const idNhanVien = localStorage.getItem("id");
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log(dsThuoc);
    if (timeoutId) {
      clearTimeout(timeoutId); // Xóa timeout trước đó nếu còn tồn tại
    }

    if (searchTerm.length > 0) {
      const newTimeoutId = setTimeout(() => {
        //all
        if (optionThuoc === "Tất cả") {
          fetch(
            `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/tim-thuoc?keyword=${encodeURIComponent(
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
        } else if (optionThuoc === "Chỉ thuốc kê đơn") {
          fetch(
            `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/danh-sach-thuoc-ke-don?keyword=${encodeURIComponent(
              searchTerm
            )}`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((results) => {
              if (results.length > 0) setDsThuoc(results.slice(0, 5));
              else {
                setDsThuoc([]);
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        } else if (optionThuoc === "Chỉ thuốc không kê đơn") {
          fetch(
            `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/danh-sach-thuoc-khong-ke-don?keyword=${encodeURIComponent(
              searchTerm
            )}`
          )
            .then((response) => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then((results) => {
              if (results.length > 0) setDsThuoc(results.slice(0, 5));
              else {
                setDsThuoc([]);
              }
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      setDsThuoc([]);
    }
  };
  const [trachNhiem, setTrachNhiem] = useState(false);
  const handleInputChange1 = (event) => {
    const searchTerm1 = event.target.value;
    setSearchTerm1(searchTerm1);

    if (timeoutId1) {
      clearTimeout(timeoutId1); // Xóa timeout trước đó nếu còn tồn tại
    }

    if (searchTerm1.length > 0) {
      const newTimeoutId1 = setTimeout(() => {
        fetch(
          `http://localhost:8080/QLNT-Server/nhan-vien/quan-ly-khach-hang/tim-khach-hang?keyword=${encodeURIComponent(
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
      setTimeoutId1(newTimeoutId1);
    } else {
      setDsKhachHang([]);
    }
  };
  const removeThuocNhap = (maThuoc) => {
    const isThuocExist = dsNhap.find((item) => item.thuoc.maThuoc === maThuoc);
    if (isThuocExist.thuoc.soLuongBan === 1) {
      setDsNhap(dsNhap.filter((item) => item.thuoc.maThuoc !== maThuoc));
    } else {
      isThuocExist.thuoc.soLuongBan--;
      console.log(isThuocExist.thuoc.soLuongBan);
      isThuocExist.thuoc.thanhTien =
        isThuocExist.giaBanLe * isThuocExist.thuoc.soLuongBan;

      setDsNhap([...dsNhap]);
    }
  };
  const removeThuoc = (maThuoc) => {
    setDsNhap(dsNhap.filter((item) => item.thuoc.maThuoc !== maThuoc));
  };
  const removeALL = () => {
    setDsNhap([]);
  };
  const addThuocNhap = (maThuoc) => {
    const isThuocExist = dsNhap.find((item) => item.thuoc.maThuoc === maThuoc);
    isThuocExist.thuoc.soLuongBan++;

    if (isThuocExist.thuoc.soLuongBan > isThuocExist.thuoc.soLuong)
      isThuocExist.thuoc.soLuongBan = isThuocExist.thuoc.soLuong;
    isThuocExist.thuoc.thanhTien =
      isThuocExist.giaBanLe * isThuocExist.thuoc.soLuongBan;
    setDsNhap([...dsNhap]);
  };

  const NhapSoLuong = (maThuoc, soLuongBan) => {
    const isThuocExist = dsNhap.find((item) => item.thuoc.maThuoc === maThuoc);
    isThuocExist.thuoc.soLuongBan = parseInt(soLuongBan);
    if (isThuocExist.thuoc.soLuongBan > isThuocExist.thuoc.soLuong)
      isThuocExist.thuoc.soLuongBan = isThuocExist.thuoc.soLuong;
    isThuocExist.thuoc.thanhTien =
      isThuocExist.giaBanLe * isThuocExist.thuoc.soLuongBan;
    setDsNhap([...dsNhap]);
  };

  function kiemTraSoDienThoai(soDienThoai) {
    const re = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/; // Biểu thức chính quy để kiểm tra số điện thoại
    return re.test(soDienThoai);
  }

  const hanleFocusName = () => {
    setNameFocus(true);
  };
  const hanleFocusSoDienThoai = () => {
    setSoDienThoaiFocus(true);
  };

  const hanleFocusBacSi = () => {
    setBacSiFocus(true);
  };
  const hanleFocusNoiKham = () => {
    setNoiKhamFocus(true);
  };
  const submitHanler = (e) => {
    e.preventDefault();
    if (name === "") {
      setNameFocus(true);
    }
    if (soDienThoai === "") {
      setSoDienThoaiFocus(true);
    }

    if (name === "" || soDienThoai === "") {
      return;
    }
    if (tab === "KeDon" && name === "") {
      return;
    }

    // Lập Hóa Đơn Kê Đơn
    if (tab === "KeDon") {
      // Hóa đơn kê đơn
      let dsXuat = dsNhap.map((thuoc) => {
        return {
          thuoc: {
            maThuoc: thuoc.thuoc.maThuoc,
          },
          soLuongThuocBan: thuoc.thuoc.soLuongBan,
        };
      });
      if (bacSi === "" || noiKham === "") {
        for (let i = 0; i < dsNhap.length; i++) {
          if (dsNhap[i].thuoc.isThuocKeDon === true) {
            setTrachNhiem(true);
          }
        }
      }

      fetch(
        `http://localhost:8080/QLNT-Server/nhan-vien/hoa-don/lap-hoa-don-theo-toa`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nhanVienBanHang: { maNhanVien: idNhanVien },
            khachHang: {
              maKhachHang: khachHangCoSan.maKhachHang,
            },
            bacSiChiDinh: bacSi,
            noiKham: noiKham,
            dsHoaDon: dsXuat,
          }),
        }
      ).then((response) => {
        if (response.ok) {
          toast.success("Thêm hóa đơn thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            theme: "light",
          });
          setShowIn(true);
        } else {
          toast.error("Thêm hóa đơn không thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            theme: "light",
          });
        }
      });
    } else {
      //Hóa đơn không kê đơn
      let dsXuat = dsNhap1.map((thuoc) => {
        return {
          thuoc: {
            maThuoc: thuoc.thuoc.maThuoc,
          },
          soLuongThuocBan: thuoc.thuoc.soLuongBan,
        };
      });

      fetch(
        `http://localhost:8080/QLNT-Server/nhan-vien/hoa-don/lap-hoa-don-khong-theo-toa`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nhanVienBanHang: { maNhanVien: idNhanVien },
            khachHang: {
              maKhachHang: khachHangCoSan.maKhachHang,
            },

            dsHoaDon: dsXuat,
          }),
        }
      ).then((response) => {
        if (response.ok) {
          toast.success("Thêm hóa đơn thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            theme: "light",
          });
          setShowIn1(true);
        } else {
          toast.error("Thêm hóa đơn không thành công", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            theme: "light",
          });
        }
      });
    }
  };
  //set Thong Tin vào input
  const setThongTin = (khachHangCoSan) => {
    if (Object.keys(khachHangCoSan).length === 0) {
      setName("");
      setSoDienThoai("");
      setKhachHangCoSan({});
      return;
    }
    setName(khachHangCoSan.hoTen);
    setSoDienThoai(khachHangCoSan.soDienThoai);
  };
  const themKhachHangMoi = () => {
    if (name === "" || soDienThoai === "") {
      toast.error("Vui Lòng Nhập Đầy Đủ Thông Tin", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        theme: "light",
      });
      return;
    }

    fetch(
      "http://localhost:8080/QLNT-Server/nhan-vien/quan-ly-khach-hang/khach-hang",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hoTen: name,
          soDienThoai: soDienThoai,
        }),
      }
    )
      .then((response) => response.json())
      .then((results) => {
        setThongTin(results);
        setKhachHangCoSan(results);
        toast.success("Thêm khách hàng thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      });
  };
  const componentPDF = useRef();

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
  });

  return (
    <Fragment>
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 border shadow">
            <NguoiDung />
            <div className="d-flex my-3 justify-content-between border shadow">
              <div className="col-6">
                <button
                  type="button"
                  className={`btn btn-light w-100 ${
                    tab === "KeDon" ? "active" : ""
                  }`}
                  onClick={() => setTab("KeDon")}
                >
                  Lập hóa đơn kê đơn
                </button>
              </div>
              <div className="col-6">
                <button
                  className={`btn btn-light w-100 ${
                    tab === "KhongKeDon" ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setTab("KhongKeDon")}
                >
                  Lập hóa đơn không kê đơn
                </button>
              </div>
            </div>
            <div className="col-12">
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
                      <div className="position-absolute container border rounded bg-light ">
                        {dsKhachHang.map((khachHang) => (
                          <button
                            type="button"
                            className="text-dark w-100 btn btn-light d-flex justify-content-between align-items-center my-2 border "
                            onClick={() => {
                              setKhachHangCoSan(khachHang);
                              setThongTin(khachHang);
                            }}
                          >
                            <span>{khachHang.hoTen}</span>
                            <span>{khachHang.soDienThoai}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-4"></div>

                <div className={`${tab === "KeDon" ? "col-7" : "col-9"} my-3`}>
                  <div className="container border shadow rounded p-4">
                    <h4 className="text-center fw-bold text-info">
                      Thông tin khách hàng
                    </h4>
                    <div className="row d-flex align-items-center my-3">
                      <div className="col-3">
                        <label className="fw-bold">Tên</label>
                      </div>
                      <div className="col-9">
                        {Object.keys(khachHangCoSan).length === 0 && (
                          <input
                            value={name}
                            onFocus={hanleFocusName}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="form-control inputText "
                          />
                        )}
                        {Object.keys(khachHangCoSan).length !== 0 && (
                          <input
                            value={name}
                            onFocus={hanleFocusName}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            readOnly
                            className="form-control inputText opacity-50"
                          />
                        )}

                        {name === "" && nameFocus && (
                          <>
                            <div className="col-3"></div>
                            <span className="text-danger col-9">
                              Vui lòng nhập tên khách hàng
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row d-flex align-items-center my-3">
                      <div className="col-3">
                        <label className="fw-bold">Số điện thoại</label>
                      </div>
                      <div className="col-9">
                        {Object.keys(khachHangCoSan).length === 0 && (
                          <input
                            value={soDienThoai}
                            onChange={(e) => setSoDienThoai(e.target.value)}
                            onFocus={hanleFocusSoDienThoai}
                            type="text"
                            className="form-control inputText"
                          />
                        )}
                        {Object.keys(khachHangCoSan).length !== 0 && (
                          <input
                            value={soDienThoai}
                            onChange={(e) => setSoDienThoai(e.target.value)}
                            onFocus={hanleFocusSoDienThoai}
                            type="text"
                            readOnly
                            className="form-control inputText opacity-50"
                          />
                        )}

                        {soDienThoai === "" && soDienThoaiFocus && (
                          <>
                            <div className="col-3"></div>
                            <span className="text-danger col-9">
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
                    </div>
                    {/* <div className="row d-flex align-items-center my-3">
                      <div className="col-3">
                        <label className="fw-bold">Địa chỉ</label>
                      </div>
                      <div className="col-9">
                        <input
                          type="text"
                          value={diaChi}
                          onChange={(e) => setDiaChi(e.target.value)}
                          className="form-control inputText "
                        />
                      </div>
                    </div> */}
                    <div className="row d-flex align-items-center my-3">
                      {/* <div className="col-3">
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
                      <div className="col-2 px-0">
                        <label className="fw-bold">Ngày sinh</label>
                      </div>
                      <div className="col-4">
                        <DatePicker
                          className="form-select"
                          selected={ngaySinh}
                          onChange={(date) => setNgaySinh(date)}
                          dateFormat="dd-MM-yyyy"
                        />
                      </div> */}
                      <div className="d-flex justify-content-between">
                        {Object.keys(khachHangCoSan).length === 0 && (
                          <button
                            className="btn btn-primary my-3 w-25 btn-sm"
                            type="button"
                            onClick={themKhachHangMoi}
                          >
                            Thêm khách hàng
                          </button>
                        )}
                        {Object.keys(khachHangCoSan).length !== 0 && (
                          <button
                            className="btn btn-warning my-3 w-25 float-right btn-sm"
                            type="button"
                            onClick={() => setThongTin({})}
                          >
                            Xóa thông tin nhập
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {tab === "KeDon" && (
                  <div className="col-5 my-3">
                    <div className="container border shadow rounded p-4 ">
                      <h4 className="text-info fw-bold text-center">
                        Thông tin nơi cấp đơn thuốc
                      </h4>
                      <div className="row d-flex align-items-center my-3 ">
                        <div className="col-4">
                          <label className="fw-bold">Nơi khám</label>
                        </div>
                        <div className="col-8">
                          <input
                            value={noiKham}
                            onFocus={hanleFocusNoiKham}
                            onChange={(e) => setNoiKham(e.target.value)}
                            type="text"
                            className="form-control inputText"
                          />
                        </div>
                      </div>
                      <div className="row d-flex align-items-center my-3">
                        <div className="col-4">
                          <label className="fw-bold">Phiếu Khám</label>
                        </div>
                        <div className="col-8">
                          <input
                            value={bacSi}
                            onChange={(e) => setBacSi(e.target.value)}
                            onFocus={hanleFocusBacSi}
                            type="text"
                            className="form-control inputText"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <form
              className="container border shadow rounded "
              onSubmit={submitHanler}
              noValidate
            >
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
                      <div className="position-absolute container border rounded bg-light widthThuoc localTimKiemshow localTimKiem1">
                        {dsThuoc.map((thuoc) => (
                          <button
                            type="button"
                            className="text-dark w-100 btn btn-light d-flex justify-content-between align-items-center my-1 border"
                            onClick={() => {
                              if (tab === "KeDon") {
                                if (thuoc.thuoc.soLuong === 0) return;
                                const isThuocExist = dsNhap.find(
                                  (item) =>
                                    item.thuoc.maThuoc === thuoc.thuoc.maThuoc
                                );
                                if (isThuocExist) {
                                  isThuocExist.thuoc.soLuongBan++;
                                  if (
                                    isThuocExist.thuoc.soLuongBan >
                                    isThuocExist.thuoc.soLuong
                                  )
                                    isThuocExist.thuoc.soLuongBan =
                                      isThuocExist.thuoc.soLuong;
                                  isThuocExist.thuoc.thanhTien =
                                    thuoc.giaBanLe *
                                    isThuocExist.thuoc.soLuongBan;
                                  setDsNhap([...dsNhap]);
                                } else {
                                  thuoc.thuoc.soLuongBan = 1;
                                  thuoc.thuoc.thanhTien = thuoc.giaBanLe;
                                  setDsNhap([...dsNhap, thuoc]);
                                }
                              } else {
                                if (thuoc.thuoc.soLuong === 0) return;
                                const isThuocExist = dsNhap1.find(
                                  (item) =>
                                    item.thuoc.maThuoc === thuoc.thuoc.maThuoc
                                );
                                if (isThuocExist) {
                                  isThuocExist.thuoc.soLuongBan++;
                                  if (
                                    isThuocExist.thuoc.soLuongBan >
                                    isThuocExist.thuoc.soLuong
                                  )
                                    isThuocExist.thuoc.soLuongBan =
                                      isThuocExist.thuoc.soLuong;
                                  isThuocExist.thuoc.thanhTien =
                                    thuoc.giaBanLe *
                                    isThuocExist.thuoc.soLuongBan;
                                  setDsNhap1([...dsNhap1]);
                                } else {
                                  thuoc.thuoc.soLuongBan = 1;
                                  thuoc.thuoc.thanhTien = thuoc.giaBanLe;
                                  setDsNhap1([...dsNhap1, thuoc]);
                                }
                              }
                            }}
                          >
                            <span className="fw-bold">
                              {thuoc.thuoc.tenThuoc}
                            </span>
                            <div>
                              {thuoc.thuoc.soLuong >= 1 && (
                                <>
                                  <span className="text-muted  ">{`Số lượng tồn: ${thuoc.thuoc.soLuong} `}</span>
                                  {/* <AiOutlinePlusCircle className="text-info" /> */}
                                </>
                              )}
                              {thuoc.thuoc.soLuong < 1 && (
                                <span className="text-danger">{`Số lượng tồn: ${thuoc.thuoc.soLuong} `}</span>
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {tab === "KeDon" && (
                  <div className="col-3">
                    <select
                      className="form-select form-select-sm "
                      value={optionThuoc}
                      onChange={(e) => {
                        setOptionThuoc(e.target.value);
                      }}
                    >
                      <option value="Tất cả">Tất cả thuốc</option>
                      <option value="Chỉ thuốc kê đơn">Chỉ thuốc kê đơn</option>

                      <option value="Chỉ thuốc không kê đơn">
                        Chỉ thuốc không kê đơn
                      </option>
                    </select>
                  </div>
                )}
              </div>
              {tab === "KeDon" && (
                <div className="row">
                  <div className="col-12">
                    <div className="d-flex justify-content-between my-1 align-items-center">
                      <span className="fst-italic text-info ">
                        Danh sách thuốc khách hàng mua
                      </span>
                      {dsNhap.length !== 0 && (
                        <button
                          className="btn btn-danger"
                          type="button"
                          onClick={removeALL}
                        >
                          <BsTrash className="fs-16" />
                        </button>
                      )}
                    </div>
                    <div ref={componentPDF}>
                      <div className="container hide">
                        <div className="row">
                          <div className="col-6">
                            <Image
                              src="/images/logo.png"
                              className="img-fluid rounded mx-5 my-2 "
                              width={100}
                              height={100}
                              priority
                              alt=""
                            />
                          </div>
                          <div className="col-6 mt-4">
                            <b>Loại Hóa đơn:</b> Hóa đơn kê đơn
                            <br />
                            <b>Ngày: </b>
                            {new Date().toLocaleDateString("vi-VN")}
                            {`      ${new Date()
                              .getHours()
                              .toString()
                              .padStart(2, "0")}: ${new Date()
                              .getMinutes()
                              .toString()
                              .padStart(2, "0")}: ${new Date()
                              .getSeconds()
                              .toString()
                              .padStart(2, "0")} `}
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-6">
                            <b>Tên khách hàng</b>
                          </div>
                          <div className="col-6">{khachHangCoSan.hoTen}</div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <b>Số điện thoại</b>
                          </div>
                          <div className="col-6">
                            {khachHangCoSan.soDienThoai}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <b>Nhân viên bán hàng</b>
                          </div>
                          <div className="col-6">
                            {localStorage.getItem("tenNhanVien")}
                          </div>
                        </div>
                      </div>
                      <table className="table table-striped table-bordered table-sm shadow border-rounded  ">
                        <thead>
                          <tr className="text-center">
                            <th>Mã thuốc</th>
                            <th>Tên thuốc</th>
                            <th>Thuốc kê đơn</th>
                            <th>Đơn vị tính</th>
                            <th>Số lượng</th>
                            <th>Thành tiền</th>
                            <th className="print-hide"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {dsNhap.map((thuoc) => (
                            <tr
                              key={thuoc.thuoc.maThuoc}
                              className="text-center"
                            >
                              <td className="w-10">{thuoc.thuoc.maThuoc}</td>
                              <td className="fw-bold w-40">
                                {thuoc.thuoc.tenThuoc}
                              </td>
                              {thuoc.thuoc.isThuocKeDon && (
                                <td>
                                  <BsCheck2 className="text-success fs-20  " />
                                </td>
                              )}
                              {!thuoc.thuoc.isThuocKeDon && (
                                <td className="fw-bold ">
                                  <MdOutlineClose className="text-danger fs-27  " />
                                </td>
                              )}

                              <td>{thuoc.thuoc.donViTinh}</td>
                              <td className="w-10">
                                <input
                                  type="number"
                                  value={thuoc.thuoc.soLuongBan}
                                  min={1}
                                  onChange={(e) => {
                                    if (
                                      e.target.value <= 0 ||
                                      e.target.value === ""
                                    ) {
                                      e.target.value = 1;
                                    }
                                    NhapSoLuong(
                                      thuoc.thuoc.maThuoc,
                                      e.target.value
                                    );
                                  }}
                                  className="fw-bold form-control text-center"
                                />
                                <span className=" text-muted print-hide">{`Kho: ${thuoc.thuoc.soLuong}`}</span>
                              </td>
                              <td className="fw-bold">
                                {VND.format(thuoc.thuoc.thanhTien)}
                              </td>
                              <td className="print-hide">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-warning mx-2 px-2 mt-3 shadow"
                                  onClick={() =>
                                    removeThuocNhap(thuoc.thuoc.maThuoc)
                                  }
                                >
                                  <AiOutlineMinusCircle className="text-white" />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-info mx-2 mt-3 shadow"
                                  onClick={() =>
                                    addThuocNhap(thuoc.thuoc.maThuoc)
                                  }
                                >
                                  <BsFillPlusCircleFill className="text-white " />
                                </button>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-danger mx-2 mt-3 shadow"
                                  onClick={() =>
                                    removeThuoc(thuoc.thuoc.maThuoc)
                                  }
                                >
                                  <AiFillCloseCircle className="text-white " />
                                </button>
                              </td>
                            </tr>
                          ))}
                          <tr className="fw-bold">
                            <td className="fw-bold">Tổng tiền:</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                              {`${VND.format(tongTienHoaDon * 1.1)}`}
                              <br />{" "}
                              <span className="text-muted fs-12VAT">{`Đã bao gồm VAT `}</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      {trachNhiem && (
                        <span className="text-danger hide">
                          *Lưu ý: Vui lòng tham khảo ý kiến của dược sĩ trước
                          khi sử dụng các loại thuốc kê đơn. Nhà thuốc sẽ không
                          chịu trách nhiệm cho bất kỳ rủi ro nào. Xin cảm ơn.
                        </span>
                      )}
                    </div>
                  </div>
                  {dsNhap.length !== 0 &&
                    Object.keys(khachHangCoSan).length !== 0 && (
                      <>
                        <div className="col-2 mb-3 ">
                          <button
                            className="btn btn-primary d-flex align-items-center"
                            type="Submit"
                          >
                            <BsFillCartCheckFill className="fs-5 me-2" />
                            Tạo Hóa Đơn
                          </button>
                        </div>
                        {showIn && (
                          <div className="col-3 mb-3 ">
                            <button
                              onClick={generatePDF}
                              type="button"
                              className="btn btn-secondary"
                            >
                              <AiOutlinePrinter className="fs-5 me-2" /> In Hoá
                              đơn
                            </button>
                          </div>
                        )}
                      </>
                    )}
                </div>
              )}
              {tab === "KhongKeDon" && (
                <>
                  <HoaDonKhongKeDon
                    dsNhap1={dsNhap1}
                    setDsNhap1={setDsNhap1}
                    tongTienHoaDon1={tongTienHoaDon1}
                    khachHangCoSan={khachHangCoSan}
                    showIn1={showIn1}
                  />
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentBanThuoc;
