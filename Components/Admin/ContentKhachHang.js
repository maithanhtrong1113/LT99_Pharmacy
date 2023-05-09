import React, { Fragment, useEffect, useState } from "react";

import ProgressBar from "../ProcessBar/ProcessBar";

import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import NguoiDung from "./NguoiDung";
import ModalAddKhachHang from "../Modal/ModalAddKhachHang";
import { BsThreeDots } from "react-icons/bs";
import xuLyTenKhiQuaDai from "../utils/tooLong";
import { getAllKhachHang, themKhachHang } from "@/api/khachHangApi";
import ModalXemChiTietKH from "../Modal/ModalXemChiTietKH";
import ModalChangIn4KhachHang from "../Modal/ModalChangIn4KhachHang";

const ContentKhachHang = () => {
  const [dsKhachHang, setDsKhachHang] = useState([]);
  const [timeoutId1, setTimeoutId1] = useState(null);
  const [searchTerm1, setSearchTerm1] = useState("");
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const res = await getAllKhachHang();
    setDsKhachHang(res);
  }
  // thêm khách hàng
  const addKhachHangHandler = async (data) => {
    const res = await themKhachHang(data);
    setDsKhachHang(res);
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
      fetch(
        `http://localhost:8080/QLNT-Server/nhan-vien/quan-ly-khach-hang/danh-sach-khach-hang`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("err");
          setDsKhachHang(data);
        })
        .catch((error) => console.error(error));
    }
  };
  const changein4Customer = (data) => {
    console.log(data);
    fetch(
      `http://localhost:8080/QLNT-Server/khach-hang/thong-tin-khach-hang/${data.maKhachHang}/cap-nhat-thong-tin-ca-nhan`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          soDienThoai: data.soDienThoai,
          hoTen: data.hoTen,
          email: data.email,
          gioiTinh: data.gioiTinh,
          ngaySinh: data.ngaySinh,
          diaChi: data.diaChi,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setDsKhachHang([]);
        fetchData();
      })
      .catch((error) => console.error(error));
  };
  return (
    <Fragment>
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
                      value={searchTerm1}
                      onChange={handleInputChange1}
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
                      <td>
                        {khachHang.gioiTinh === null ||
                        khachHang.gioiTinh === "" ? (
                          <BsThreeDots className="text-success fs-20" />
                        ) : (
                          khachHang.gioiTinh
                        )}
                      </td>
                      <td>
                        {khachHang.ngaySinh === null ||
                        khachHang.ngaySinh === "" ? (
                          <BsThreeDots className="text-success fs-20" />
                        ) : (
                          khachHang.ngaySinh
                        )}
                      </td>
                      <td>
                        <ModalXemChiTietKH khachHang={khachHang} />
                        <ModalChangIn4KhachHang
                          nhanVien={khachHang}
                          changeNVSubmit={changein4Customer}
                        />
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

export default ContentKhachHang;
