import React, { Fragment, useEffect, useState } from "react";
import NguoiDung from "./NguoiDung";
import Sidebar from "./Sidebar";
import { getAllNhaCungCap, themNhaCungCap } from "@/api/nhaCungCapApi";
import NhaCungCap from "./NhaCungCap";
import ModalAddNhaCungCap from "../Modal/ModalAddNhaCungCap";
const ContentNhaCungCap = () => {
  const [nhaCungCap, setNhaCungCap] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const res = await getAllNhaCungCap();
    setNhaCungCap(res);
  }
  const themNhaCungCapp = async (data) => {
    const res = await themNhaCungCap(data);
    setNhaCungCap(res);
  };

  return (
    <Fragment>
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 ">
            <NguoiDung />
            <div className="container border shadow rounded">
              <div className="row my-3 d-flex align-items-center">
                <div className="col-5">
                  <ModalAddNhaCungCap submitHandler={themNhaCungCapp} />
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Mã Nhà Cung Cấp</th>
                    <th scope="col">Tên Nhà Cung Cấp</th>
                    <th scope="col">Địa Chỉ</th>
                    <th scope="col">Số Điện Thoại</th>
                  </tr>
                </thead>
                <tbody>
                  <NhaCungCap
                    nhaCungCap={nhaCungCap}
                    setNhaCungCap={setNhaCungCap}
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentNhaCungCap;
