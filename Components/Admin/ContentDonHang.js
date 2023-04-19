import React, { Fragment, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import NguoiDung from "./NguoiDung";

import ModalXemChiTietDonHang from "../Modal/ModalXemChiTietDonHang";
import { acpDonHang, deniedDonHang, getAllDonHang } from "@/api/donHangApi";
import ModalChangStateDonHang from "../Modal/ModalChangStateDonHang";
import { toast } from "react-toastify";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
const ContentDonHang = () => {
  const [dsDonHang, setDanhSachDonHang] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const buttons = [];
  for (let i = 1; i <= totalPage; i++) {
    buttons.push(
      <div className="col-1">
        <button
          className="btn btn-info rounded-circle w-50 "
          key={i}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      </div>
    );
  }
  async function fetchData(data) {
    const res = await getAllDonHang(data);
    setTotalPage(res.totalPages);
    setDanhSachDonHang(res.content);
  }
  // danh sách đơn hàng
  useEffect(() => {
    fetchData(page);
  }, [page]);
  const changStateDonHang = async (data) => {
    const res = await acpDonHang(data);
    toast.success("Đã chấp nhận đơn hàng", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
    setDanhSachDonHang([]);
    fetchData(page);
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
      fetchData(1);
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
              <table className="table table-striped my-0">
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
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalPage > 0 && (
                <div className="row d-flex justify-content-center align-items-center my-2">
                  <div className="col-1">
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        setPage(page === 0 ? page : page - 1);
                      }}
                    >
                      <AiOutlineDoubleLeft />
                    </button>
                  </div>
                  {buttons}
                  <div className="col-1">
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        setPage(page === totalPage ? page : page + 1);
                      }}
                    >
                      <AiOutlineDoubleRight />
                    </button>
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

export default ContentDonHang;
