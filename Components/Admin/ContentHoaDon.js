import React, { Fragment, useEffect, useState } from "react";

import ProgressBar from "../ProcessBar/ProcessBar";
import ModalAddNhanVien from "../Modal/ModalAddNhanVien";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import NguoiDung from "./NguoiDung";
import { CSVLink } from "react-csv";
import { FaFileImport } from "react-icons/fa";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
const ContentKhachHang = () => {
  const [dsHoaDon, setDanhSachHoaDon] = useState([]);
  const [dsIn, setDsIn] = useState([]);
  // danh sách khách hàng
  useEffect(() => {
    fetch(`http://localhost:8080/QLNT-Server/nhan-vien/hoa-don/`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDanhSachHoaDon(data.content);

        let arr = data.content.map((hoaDon) => {
          return {
            "Mã Hóa Đơn": hoaDon.maHoaDon,
            "Tên Khách Hàng": hoaDon.khachHang.hoTen,
            "Nhân viên bán hàng": hoaDon.nhanVienBanHang.hoTen,

            "Ngày lập hóa đơn": `${new Date(hoaDon.ngayLapHoaDon).getDate()}/${
              new Date(hoaDon.ngayLapHoaDon).getMonth() + 1
            }/${new Date(hoaDon.ngayLapHoaDon).getFullYear()}`,
            "Bác sĩ chỉ định": hoaDon.bacSiChiDinh,
            "Nơi khám": hoaDon.noiKham,
            "Hóa đơn kê đơn": hoaDon.hoaDonKeDon
              ? "Hóa đơn Kê đơn"
              : "Hóa đơn không kê đơn",
            "Ghi chú": hoaDon.ghiChu,
          };
        });
        setDsIn(arr);
      })

      .catch((error) => console.error(error));
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
      // fetch("http://localhost:8080/QLNT-Server/nhan-vien/hoa-don/")
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setDanhSachHoaDon(data);
      //   })
      //   .catch((error) => console.error(error));
    }
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
                      placeholder="Nhập tên hoặc số điện thoại  khách hàng"
                      className="form-control w-100 px-2"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                  </form>
                </div>
                <div className="col-2 d-flex align-items-center">
                  <buton
                    className="btn btn-primary d-flex align-items-center"
                    type="button"
                  >
                    <CSVLink
                      data={dsIn}
                      filename={"dataHoaDon"}
                      className="text-white text-decoration-none"
                    >
                      Export
                    </CSVLink>
                    <FaFileImport className="ms-2 text-light fs-15" />
                  </buton>
                </div>
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
                    <th scope="col">Hóa đơn kê đơn</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {dsHoaDon.map((hoaDon) => (
                    <tr key={hoaDon.maHoaDon}>
                      <td>{hoaDon.maHoaDon}</td>
                      <td>{hoaDon.khachHang.hoTen}</td>
                      <td>{hoaDon.nhanVienBanHang.hoTen}</td>

                      <td>{`${new Date(hoaDon.ngayLapHoaDon).getDate()}/${
                        new Date(hoaDon.ngayLapHoaDon).getMonth() + 1
                      }/${new Date(hoaDon.ngayLapHoaDon).getFullYear()}`}</td>
                      <td>
                        {hoaDon.bacSiChiDinh === null ? (
                          <MdOutlineClose className="text-danger fs-20" />
                        ) : (
                          hoaDon.bacSiChiDinh
                        )}
                      </td>
                      <td>
                        {hoaDon.noiKham === null ? (
                          <MdOutlineClose className="text-danger fs-20" />
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
