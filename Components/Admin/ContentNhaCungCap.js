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
  const [timeoutId1, setTimeoutId1] = useState(null);
  const [searchTerm1, setSearchTerm1] = useState("");
  const handleInputChange1 = async (event) => {
    const searchTerm1 = event.target.value;
    setSearchTerm1(searchTerm1);

    if (timeoutId1) {
      clearTimeout(timeoutId1); // Xóa timeout trước đó nếu còn tồn tại
    }

    if (searchTerm1.length > 0) {
      const newTimeoutId1 = setTimeout(() => {
        fetch(
          `http://localhost:8080/QLNT-Server/quan-ly/nha-cung-cap/tim-nha-cung-cap?keyword=${encodeURIComponent(
            searchTerm1
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (results.length > 0) setNhaCungCap(results);
            else {
              setNhaCungCap([]);
            }
          });
      }, 500);
      setTimeoutId1(newTimeoutId1);
    } else {
      const res = await getAllNhaCungCap();
      setNhaCungCap(res);
    }
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
                <div className="col-4">
                  <form>
                    <input
                      value={searchTerm1}
                      onChange={handleInputChange1}
                      type="text"
                      placeholder="Nhập tên hoặc số điện thoại nhà cung cấp "
                      className="form-control w-100 px-2"
                    />
                  </form>
                </div>
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
