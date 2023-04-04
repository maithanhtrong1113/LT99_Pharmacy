import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import NguoiDung from "./NguoiDung";
import { useRouter } from "next/router";
import { FaAngleLeft } from "react-icons/fa";

const ContentChiTietDonHang = () => {
  const router = useRouter();
  const [chiTiet, setChiTiet] = useState({});
  const { id } = router.query;
  const [detail, setDetails] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/QLNT-Server/nhan-vien/don-hang-online/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChiTiet(data);
        setDetails(data.orderDetails);
      })
      .catch((error) => console.error(error));
  }, [id]);
  return (
    <Fragment>
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 ">
            <NguoiDung />
            <div className="container border shadow rounded ">
              {Object.keys(chiTiet).length !== 0 && detail.length !== 0 && (
                <div className="row py-2">
                  <div className="col-1 my-2">
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        router.push("/admin/donHang");
                      }}
                    >
                      <FaAngleLeft />
                    </button>
                  </div>
                  <div className="col-11"></div>
                  <div className="col-6">
                    <h5 className="text-info">Thông tin khách hàng</h5>
                    <div className="container border rounded shadow my-3">
                      <div className="row ">
                        <div className=" d-flex my-2">
                          <label className=" col-4 fw-bold">
                            Mã khách hàng:
                          </label>
                          <div>{chiTiet.khachHang.maKhachHang}</div>
                        </div>
                        <div className=" d-flex my-2">
                          <label className=" col-4 fw-bold">
                            Tên khách hàng:
                          </label>
                          <div>{chiTiet.khachHang.hoTen}</div>
                        </div>
                        <div className=" d-flex my-2">
                          <label className=" col-4 fw-bold">
                            Số Điện Thoại:
                          </label>
                          <div>{chiTiet.khachHang.soDienThoai}</div>
                        </div>
                        <div className=" d-flex my-2">
                          <label className=" col-4 fw-bold">
                            Địa chỉ giao hàng:
                          </label>
                          <div>{chiTiet.diaChiGiaoHang}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 ">
                    <h5 className="text-info">Thông tin chi tiết đơn hàng</h5>
                    <div className="container border rounded shadow my-3 p-3">
                      <table className="table table-striped">
                        <thead>
                          <tr>
                            <th scope="col">Mã Thuốc</th>
                            <th scope="col">Tên Thuốc</th>
                            <th scope="col">Số Lượng</th>
                          </tr>
                        </thead>
                        {detail.map((thuoc) => (
                          <tr>
                            <td>{thuoc.thuoc.maThuoc}</td>
                            <td>{thuoc.thuoc.tenThuoc}</td>
                            <td>{thuoc.soLuongThuocDat}</td>
                          </tr>
                        ))}
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentChiTietDonHang;
