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
import { chuyenDoiNgayThangNam } from "../utils/tooLong";

const ThuocSapHetHan = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const [soNgayConLai, setSoNgayConLai] = useState([]);
  const [soLuongConLai, setSoLuongConLai] = useState([]);
  const [donViTinh, setDonViTinh] = useState([]);
  const [labels, setLabels] = useState([]);
  const today = new Date();
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || "";
            const value = context.parsed.y;
            if (datasetLabel === "Số lượng thuốc sắp hết hạn") {
              const index = context.dataIndex;
              const labelValue = soLuongConLai[index] + " " + donViTinh[index];
              return datasetLabel + ": " + labelValue;
            }
            return datasetLabel + ": " + value;
          },
        },
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Thống kê thuốc gần hết hạn",
      },
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        maxTicksLimit: 10,
      },
    },
  };

  useEffect(() => {
    // danh sách thuốc sắp hết hạn
    fetch(
      "http://localhost:8080/QLNT-Server/quan-ly/thong-ke/thong-ke-thuoc-sap-het-han"
    )
      .then((response) => response.json())
      .then((data) => {
        let tempLabels = data.map(
          (thuoc) =>
            ` ${thuoc.tenThuoc} - Lô: (${
              thuoc.loThuoc
            }) - Ngày Hết Hạn: ${chuyenDoiNgayThangNam(thuoc.ngayHetHan)}`
        );
        let tempSoNgayConLai = data.map((thuoc) => thuoc.soNgayConLai);
        let tempSoLuongConLai = data.map((thuoc) => thuoc.soLuong);
        let tempDonViTinh = data.map((thuoc) => thuoc.donViTinh);
        setLabels(tempLabels);
        setSoNgayConLai(tempSoNgayConLai);
        setSoLuongConLai(tempSoLuongConLai);
        setDonViTinh(tempDonViTinh);
      });
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Số ngày còn lại",
        data: soNgayConLai,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Số lượng thuốc sắp hết hạn",
        data: soLuongConLai,
        backgroundColor: "rgb(233, 233, 110,0.5)",
      },
    ],
  };
  return (
    <Fragment>
      <hr className="fw-bold my-3" />
      <div className="row my-3 d-flex align-items-center">
        <div className="col-12">
          <h5 className="fw-bold text-warning  ">
            Thống kê thuốc sắp hết hạn:
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

export default ThuocSapHetHan;
