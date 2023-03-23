import React, { Fragment, useEffect, useState } from "react";

import ProgressBar from "../ProcessBar/ProcessBar";
import ModalAddNhanVien from "../Modal/ModalAddNhanVien";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import NguoiDung from "./NguoiDung";
const ContentKhachHang = () => {
  const [dsHoaDon, setDanhSachHoaDon] = useState([]);
  // danh sách khách hàng
  useEffect(() => {
    fetch(`http://localhost:8080/QLNT-Server/nhan-vien/hoa-don/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDanhSachHoaDon(data.content);
      })
      .catch((error) => console.error(error));
  }, []);
  // thêm nhân viên và tạo tài khoản
  const addNhanVienSubmit = (data) => {
    fetch("http://localhost:8080/QLNT-Server/quan-ly/nhan-vien", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hoTen: data.name,
        soDienThoai: data.phone,
        diaChi: data.diaChi,
        gioiTinh: data.gender,
        ngaySinh: data.date,
        caLamViec: { maCaLam: 1, tenCa: "sang", soGioLam: 8 },
        ngayVaoLam: Date.now(),
        taiKhoan: {
          userName: data.tenDangNhap,
          password: data.password,
          quyen: [{ maQuyen: "2", tenQuyen: "EMPLOYEE" }],
        },
      }),
    }).then((response) => {
      if (response.ok) {
        toast.success("Thêm nhân viên thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      } else {
        toast.error("Thêm nhân viên không thành công", {
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
  return (
    <Fragment>
      <ProgressBar />
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 ">
            <NguoiDung />
            <div className="container border shadow rounded ">
              <div className="row my-3 d-flex align-items-center">
                <div className="col-4">
                  <form>
                    <input
                      type="text"
                      placeholder="Nhập hóa đơn muốn tìm"
                      className="form-control w-100 px-2"
                    />
                  </form>
                </div>
                {/* <div className="col-8">
                  <ModalAddNhanVien addNhanVienHandler={addNhanVienSubmit} />
                </div> */}
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Mã Hóa Đơn</th>
                    <th scope="col">Tên khách hàng</th>
                    <th scope="col">Nhân viên bán hàng</th>
                    <th scope="col">Ngày tạo hóa đơn</th>
                    <th scope="col">Bác sĩ chỉ định</th>
                    <th scope="col">Nơi khám</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {dsHoaDon.map((hoaDon) => (
                    <tr key={hoaDon.maHoaDon}>
                      <td>{hoaDon.maHoaDon}</td>
                      <td>{hoaDon.khachHang.hoTen}</td>
                      <td>{hoaDon.nhanVienBanHang.hoTen}</td>
                      <td>{hoaDon.ngayLapHoaDon}</td>
                      <td>{hoaDon.bacSiChiDinh}</td>
                      <td>{hoaDon.noiKham}</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentKhachHang;
