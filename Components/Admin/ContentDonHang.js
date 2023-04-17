import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import NguoiDung from "./NguoiDung";
import { useRouter } from "next/router";
import ModalXemChiTietDonHang from "../Modal/ModalXemChiTietDonHang";
const ContentDonHang = () => {
  const [dsDonHang, setDanhSachDonHang] = useState([]);

  const router = useRouter();
  // danh sách đơn hàng
  useEffect(() => {
    fetch(`http://localhost:8080/QLNT-Server/nhan-vien/don-hang-online`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDanhSachDonHang(data.content);
      })
      .catch((error) => console.error(error));
  }, []);
  //   const [searchTerm, setSearchTerm] = useState("");

  //   const [timeoutId, setTimeoutId] = useState(null);
  //   const handleInputChange = (event) => {
  //     const searchTerm = event.target.value;
  //     setSearchTerm(searchTerm);
  //     console.log(searchTerm);
  //     if (timeoutId) {
  //       clearTimeout(timeoutId); // Xóa timeout trước đó nếu còn tồn tại
  //     }

  //     if (searchTerm.length > 0) {
  //       const newTimeoutId = setTimeout(() => {
  //         fetch(
  //           `http://localhost:8080/QLNT-Server/nhan-vien/hoa-don/tim-hoa-don-theo-khach-hang?keyword=${encodeURIComponent(
  //             searchTerm
  //           )}`
  //         )
  //           .then((response) => response.json())
  //           .then((results) => {
  //             if (results.length > 0) setDanhSachHoaDon(results);
  //             else {
  //               setDanhSachHoaDon([]);
  //             }
  //           });
  //       }, 500);
  //       setTimeoutId(newTimeoutId);
  //     } else {
  //     }
  //   };
  return (
    <Fragment>
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 ">
            <NguoiDung />
            <div className="container border shadow rounded ">
              <div className="row my-3 d-flex align-items-center"></div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Mã Đơn Hàng</th>
                    <th scope="col">Ngày Đặt Hàng</th>
                    <th scope="col">Tên khách hàng</th>
                    <th scope="col">Trạng Thái</th>
                    <th scope="col">Tổng Tiền</th>
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
                            {/* <ModalXemChiTietDonHang /> */}
                            <button className="btn btn-warning btn-sm ms-2">
                              Trạng thái đơn hàng
                            </button>
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
