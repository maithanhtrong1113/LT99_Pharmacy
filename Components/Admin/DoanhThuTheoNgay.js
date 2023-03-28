import React, { Fragment, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";

import { Line } from "react-chartjs-2";

const DoanhThuTheoNgay = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Thống doanh thu theo ngày",
      },
    },
  };

  const [soLuongConLai, setSoLuongConLai] = useState([]);
  const [labels, setLabels] = useState([]);
  const today = new Date();
  const [ngayBatDau, setNgayBatDau] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2)
  );
  const [ngayKetThuc, setNgayKetThuc] = useState(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2)
  );
  const [tongDoanhThu, setTongDoanhThu] = useState(0);
  useEffect(() => {
    // danh sách thuốc sắp hết hạn
    const StringNgayBatDau = ngayBatDau.toISOString().slice(0, 10);
    const StringNgayKetThuc = ngayKetThuc.toISOString().slice(0, 10);
    fetch(
      `http://localhost:8080/QLNT-Server/quan-ly/thong-ke/thong-ke-doanh-thu-theo-ngay?ngayBatDau=${StringNgayBatDau}&ngayKetThuc=${StringNgayKetThuc}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.doanhThuTungNgay.length !== 0) {
          let tempLabels = data.doanhThuTungNgay.map((thuoc) => thuoc.ngay);
          let tempSoLuongConLai = data.doanhThuTungNgay.map(
            (thuoc) => thuoc.doanhThu
          );
          setTongDoanhThu(data.tongDoanhThu);
          setLabels(tempLabels);
          setSoLuongConLai(tempSoLuongConLai);
        }
      });
  }, [ngayBatDau, ngayKetThuc]);
  console.log(new Date().toLocaleDateString("en-CA"));
  const data = {
    labels,
    datasets: [
      {
        label: "Doanh Thu",
        data: soLuongConLai,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <Fragment>
      <hr className="fw-bold my-3" />
      <div className="row my-3 d-flex align-items-center">
        <div className="col-12">
          <h5 className="fw-bold text-info fst-italic ">Doanh thu theo ngày</h5>
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
        <div className="col-12  my-3">
          <span className="text-info">
            Tổng doanh thu: {VND.format(tongDoanhThu)}
          </span>
        </div>
        <div className="col-12">
          <Line options={options} data={data} height={400} />
        </div>
      </div>
    </Fragment>
  );
};

export default DoanhThuTheoNgay;
