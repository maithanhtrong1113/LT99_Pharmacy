import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import NguoiDung from "./NguoiDung";

import ModalXemChiTietDonHang from "../Modal/ModalXemChiTietDonHang";
import { acpDonHang, deniedDonHang, getAllDonHang } from "@/api/donHangApi";
import ModalChangStateDonHang from "../Modal/ModalChangStateDonHang";
import { toast } from "react-toastify";
const ContentDonHang = () => {
  const [dsDonHang, setDanhSachDonHang] = useState([]);
  async function fetchData() {
    const res = await getAllDonHang();
    setDanhSachDonHang(res.content);
  }
  // danh sách đơn hàng
  useEffect(() => {
    fetchData();
  }, []);
  const changStateDonHang = async (data) => {
    const res = await acpDonHang(data);
    toast.success("Đã chấp nhận đơn hàng", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
    setDanhSachDonHang([]);
    fetchData();
  };
  const changStateDonHang1 = async (data) => {
    const res = await deniedDonHang(data);
    toast.success("Đã từ chối đơn hàng", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
    setDanhSachDonHang([]);
    fetchData();
  };
  const [searchTerm, setSearchTerm] = useState("");

  const [timeoutId, setTimeoutId] = useState(null);
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log(searchTerm);
    if (timeoutId) {
      clearTimeout(timeoutId); // Xóa timeout trước đó nếu còn tồn tại
    }

    if (searchTerm.length > 0) {
      const newTimeoutId = setTimeout(() => {
        fetch(
          `http://localhost:8080/QLNT-Server/nhan-vien/don-hang-online/tim-don-hang?keyword=${encodeURIComponent(
            searchTerm
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (results.length > 0) setDanhSachDonHang(results);
            else {
              setDanhSachDonHang([]);
            }
          });
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      fetchData();
    }
  };
  return (
    <Fragment>
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 ">
            <NguoiDung />
            <div className="container border shadow rounded ">
              <div className="row my-3 d-flex align-items-center">
                <div className="col-6">
                  <form>
                    <input
                      type="text"
                      placeholder="Nhập mã đơn hàng hoặc số điện thoại khách hàng"
                      className="form-control w-100 px-2"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                  </form>
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Mã Đơn Hàng</th>
                    <th scope="col">Ngày Đặt Hàng</th>
                    <th scope="col">Tên khách hàng</th>
                    <th scope="col">Trạng Thái</th>

                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {dsDonHang.map((donHang) => (
                    <tr key={donHang.maDonHang}>
                      <td>{donHang.maDonHang}</td>
                      <td>{`${new Date(donHang.ngayTaoDon).getDate()}/${
                        new Date(donHang.ngayTaoDon).getMonth() + 1
                      }/${new Date(donHang.ngayTaoDon).getFullYear()}`}</td>

                      <td>{donHang.khachHang.hoTen}</td>
                      <td>{donHang.trangThaiDonHang}</td>
                      <td></td>
                      <td>
                        {
                          <>
                            <ModalXemChiTietDonHang donHang={donHang} />
                            <ModalChangStateDonHang
                              donHang={donHang}
                              submitAcp={changStateDonHang}
                              deniedDonHang={changStateDonHang1}
                            />
                          </>
                        }
                      </td>
                      <td>{}</td>
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

export default ContentDonHang;
