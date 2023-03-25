import React, { Fragment, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
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

const DoanhThuTheoThang = () => {
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
        text: "Thống doanh thu theo tháng",
      },
    },
  };

  const [soLuongConLai, setSoLuongConLai] = useState([]);
  const [labels, setLabels] = useState([]);
  const today = new Date();
  const [ngayBatDau, setNgayBatDau] = useState(new Date());
  const [ngayKetThuc, setNgayKetThuc] = useState(new Date());
  useEffect(() => {
    // danh sách thuốc sắp hết hạn
    fetch(
      "http://localhost:8080/QLNT-Server/quan-ly/thong-ke/thong-ke-thuoc-sap-het-hang"
    )
      .then((response) => response.json())
      .then((data) => {
        let tempLabels = data.map((thuoc) => thuoc.tenThuoc);
        let tempSoLuongConLai = data.map((thuoc) => thuoc.soLuong);

        setLabels(tempLabels);

        setSoLuongConLai(tempSoLuongConLai);
      });
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Doanh Thu",
        data: soLuongConLai,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return (
    <Fragment>
      <hr className="fw-bold my-3" />
      <div className="row my-3 d-flex align-items-center">
        <div className="col-12">
          <h5 className="fw-bold text-info fst-italic ">
            Doanh thu theo tháng
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
        <div className="col-12">
          <Bar options={options} data={data} height={400} />
        </div>
      </div>
    </Fragment>
  );
};

export default DoanhThuTheoThang;
