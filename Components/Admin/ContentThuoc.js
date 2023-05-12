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
import { useSelector } from "react-redux";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";

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
  const role = useSelector((state) => state.auth.role);
  const [page, setPage] = useState(1);
  const [totalPage, setTotal] = useState(0);
  //Lấy all loại thuốc
  async function fetchData() {
    const data = await getAllLoaiThuoc();
    setLoaiThuoc(data);
  }
  // lấy all thuốc
  async function DanhSachThuoc() {
    const data = await getAllThuoc();
    setTotal(Math.ceil(data.length / 12));
    setDsThuoc(getItems(data, page));
  }
  const getItems = (data, page) => {
    const start = (page - 1) * 12;
    const end = start + 12;
    return data.slice(start, end);
  };
  const buttons = [];
  for (let i = 1; i <= totalPage; i++) {
    buttons.push(
      <div className="col-1">
        <button
          className={`btn btn-info rounded-circle w-50 ${
            page === i ? "active" : ""
          } `}
          key={i}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      </div>
    );
  }
  useEffect(() => {
    fetchData();
    if (loaiThuocSelected === "All") {
      DanhSachThuoc();
    } else {
      DanhSachThuocTheoLoai(loaiThuocSelected);
    }
  }, [loaiThuocSelected, page]);
  // lấy thuốc theo loại
  async function DanhSachThuocTheoLoai(loaiThuocSelected) {
    const data = await getThuocTheoLoai(loaiThuocSelected);
    setTotal(Math.ceil(data.length / 12));
    setDsThuoc(getItems(data, page));
  }
  console.log(totalPage);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

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
            if (results.length > 0) {
              setTotal(Math.ceil(results.length / 12));
              setPage(1);
              setDsThuoc(getItems(results, page));
            } else {
              setDsThuoc([]);
            }
          });
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      DanhSachThuoc();
    }
  };
  // Thêm thuốc
  const addThuocHandler = async (data) => {
    const res = await themThuoc(data);
    setTotal(Math.ceil(res.length / 12));
    setPage(Math.ceil(res.length / 12)); //lấy trang cuối cùng
    setDsThuoc(getItems(res, page));
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
                        setPage(1);
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
                {role === 1 && (
                  <div className="col-2">
                    <ModalAddThuoc submitHandler={addThuocHandler} />
                  </div>
                )}
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Mã Thuốc</th>
                    <th scope="col">Tên Thuốc</th>
                    <th scope="col">Thuốc kê đơn</th>
                    <th scope="col">Loại Thuốc</th>
                    <th scope="col">Số Lượng</th>
                  </tr>
                </thead>
                <tbody>
                  <Thuoc
                    dsThuoc={dsThuoc}
                    setDsThuoc={setDsThuoc}
                    loaiThuocSelected={loaiThuocSelected}
                    page={page}
                    setPage={setPage}
                    totalPage={totalPage}
                    setTotal={setTotal}
                    getItems={getItems}
                  />
                </tbody>
              </table>
              {totalPage > 1 && (
                <div className="row d-flex justify-content-center align-items-center my-2">
                  <div className="col-1">
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        setPage(page === 1 ? page : page - 1);
                      }}
                    >
                      <AiOutlineDoubleLeft />
                    </button>
                  </div>
                  {buttons}
                  <div className="col-1">
                    <button
                      className="btn btn-info"
                      onClick={() => {
                        setPage(page === totalPage ? page : page + 1);
                      }}
                    >
                      <AiOutlineDoubleRight />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentThuoc;
