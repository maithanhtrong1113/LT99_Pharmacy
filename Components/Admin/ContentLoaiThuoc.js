import React, { Fragment, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ModalAddLoaiThuoc from "../Modal/ModalAddLoaiThuoc";
import LoaiThuoc from "./LoaiThuoc";
import NguoiDung from "./NguoiDung";
import Sidebar from "./Sidebar";

const ContentLoaiThuoc = (props) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const dispatch = useDispatch();
  const logOutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    toggle();
  };
  const [loaiThuoc, setLoaiThuoc] = useState(props.loaiThuoc);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  // thêm loại thuốc
  const themLoaiThuoc = (data) => {
    fetch("http://localhost:8080/QLNT-Server/quan-ly/thuoc-va-loai-thuoc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenLoai: data.tenLoai,
        moTaChung: data.moTaChung,
      }),
    }).then((response) => {
      if (response.ok) {
        toast.success("Thêm loại thuốc thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      } else {
        toast.error("Thêm loại thuốc không thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      }
    });

    //   .then((response) => response.json())
    //   .then((data) => {
    //     setLoaiThuoc(data);
    //   })
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
      {/* <ProgressBar /> */}
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
                  <ModalAddLoaiThuoc submitHandler={themLoaiThuoc} />
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
                  <LoaiThuoc loaiThuoc={loaiThuoc} />
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
