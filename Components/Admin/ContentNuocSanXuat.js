import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import NguoiDung from "./NguoiDung";
import Sidebar from "./Sidebar";

import { getAllNuocSanXuat, themNuocSanXuat } from "@/api/nuocSanXuatApi";
import NuocSanXuat from "./NuocSanXuat";
import ModalAddNuocSanXuat from "../Modal/ModalAddNuocSanXuat";

const ContentNuocSanXuat = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const [nuocSanXuat, setNuocSanXuat] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const res = await getAllNuocSanXuat();
    setNuocSanXuat(res);
  }
  const themNuocSanXuatt = async (data) => {
    const res = await themNuocSanXuat(data);
    setNuocSanXuat(res);
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
                  <ModalAddNuocSanXuat submitHandler={themNuocSanXuatt} />
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Mã Nơi Sản Xuất</th>
                    <th scope="col">Tên Nơi Sản Xuất</th>
                  </tr>
                </thead>
                <tbody>
                  <NuocSanXuat
                    nuocSanXuat={nuocSanXuat}
                    setNuocSanXuat={setNuocSanXuat}
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

export default ContentNuocSanXuat;
