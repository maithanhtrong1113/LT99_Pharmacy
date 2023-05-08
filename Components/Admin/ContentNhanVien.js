import React, { Fragment, useState } from "react";
import ModalAddNhanVien from "../Modal/ModalAddNhanVien";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import NguoiDung from "./NguoiDung";
import { Input } from "reactstrap";
import { useEffect } from "react";
import { getAllCaLamViec } from "@/api/caLamViecApi";
import {
  chinhSuaNhanVienByQuanLy,
  getAllNhanVien,
  getNhanVienTheoCaLamViec,
} from "@/api/nhanVienApi";
import xuLyTenKhiQuaDai, { xuLyDiaChiKhiQuaDai } from "../utils/tooLong";
import ModalXemChiTietKH from "../Modal/ModalXemChiTietNV";
import ModalChangeIn4ByQL from "../Modal/ModalChangeIn4ByQL";

const index = () => {
  const [dsNhanVien, setDsNhanVien] = useState([]);
  const [caLamViec, setCaLamViec] = useState([]);
  const [caLamViecSelect, setCaLamViecSelect] = useState("All");
  useEffect(() => {
    DanhSachCaLamViec();
    if (caLamViecSelect === "All") {
      DanhSachNhanVien();
    } else {
      DanhSachNhanVienTheoCa();
    }
  }, [caLamViecSelect]);
  async function DanhSachNhanVien() {
    const data = await getAllNhanVien();
    setDsNhanVien(data);
  }
  async function DanhSachCaLamViec() {
    const data = await getAllCaLamViec();
    setCaLamViec(data);
  }
  async function DanhSachNhanVienTheoCa() {
    const data = await getNhanVienTheoCaLamViec(caLamViecSelect);
    setDsNhanVien(data);
  }
  //Thêm nhân viên và tạo tài khoản
  const addNhanVienSubmit = (data) => {
    fetch("http://localhost:8080/QLNT-Server/quan-ly/nhan-vien", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hoTen: data.name,
        soDienThoai: data.phone,
        diaChi: data.diaChi,
        gioiTinh: data.gender,
        ngaySinh: data.date,
        caLamViec: { maCaLam: data.caLamViec },
        ngayVaoLam: Date.now(),
        taiKhoan: {
          userName: data.tenDangNhap,
          password: data.password,
          quyen: [{ maQuyen: "2", tenQuyen: "EMPLOYEE" }],
        },
      }),
    }).then((response) => {
      if (response.ok) {
        toast.success("Thêm nhân viên thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
        DanhSachNhanVien();
      } else {
        toast.error("Thêm nhân viên không thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      }
    });
  };
  const changeCaLamViec = (e) => {
    setCaLamViecSelect(e.target.value);
  };
  const changeNVHandler = async (data) => {
    console.log(data);
    const res = await chinhSuaNhanVienByQuanLy(data);
    setDsNhanVien(res);
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
          `http://localhost:8080/QLNT-Server/quan-ly/nhan-vien/tim-kiem-nhan-vien?keyword=${encodeURIComponent(
            searchTerm
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (results.length > 0) setDsNhanVien(results);
            else {
              setDsNhanVien([]);
            }
          });
      }, 500);
      setTimeoutId(newTimeoutId);
    } else {
      DanhSachNhanVien();
    }
  };

  return (
    <Fragment>
      <div className="container-fluid ">
        <div className="row d-flex">
          <Sidebar />
          <div className="col-10 ">
            <NguoiDung />
            <div className="container border shadow rounded ">
              <div className="row my-3 d-flex align-items-center">
                <div className="col-4">
                  <form>
                    <Input
                      type="text"
                      placeholder="Nhập tên nhân viên"
                      className="form-control w-100 px-2"
                      value={searchTerm}
                      onChange={handleInputChange}
                    />
                  </form>
                </div>
                <div className="col-3">
                  <form>
                    <select
                      className="form-select form-select-sm py-2"
                      aria-label=".form-select-sm"
                      onChange={changeCaLamViec}
                    >
                      <option value={"All"} key={0} defaultValue>
                        Tất cả ca làm việc
                      </option>
                      {caLamViec.map((caLamViec) => (
                        <option
                          value={caLamViec.maCaLam}
                          key={caLamViec.maCaLam}
                        >
                          {caLamViec.tenCa}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>
                <div className="col-5">
                  <ModalAddNhanVien addNhanVienHandler={addNhanVienSubmit} />
                </div>
              </div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Mã nhân viên</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Số điện thoại</th>

                    <th scope="col">Ngày sinh</th>
                    <th scope="col">Ca Làm Việc</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {dsNhanVien.map((nhanVien) => (
                    <tr key={nhanVien.maNhanVien}>
                      <td>{nhanVien.maNhanVien}</td>
                      <td>{nhanVien.hoTen}</td>
                      <td>{nhanVien.soDienThoai}</td>
                      <td>{nhanVien.ngaySinh}</td>
                      <td>{nhanVien.caLamViec.tenCa}</td>
                      <td>
                        <ModalXemChiTietKH nhanVien={nhanVien} />
                      </td>
                      <td>
                        <ModalChangeIn4ByQL
                          nhanVien={nhanVien}
                          changeNVSubmit={changeNVHandler}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default index;
