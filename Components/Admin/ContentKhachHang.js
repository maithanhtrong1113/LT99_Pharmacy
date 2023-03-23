import React, { Fragment, useEffect, useState } from "react";

import ProgressBar from "../ProcessBar/ProcessBar";
import ModalAddNhanVien from "../Modal/ModalAddNhanVien";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import NguoiDung from "./NguoiDung";
import ModalAddKhachHang from "../Modal/ModalAddKhachHang";
const ContentKhachHang = () => {
  const [dsKhachHang, setDsKhachHang] = useState([]);
  // danh sách khách hàng
  useEffect(() => {
    fetch(
      `http://localhost:8080/QLNT-Server/nhan-vien/quan-ly-khach-hang/danh-sach-khach-hang`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("err");
        setDsKhachHang(data);
      })
      .catch((error) => console.error(error));
  }, []);
  // thêm khách hàng
  const addKhachHangHandler = (data) => {
    fetch(
      "http://localhost:8080/QLNT-Server/nhan-vien/quan-ly-khach-hang/khach-hang",
      {
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
        }),
      }
    ).then((response) => {
      if (response.ok) {
        toast.success("Thêm khách hàng thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      } else {
        toast.error("Thêm khách hàng không thành công", {
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
          <div className="col-10">
            <NguoiDung />
            <div className="container border shadow rounded ">
              <div className="row my-3 d-flex align-items-center">
                <div className="col-4">
                  <form>
                    <input
                      type="text"
                      placeholder="Nhập tên khách hàng cần tìm"
                      className="form-control w-100 px-2"
                    />
                  </form>
                </div>
                <div className="col-8">
                  <ModalAddKhachHang addKhachHangSubmit={addKhachHangHandler} />
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Mã khách hàng</th>
                    <th scope="col">Họ và tên</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Địa chỉ</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Ngày sinh</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {dsKhachHang.map((khachHang) => (
                    <tr key={khachHang.maKhachHang}>
                      <td>{khachHang.maKhachHang}</td>
                      <td>{khachHang.hoTen}</td>
                      <td>{khachHang.soDienThoai}</td>
                      <td>{khachHang.diaChi}</td>
                      <td>{khachHang.gioiTinh}</td>
                      <td>{khachHang.ngaySinh}</td>
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
