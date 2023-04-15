import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import NguoiDung from "./NguoiDung";
import { CSVLink } from "react-csv";
import { FaFileImport } from "react-icons/fa";
import { BsCheck2, BsThreeDots } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import { getAllHoaDon } from "@/api/hoaDonApi";
import ModalXemChiTietHoaDon from "../Modal/ModalXemChiTietHoaDon";
const ContentHoaDon = () => {
  const [dsHoaDon, setDanhSachHoaDon] = useState([]);
  const [dsIn, setDsIn] = useState([]);
  // danh sách khách hàng
  async function fetchData() {
    const res = await getAllHoaDon();
    setDanhSachHoaDon(res.content);
  }
  useEffect(() => {
    fetchData();
  }, []);
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
          `http://localhost:8080/QLNT-Server/nhan-vien/hoa-don/tim-hoa-don-theo-khach-hang?keyword=${encodeURIComponent(
            searchTerm
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (results.length > 0) setDanhSachHoaDon(results);
            else {
              setDanhSachHoaDon([]);
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
                <div className="col-4">
                  <form>
                    <input
                      type="text"
                      placeholder="Nhập tên hoặc số điện thoại  khách hàng"
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
                    <th scope="col">Mã Hóa Đơn</th>
                    <th scope="col">Tên khách hàng</th>
                    <th scope="col">Ngày tạo hóa đơn</th>
                    <th scope="col">Mã phiếu khám</th>
                    <th scope="col">Nơi khám</th>
                    <th scope="col">Hóa đơn kê đơn</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {dsHoaDon.map((hoaDon) => (
                    <tr key={hoaDon.maHoaDon}>
                      <td>{hoaDon.maHoaDon}</td>
                      <td>{hoaDon.khachHang.hoTen}</td>
                      <td>{`${new Date(hoaDon.ngayLapHoaDon).getDate()}/${
                        new Date(hoaDon.ngayLapHoaDon).getMonth() + 1
                      }/${new Date(hoaDon.ngayLapHoaDon).getFullYear()}`}</td>
                      <td>
                        {hoaDon.bacSiChiDinh === null ? (
                          <BsThreeDots className="text-warning fs-20" />
                        ) : (
                          hoaDon.bacSiChiDinh
                        )}
                      </td>
                      <td>
                        {hoaDon.noiKham === null ? (
                          <BsThreeDots className="text-warning fs-20" />
                        ) : (
                          hoaDon.noiKham
                        )}
                      </td>
                      <td>
                        {hoaDon.hoaDonKeDon ? (
                          <BsCheck2 className="text-success fs-20" />
                        ) : (
                          <MdOutlineClose className="text-danger fs-20" />
                        )}
                      </td>
                      <td>
                        <ModalXemChiTietHoaDon
                          nhanvienBanHang={hoaDon.nhanVienBanHang.hoTen}
                          hoaDon={hoaDon}
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

export default ContentHoaDon;
