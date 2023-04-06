import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CaLamViec from "./CaLamViec";
import NguoiDung from "./NguoiDung";
import Sidebar from "./Sidebar";
import { getAllCaLamViec, themCaLamViec } from "@/api/caLamViecApi";
import ModalAddCaLamViec from "../Modal/ModalAddCaLamViec";

const ContentCaLamViec = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const [caLamViec, setCaLamViec] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const res = await getAllCaLamViec();
    setCaLamViec(res);
  }
  const themCaLamViecc = async (data) => {
    const res = await themCaLamViec(data);
    setCaLamViec(res);
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
                  <ModalAddCaLamViec submitHandler={themCaLamViecc} />
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Mã Ca Làm Việc</th>
                    <th scope="col">Tên Ca Làm Việc</th>
                    <th scope="col">Số Giờ Làm</th>
                  </tr>
                </thead>
                <tbody>
                  <CaLamViec
                    caLamViec={caLamViec}
                    setCaLamViec={setCaLamViec}
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

export default ContentCaLamViec;
