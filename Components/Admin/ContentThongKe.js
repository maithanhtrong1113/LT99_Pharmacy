import React, { Fragment, useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Sidebar from "./Sidebar";

import ProgressBar from "../ProcessBar/ProcessBar";
import NguoiDung from "./NguoiDung";
import { useForm } from "react-hook-form";

import DatePicker from "react-datepicker";
import ThuocSapHetHan from "./ThuocSapHetHan";
import ThuocHetHan from "./ThuocHetHan";
import ThuocSapHetHang from "./ThuocSapHetHang";
import DoanhThuTheoNgay from "./DoanhThuTheoNgay";
import DoanhThuTheoThang from "./DoanhThuTheoThang";
import Image from "next/image";
const ContentThongKe = () => {
  const {
    formState: { errors },
    control,
  } = useForm();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê xuất, nhập, tồn theo ngày",
      },
    },
  };
  const today = new Date();
  const [labels, setLabels] = useState([]);
  const [soLuongTon, setSoLuongTon] = useState([]);
  const [soLuongNhap, setSoLuongNhap] = useState([]);
  const [soLuongXuat, setSoLuongXuat] = useState([]);
  const [ngayBatDau, setNgayBatDau] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10)
  );
  const [ngayKetThuc, setNgayKetThuc] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10)
  );
  const [table, setTable] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const StringNgayBatDau = ngayBatDau.toISOString().slice(0, 10);
    const StringNgayKetThuc = ngayKetThuc.toISOString().slice(0, 10);
    //lấy tên loại thuốc, số lượng tồn, số lượng nhập, số lượng xuất của thuốc
    fetch(
      `http://localhost:8080/QLNT-Server/quan-ly/thong-ke/thong-ke-xuat-nhap-ton/theo-ngay?ngayBatDau=${StringNgayBatDau}&ngayKetThuc=${StringNgayKetThuc}`
    )
      .then((response) => response.json())
      .then((data) => {
        // if (data.length !== 0) {
        //   //lọc những phần tử thỏa mãn điều kiện
        //   data = data.filter(
        //     (item) =>
        //       item.xuatNhapTon.soLuongTon !== 0 ||
        //       item.xuatNhapTon.soLuongXuat !== 0 ||
        //       item.xuatNhapTon.soLuongNhap !== 0
        //   );
        //   //lấy thuốc 1 trong 3 khác 0
        //   const temporaryLabels = [];
        //   const soLuongTons = [];
        //   const soLuongNhaps = [];
        //   const soLuongXuats = [];
        //   console.log(data);
        //   data.forEach((thuoc) => {
        //     temporaryLabels.push(thuoc.tenThuoc);
        //     soLuongTons.push(thuoc.xuatNhapTon.soLuongTon);
        //     soLuongXuats.push(thuoc.xuatNhapTon.soLuongXuat);
        //     soLuongNhaps.push(thuoc.xuatNhapTon.soLuongNhap);
        //   });
        //   setLabels(temporaryLabels);
        //   setSoLuongTon(soLuongTons);
        //   setSoLuongNhap(soLuongNhaps);
        //   setSoLuongXuat(soLuongXuats);
        // } else {
        //   setLabels([]);
        //   setSoLuongTon([]);
        //   setSoLuongNhap([]);
        //   setSoLuongXuat([]);
        // }
        setIsLoading(false);
        setTable(data);
      })
      .catch((error) => console.error(error));
  }, [ngayBatDau, ngayKetThuc]);

  const data = {
    labels,
    datasets: [
      {
        label: "Số lượng nhập",
        data: soLuongNhap,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Số lượng tồn",
        data: soLuongTon,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Số lượng xuất",
        data: soLuongXuat,
        backgroundColor: "rgb(233, 233, 110,0.5)",
      },
    ],
  };
  const [isXuatNhapTon, setIsXuatNhapTon] = useState(false);
  const [isThuocSapHetHan, setIsThuocSapHetHan] = useState(false);
  const [isHetHan, setIsHetHan] = useState(false);
  const [isSapHetHang, setIsSapHetHang] = useState(false);
  const [isDoanhThuNgay, setIsDoanhThuNgay] = useState(false);
  const [isDoanhThuThang, setIsDoanhThuThang] = useState(false);
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsXuatNhapTon(false);
    setIsThuocSapHetHan(false);
    setIsHetHan(false);
    setIsSapHetHang(false);
    setIsDoanhThuNgay(false);
    setIsDoanhThuThang(false);
    if (selected === "XuatNhapTon") setIsXuatNhapTon(true);
    else if (selected === "SapHetHan") setIsThuocSapHetHan(true);
    else if (selected === "HetHan") setIsHetHan(true);
    else if (selected === "SapHetHang") setIsSapHetHang(true);
    else if (selected === "DoanhThuTheoNgay") setIsDoanhThuNgay(true);
    else if (selected === "DoanhThuTheoThang") setIsDoanhThuThang(true);
  }, [selected]);
  return (
    <Fragment>
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 ">
            <NguoiDung />
            <div className="container border shadow rounded">
              <div className="row my-3 d-flex align-items-center">
                <div className="col-2">
                  <h5 className="text-info fw-bold">Thống Kê:</h5>
                </div>
                <div className="col-3">
                  <select
                    className="form-select "
                    onChange={(e) => {
                      setSelected(e.target.value);
                    }}
                  >
                    <option value="">Chọn Loại Thống Kê</option>
                    <option value="XuatNhapTon">Xuất Nhập Tồn Theo Ngày</option>
                    <option value="SapHetHan"> Thuốc Sắp Hết Hạn</option>
                    <option value="HetHan">Thuốc Hết Hạn</option>
                    <option value="SapHetHang">Thuốc Sắp Hết Hàng</option>
                    <option value="DoanhThuTheoNgay">
                      Doanh Thu Theo Ngày
                    </option>
                    <option value="DoanhThuTheoThang">
                      Doanh Thu Theo Tháng
                    </option>
                  </select>
                </div>
              </div>
              {isXuatNhapTon && (
                <div className="row my-3 d-flex align-items-center">
                  <div className="col-12">
                    <hr />
                  </div>
                  <div className="col-12">
                    <h5 className="fw-bold text-info fst-italic ">
                      Thống kê xuất nhập tồn theo ngày
                    </h5>
                  </div>
                  <div className="col-2">
                    <label className="fw-bold">Chọn ngày bắt đầu</label>
                  </div>
                  <div className="col-2">
                    <DatePicker
                      className="form-select"
                      selected={ngayBatDau}
                      onChange={(date) => setNgayBatDau(date)}
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                  <div className="col-2">
                    <label className="fw-bold">Chọn ngày kết thúc</label>
                  </div>
                  <div className="col-2">
                    <DatePicker
                      className="form-select"
                      selected={ngayKetThuc}
                      onChange={(date) => setNgayKetThuc(date)}
                      dateFormat="yyyy-MM-dd"
                    />
                  </div>
                  <div className="col-12 my-3 rounded">
                    {/* <Bar options={options} data={data} height={400} /> */}
                    {isLoading && (
                      <>
                        <Image
                          src="/images/Loading_icon.gif"
                          width={100}
                          height={50}
                        />
                        <span className="fw-bold">Đang tải dữ liệu</span>
                      </>
                    )}
                    {!isLoading && (
                      <table className="table table-striped border  border-info rounded shadow">
                        <thead>
                          <tr>
                            <th scope="col">Tên Thuốc</th>
                            <th>Số lượng nhập</th>
                            <th>Số lượng tồn</th>
                            <th>Số lượng bán</th>
                          </tr>
                        </thead>
                        <tbody>
                          {table.map((thuoc) => (
                            <tr>
                              <td className="w-50">{thuoc.tenThuoc}</td>
                              <td>{thuoc.xuatNhapTon.soLuongNhap}</td>
                              <td>{thuoc.xuatNhapTon.soLuongTon}</td>
                              <td>{thuoc.xuatNhapTon.soLuongXuat}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              )}
              {isThuocSapHetHan && <ThuocSapHetHan />}
              {isHetHan && <ThuocHetHan />}
              {isSapHetHang && <ThuocSapHetHang />}
              {isDoanhThuNgay && <DoanhThuTheoNgay />}
              {isDoanhThuThang && <DoanhThuTheoThang />}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentThongKe;
