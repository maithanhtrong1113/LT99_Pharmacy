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

const ThuocSapHetHang = () => {
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
        text: "Thống kê sắp hết hàng",
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
      },
    },
  };

  const [soLuongConLai, setSoLuongConLai] = useState([]);
  const [labels, setLabels] = useState([]);
  const today = new Date();
  useEffect(() => {
    // danh sách thuốc sắp hết hạn
    fetch(
      "http://localhost:8080/QLNT-Server/quan-ly/thong-ke/thong-ke-thuoc-sap-het-hang"
    )
      .then((response) => response.json())
      .then((data) => {
        let tempLabels = data.map((thuoc) => thuoc.tenThuoc);
        let tempSoLuongConLai = data.map((thuoc) => thuoc.soLuongConLai);

        setLabels(tempLabels);

        setSoLuongConLai(tempSoLuongConLai);
      });
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Số lượng thuốc còn lại",
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
          <h5 className="fw-bold text-warning fst-italic ">
            Thống kê thuốc sắp hết hàng:
            {` (${today.toLocaleDateString("vi-VN")})`}
          </h5>
        </div>
        <div className="col-12">
          <Bar options={options} data={data} height={400} />
        </div>
      </div>
    </Fragment>
  );
};

export default ThuocSapHetHang;
