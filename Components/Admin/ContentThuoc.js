import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Sidebar from "./Sidebar";
import ModalAddThuoc from "../Modal/ModalAddThuoc";
import Thuoc from "./Thuoc";
import { BsSearch } from "react-icons/bs";
import ProgressBar from "../ProcessBar/ProcessBar";
import NguoiDung from "./NguoiDung";
import { toast } from "react-toastify";
const ContentThuoc = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loaiThuoc, setLoaiThuoc] = useState([]);
  const [dsThuoc, setDsThuoc] = useState([]);
  const [loaiThuocSelected, setLoaiThuocSelected] = useState("Tất cả thuốc");

  // danh sách thuốc theo loại thuốc
  useEffect(() => {
    if (loaiThuocSelected === "Tất cả thuốc") {
      // danh sách tất cả thuốc truyền vào table
      fetch(
        "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc"
      )
        .then((response) => response.json())
        .then((data) => {
          setDsThuoc(data);
        })
        .catch((error) => console.error(error));
    } else {
      console.log(loaiThuocSelected);
      fetch(
        `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/${loaiThuocSelected}/thuoc`
      )
        .then((response) => response.json())
        .then((data) => {
          setDsThuoc(data);
        })
        .catch((error) => console.error(error));
    }
  }, [loaiThuocSelected]);

  useEffect(() => {
    // danh sách loại thuốc truyền vào select option
    fetch(
      "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/"
    )
      .then((response) => response.json())
      .then((data) => {
        setLoaiThuoc(data);
      })
      .catch((error) => console.error(error));
  }, []);
  const onSubmit = (data) => {
    console.log(data);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const [timeoutId, setTimeoutId] = useState(null);

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
  const addThuocHandler = (data) => {
    fetch(
      `http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc/${data.maLoai}/thuoc`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tenThuoc: data.tenThuoc,
          lieuLuong: data.lieuLuong,
          congDung: data.congDung,
          donViTinh: data.donViTinh,
          quyCachDongGoi: data.quyCachDongGoi,
          tacDungPhu: data.tacDungPhu,
          huongDanSuDung: data.huongDanSuDung,
          soLuong: 0,
          images: [],
          dsDoiTuong: [],
          thuocKeDon: false,
          moTa: data.moTa,
        }),
      }
    ).then((response) => {
      if (response.ok) {
        toast.success("Thêm thuốc thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      } else {
        toast.error("Thêm thuốc không thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      }
    });
  };
  return (
    <Fragment>
      <ProgressBar />
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
                      <option value={"Tất cả thuốc"} key={0} defaultValue>
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
                <div className="col-6">
                  <ModalAddThuoc submitHandler={addThuocHandler} />
                </div>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên Thuốc</th>
                    <th scope="col">Liều Lượng</th>
                    <th scope="col">Công Dụng</th>
                    <th scope="col">Đơn vị Tính</th>
                    {/* <th scope="col">Số Lượng</th> */}
                    <th scope="col">Tên Loại Thuốc</th>
                  </tr>
                </thead>
                <tbody>
                  <Thuoc dsThuoc={dsThuoc} />
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
