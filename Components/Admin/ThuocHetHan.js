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

const ThuocHetHan = () => {
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
        text: "Thống kê thuốc hết hạn",
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const datasetLabel = context.dataset.label || "";
            const value = context.parsed.y;
            if (datasetLabel === "Số lượng thuốc còn lại") {
              const index = context.dataIndex;
              const labelValue = soLuongConLai[index] + " " + donViTinh[index];
              return datasetLabel + ": " + labelValue;
            }
            return datasetLabel + ": " + value;
          },
        },
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
  const [soNgayConLai, setSoNgayConLai] = useState([]);
  const [soLuongConLai, setSoLuongConLai] = useState([]);
  const [donViTinh, setDonViTinh] = useState([]);

  const [labels, setLabels] = useState([]);
  const today = new Date();
  useEffect(() => {
    // danh sách thuốc sắp hết hạn
    fetch(
      "http://localhost:8080/QLNT-Server/quan-ly/thong-ke/thong-ke-thuoc-het-han"
    )
      .then((response) => response.json())
      .then((data) => {
        let tempLabels = data.map(
          (thuoc) =>
            ` ${thuoc.tenThuoc} Lô (${
              thuoc.loThuoc
            }) Ngày Hết Hạn: ${chuyenDoiNgayThangNam(thuoc.ngayHetHan)}`
        );

        let tempSoLuongConLai = data.map((thuoc) => thuoc.soLuong);
        let tempDonViTinh = data.map((thuoc) => thuoc.donViTinh);
        setDonViTinh(tempDonViTinh);
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
        backgroundColor: "rgba(231 ,35 ,35 ,0.5)",
      },
    ],
  };
  return (
    <Fragment>
      <hr className="fw-bold my-3" />
      <div className="row my-3 d-flex align-items-center">
        <div className="col-12">
          <h5 className="fw-bold text-danger">
            Thống kê thuốc hết hạn: {`(${today.toLocaleDateString("vi-VN")})`}
          </h5>
        </div>
        <div className="col-12">
          <Bar options={options} data={data} height={400} />
        </div>
      </div>
    </Fragment>
  );
};

export default ThuocHetHan;
