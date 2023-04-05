import React, { Fragment, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import ModalAddLoaiThuoc from "../Modal/ModalAddLoaiThuoc";
import LoaiThuoc from "./LoaiThuoc";
import NguoiDung from "./NguoiDung";
import Sidebar from "./Sidebar";
import { getAllLoaiThuoc, themLoaiThuoc } from "@/api/loaiThuocApi";

const ContentLoaiThuoc = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();

  const [loaiThuoc, setLoaiThuoc] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const data = await getAllLoaiThuoc();
    setLoaiThuoc(data);
  }
  const themLoaiThuocc = async (data) => {
    const res = await themLoaiThuoc(data);
    setLoaiThuoc(res);
  };
  //gợi ý tìm kiếm loại Thuốc
  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    console.log(searchTerm);
    if (timeoutId) {
      clearTimeout(timeoutId); // Xóa timeout trước đó nếu còn tồn tại
    }

    if (searchTerm.length > 0) {
      const newTimeoutId = setTimeout(() => {
        fetch(
          `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/tim-loai-thuoc?keyword=${encodeURIComponent(
            searchTerm
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (results.length > 0) setLoaiThuoc(results);
            else {
              setLoaiThuoc([]);
            }
          });
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      fetch(
        "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setLoaiThuoc(data);
        })
        .catch((error) => console.error(error));
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
                <div className="col-5">
                  <form>
                    <div className="position-relative">
                      <input
                        type="text"
                        className="form-control w-100 px-2"
                        placeholder="Nhập tên loại thuốc bạn muốn tìm"
                        value={searchTerm}
                        onChange={handleInputChange}
                      />
                      <BsSearch className="position-absolute  localIconSearch" />
                    </div>
                  </form>
                </div>
                <div className="col-7">
                  <ModalAddLoaiThuoc submitHandler={themLoaiThuocc} />
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Mã Loại Thuốc</th>
                    <th scope="col">Tên Loại Thuốc</th>
                    <th scope="col">Mô tả chung</th>
                  </tr>
                </thead>
                <tbody>
                  <LoaiThuoc
                    loaiThuoc={loaiThuoc}
                    setLoaiThuoc={setLoaiThuoc}
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

export default ContentLoaiThuoc;
