import React, { Fragment, useState } from "react";
import ModalAddNhanVien from "../Modal/ModalAddNhanVien";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import NguoiDung from "./NguoiDung";
import { Input } from "reactstrap";
import { useEffect } from "react";

const index = () => {
  const [dsNhanVien, setDsNhanVien] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/QLNT-Server/quan-ly/danh-sach-nhan-vien")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((results) => {
        setDsNhanVien(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  });
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
  };
  return (
    <Fragment>
      {/* <ProgressBar /> */}
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 ">
            <NguoiDung />
            <div className="container border shadow rounded ">
              <div className="row my-3 d-flex align-items-center">
                <div className="col-4">
                  <form>
                    <Input
                      type="text"
                      placeholder="Nhập tên tài khoản"
                      className="form-control w-100 px-2"
                    />
                  </form>
                </div>
                <div className="col-8">
                  <ModalAddNhanVien addNhanVienHandler={addNhanVienSubmit} />
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Mã nhân viên</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Nơi sinh</th>
                    <th scope="col">Giới tính</th>
                    <th scope="col">Ngày sinh</th>
                    <th scope="col">Ngày vào làm</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {dsNhanVien.map((nhanVien) => (
                    <tr key={nhanVien.maNhanVien}>
                      <td>{nhanVien.maNhanVien}</td>
                      <td>{nhanVien.hoTen}</td>
                      <td>{nhanVien.soDienThoai}</td>
                      <td>{nhanVien.diaChi}</td>
                      <td>{nhanVien.gioiTinh}</td>
                      <td>{nhanVien.ngaySinh}</td>
                      <td>{`${new Date(nhanVien.ngayVaoLam).getDate()}/${
                        new Date(nhanVien.ngayVaoLam).getMonth() + 1
                      }/${new Date(nhanVien.ngayVaoLam).getFullYear()}`}</td>
                      <td>
                        <button className="btn btn-info btn-sm">
                          Xem chi tiết
                        </button>
                      </td>
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

export default index;
