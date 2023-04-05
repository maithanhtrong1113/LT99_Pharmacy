import React, { Fragment, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Sidebar from "./Sidebar";
import ModalAddThuoc from "../Modal/ModalAddThuoc";
import Thuoc from "./Thuoc";
import { BsSearch } from "react-icons/bs";
import NguoiDung from "./NguoiDung";
import { getAllLoaiThuoc } from "@/api/loaiThuocApi";
import { getAllThuoc, getThuocTheoLoai, themThuoc } from "@/api/thuocApi";

const ContentThuoc = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loaiThuoc, setLoaiThuoc] = useState([]);
  const [dsThuoc, setDsThuoc] = useState([]);
  const [loaiThuocSelected, setLoaiThuocSelected] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);
  //Lấy all loại thuốc

  async function fetchData() {
    const data = await getAllLoaiThuoc();
    setLoaiThuoc(data);
  }

  // lấy all thuốc
  async function DanhSachThuoc() {
    const data = await getAllThuoc();
    setDsThuoc(data);
  }
  // lấy thuốc theo loại
  async function DanhSachThuocTheoLoai(loai) {
    const data = await getThuocTheoLoai(loai);
    setDsThuoc(data);
  }
  useEffect(() => {
    fetchData();
    if (loaiThuocSelected === "All") {
      DanhSachThuoc();
    } else {
      DanhSachThuocTheoLoai(loaiThuocSelected);
    }
  }, [loaiThuocSelected]);

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
          `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/tim-thuoc?keyword=${encodeURIComponent(
            searchTerm
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (results.length > 0) setDsThuoc(results);
            else {
              setDsThuoc([]);
            }
          });
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      fetch(
        "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc"
      )
        .then((response) => response.json())
        .then((data) => {
          setDsThuoc(data);
        })
        .catch((error) => console.error(error));
    }
  };
  // Thêm thuốc
  const addThuocHandler = async (data) => {
    const res = await themThuoc(data);
    setDsThuoc(res);
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
                        placeholder="Nhập tên hoặc công dụng của thuốc muốn tìm"
                        className="form-control w-100 px-2"
                        value={searchTerm}
                        onChange={handleInputChange}
                      />
                      <BsSearch className="position-absolute localIconSearch" />
                    </div>
                  </form>
                </div>
                <div className="col-2">
                  <form>
                    <select
                      className="form-select form-select-sm py-2"
                      aria-label=".form-select-sm"
                      {...register("loaiThuocName", {})}
                      onChange={(e) => {
                        setLoaiThuocSelected(e.target.value);
                      }}
                    >
                      <option value={"All"} key={0} defaultValue>
                        Tất cả thuốc
                      </option>
                      {loaiThuoc.map((loaiThuoc) => (
                        <option value={loaiThuoc.maLoai} key={loaiThuoc.maLoai}>
                          {loaiThuoc.tenLoai}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
                <div className="col-2">
                  <ModalAddThuoc submitHandler={addThuocHandler} />
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Mã Thuốc</th>
                    <th scope="col">Tên Thuốc</th>
                    <th scope="col">Liều Lượng</th>
                    <th scope="col">Công Dụng</th>
                    <th scope="col">Số Lượng</th>
                    <th scope="col">Tên Loại Thuốc</th>
                  </tr>
                </thead>
                <tbody>
                  <Thuoc dsThuoc={dsThuoc} setDsThuoc={setDsThuoc} />
                  <tr>
                    <td>
                      <button className="btn btn-sm bg-dark rounded me-2 my-2">
                        <FaAngleLeft className="text-white" />
                      </button>
                      <button className="btn btn-sm bg-dark rounded my-2">
                        <FaAngleRight className="text-white" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentThuoc;
