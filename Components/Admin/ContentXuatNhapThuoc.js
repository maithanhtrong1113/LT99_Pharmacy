import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "./Sidebar";
import ModalAddThuoc from "../Modal/ModalAddThuoc";
import { BsSearch } from "react-icons/bs";
import NguoiDung from "./NguoiDung";
import { AiOutlinePlusCircle } from "react-icons/ai";

const ContentXuatNhapThuoc = () => {
  const addThuocHandler = (data) => {
    fetch(
      `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/${data.maLoai}/thuoc`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenThuoc: data.tenThuoc,
          lieuLuong: data.lieuLuong,
          congDung: data.congDung,
          donViTinh: data.donViTinh,
          quyCachDongGoi: data.quyCachDongGoi,
          tacDungPhu: data.tacDungPhu,
          huongDanSuDung: data.huongDanSuDung,
          soLuong: data.soLuong,
          images: [],
          dsDoiTuong: [],
          thuocKeDon: false,
          moTa: data.moTa,
        }),
      }
    );
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  const [dsThuoc, setDsThuoc] = useState([]);
  const [dsNhap, setDsNhap] = useState([]);
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log(dsThuoc);
    if (timeoutId) {
      clearTimeout(timeoutId); // Xóa timeout trước đó nếu còn tồn tại
    }

    if (searchTerm.length > 0) {
      const newTimeoutId = setTimeout(() => {
        fetch(
          `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/tim-thuoc?keyword=${encodeURIComponent(
            searchTerm
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (results.length > 0) setDsThuoc(results);
            else {
              setDsThuoc([]);
            }
          });
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      setDsThuoc([]);
    }
  };
  const removeThuocNhap = (maThuoc) => {
    const isThuocExist = dsNhap.find((item) => item.maThuoc === maThuoc);
    if (isThuocExist.soLuong === 1) {
      setDsNhap(dsNhap.filter((item) => item.maThuoc !== maThuoc));
    } else {
      isThuocExist.soLuong--;
      setDsNhap([...dsNhap]);
    }
  };
  const addThuocNhap = (maThuoc) => {
    const isThuocExist = dsNhap.find((item) => item.maThuoc === maThuoc);
    isThuocExist.soLuong++;
    setDsNhap([...dsNhap]);
  };
  const NhapSoLuong = (maThuoc, soLuong) => {
    const isThuocExist = dsNhap.find((item) => item.maThuoc === maThuoc);
    isThuocExist.soLuong = parseInt(soLuong);
    setDsNhap([...dsNhap]);
  };
  console.log(dsNhap);
  return (
    <Fragment>
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 ">
            <NguoiDung />
            <div className="container border shadow rounded">
              <div className="row my-3 d-flex align-items-center">
                <div className="col-4">
                  <div className="position-relative">
                    <input
                      type="text"
                      placeholder="Nhập tên hoặc công dụng của thuốc muốn tìm"
                      className="form-input w-100 px-2"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                    <BsSearch className="position-absolute localIconSearch text-primary" />
                    {dsThuoc.length !== 0 && (
                      <div className="position-absolute container border rounded bg-light">
                        {dsThuoc.map((thuoc) => (
                          <button
                            className="text-info w-100 btn btn-light d-flex justify-content-between align-items-center my-1 border"
                            onClick={() => {
                              const isThuocExist = dsNhap.find(
                                (item) => item.maThuoc === thuoc.maThuoc
                              );
                              if (isThuocExist) {
                                isThuocExist.soLuong++;
                                setDsNhap([...dsNhap]);
                              } else {
                                thuoc.soLuong = 1;
                                setDsNhap([...dsNhap, thuoc]);
                              }
                            }}
                          >
                            {thuoc.tenThuoc}
                            <AiOutlinePlusCircle />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-6">
                  <ModalAddThuoc submitHandler={addThuocHandler} />
                </div>
              </div>
              <div className="row">
                <div className="col-8">
                  <table className="table">
                    <thead>
                      <tr>
                        <td>Mã thuốc</td>
                        <td>Tên thuốc</td>
                        <td>Số lượng</td>
                        <td>Đơn vị tính</td>
                        <td></td>
                      </tr>
                    </thead>
                    <tbody>
                      {dsNhap.map((thuoc) => (
                        <tr key={thuoc.maThuoc}>
                          <td>{thuoc.maThuoc}</td>
                          <td>{thuoc.tenThuoc}</td>
                          <td>
                            <input
                              type="number"
                              value={thuoc.soLuong}
                              min={1}
                              onChange={(e) =>
                                NhapSoLuong(thuoc.maThuoc, e.target.value)
                              }
                              className="w-25 form-control"
                            />
                          </td>
                          <td>{thuoc.donViTinh}</td>
                          <td>
                            <button
                              className="btn btn-sm bg-warning mx-2 px-2"
                              onClick={() => removeThuocNhap(thuoc.maThuoc)}
                            >
                              -
                            </button>
                            <button
                              className="btn btn-sm bg-success mx-2 px-2"
                              onClick={() => addThuocNhap(thuoc.maThuoc)}
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="col-4">
                  <h2>Thông tin nhà cung cấp</h2>
                  <h2>Thông tin Lô thuốc</h2>
                  <button className="btn btn-primary">Nhập Thuốc</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentXuatNhapThuoc;
