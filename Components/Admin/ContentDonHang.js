import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import NguoiDung from "./NguoiDung";
import { useRouter } from "next/router";
import ModalXemChiTietDonHang from "../Modal/ModalXemChiTietDonHang";
import { getAllDonHang } from "@/api/donHangApi";
import ModalChangStateDonHang from "../Modal/ModalChangStateDonHang";
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
                            <ModalXemChiTietDonHang donHang={donHang} />
                            <ModalChangStateDonHang donHang={donHang} />
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
