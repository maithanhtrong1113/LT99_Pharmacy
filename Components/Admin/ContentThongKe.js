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
import { useForm, Controller } from "react-hook-form";

import DatePicker from "react-datepicker";
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

  const [labels, setLabels] = useState([]);
  const [soLuongTon, setSoLuongTon] = useState([]);
  const [soLuongNhap, setSoLuongNhap] = useState([]);
  const [soLuongXuat, setSoLuongXuat] = useState([]);
  const [ngayBatDau, setNgayBatDau] = useState(new Date());
  const [ngayKetThuc, setNgayKetThuc] = useState(new Date());
  useEffect(() => {
    //lấy tên loại thuốc, số lượng tồn, số lượng nhập, số lượng xuất của thuốc

    fetch(
      `http://localhost:8080/QLNT-Server/quan-ly/thong-ke/thong-ke-xuat-nhap-ton/theo-ngay?ngayBatDau=
      ${ngayBatDau.toLocaleDateString(
        "en-CA"
      )}&ngayKetThuc=${ngayKetThuc.toLocaleDateString("en-CA")}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length !== 0) {
          console.log(data);
          data = data.filter(
            (item) =>
              item.xuatNhapTon.soLuongTon !== 0 ||
              item.xuatNhapTon.soLuongXuat !== 0 ||
              item.xuatNhapTon.soLuongNhap !== 0
          );

          const temporaryLabels = [];
          const soLuongTons = [];
          const soLuongNhaps = [];
          const soLuongXuats = [];
          data.forEach((thuoc) => {
            temporaryLabels.push(thuoc.tenThuoc);
            soLuongTons.push(thuoc.xuatNhapTon.soLuongTon);
            soLuongXuats.push(thuoc.xuatNhapTon.soLuongXuat);
            soLuongNhaps.push(thuoc.xuatNhapTon.soLuongNhap);
          });
          setLabels(temporaryLabels);
          setSoLuongTon(soLuongTons);
          setSoLuongNhap(soLuongNhaps);
          setSoLuongXuat(soLuongXuats);
        } else {
          setLabels([]);
          setSoLuongTon([]);
          setSoLuongNhap([]);
          setSoLuongXuat([]);
        }
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
  console.log(ngayBatDau.toLocaleDateString("en-CA"));
  return (
    <Fragment>
      <ProgressBar />
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 ">
            <NguoiDung />

            <div className="container border shadow rounded">
              <div className="row my-3 d-flex align-items-center">
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
                <div className="col-12">
                  <Bar options={options} data={data} height={400} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentThongKe;
