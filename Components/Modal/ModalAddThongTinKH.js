import React, { Fragment, use, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import { GoLocation } from "react-icons/go";
import ModalDiaChi from "./ModalDiaChi";
import { MdLocationPin } from "react-icons/md";
import khachHang from "@/pages/admin/khachHang";

function ModalAll(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [modal, setModal] = useState(false);

  const toggle = () => {
    setModal(!modal);
  };
  const [data, setData] = useState([]);
  const [err, setErr] = useState({ show: false, mess: "" });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [diaChi, setDiaChi] = useState("");

  const [dsTinh, setDsTinh] = useState([]);
  const [tinhSelected, setTinhSelected] = useState({
    name: "",
    code: "",
  });
  const [dsQuan, setDsQuan] = useState([{ name: "Chọn quận/huyện" }]);
  const [quanSelected, setQuanSelected] = useState({
    name: "",
    code: "",
  });
  const [dsXa, setDsXa] = useState([{ name: "Chọn phường/xã" }]);
  const [xaSelected, setXaSelected] = useState({
    name: "",
    code: "",
  });
  const [khachHangFull, setKhachHangFull] = useState({});
  const onSubmit = (data) => {
    if (xaSelected.name === "") {
      setErr({ show: true, mess: "Vui Lòng Chọn Xã/Phường" });
    }
    if (quanSelected.name === "") {
      setErr({ show: true, mess: "Vui Lòng Chọn Quận/Huyện" });
    }
    if (tinhSelected.name === "") {
      setErr({ show: true, mess: "Vui Lòng Chọn Tỉnh" });
    }

    if (
      tinhSelected.name === "" ||
      quanSelected.name === "" ||
      xaSelected.name === ""
    ) {
      return;
    }
    data.diaChi =
      data.diaChi +
      ", " +
      JSON.parse(xaSelected).name +
      ", " +
      JSON.parse(quanSelected).name +
      ", " +
      JSON.parse(tinhSelected).name;
    // data = { diaChi: data.diaChi, hoTen: data.name, soDienThoai: data.phone };
    // setKhachHangFull(data);

    //thêm khách hàng vào  csdl
    fetch(
      "http://localhost:8080/QLNT-Server/nhan-vien/quan-ly-khach-hang/khach-hang",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hoTen: data.name,
          soDienThoai: data.phone,
          diaChi: data.diaChi,
          email: data.email,
        }),
      }
    )
      .then((response) => response.json())
      .then((results) => {
        setKhachHangFull(results);
        props.sendDataToCheckOut(results);
      });
    toggle();
  };

  useEffect(() => {
    if (
      tinhSelected.name !== "" &&
      quanSelected.name !== "" &&
      xaSelected.name !== ""
    ) {
      setErr({ show: false, mess: " " });
    }
    // Danh sách tỉnh
    fetch(`https://provinces.open-api.vn/api/p/`)
      .then((response) => response.json())
      .then((data) => {
        setDsTinh(data);
      })
      .catch((error) => console.error(error));
    // Danh sách quận huyện
    if (tinhSelected.code !== "") {
      fetch(
        `https://provinces.open-api.vn/api/p/${
          JSON.parse(tinhSelected).code
        }?depth=2`
      )
        .then((response) => response.json())
        .then((data) => {
          setDsQuan(data.districts);
        })
        .catch((error) => console.error(error));
    }
    if (quanSelected.code !== "") {
      fetch(
        `https://provinces.open-api.vn/api/d/${
          JSON.parse(quanSelected).code
        }?depth=2`
      )
        .then((response) => response.json())
        .then((data) => {
          setDsXa(data.wards);
        })
        .catch((error) => console.error(error));
    }
  }, [tinhSelected, quanSelected, xaSelected]);
  const [timeoutId1, setTimeoutId1] = useState(null);
  const [searchTerm1, setSearchTerm1] = useState("");
  const [dsKhachHang, setDsKhachHang] = useState([]);
  const [errDT, setErrDT] = useState(false);
  const [valueText, setValueText] = useState();

  const handleInputChange1 = (event) => {
    const searchTerm1 = event.target.value;
    setSearchTerm1(searchTerm1);
    const pattern =
      /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    if (searchTerm1 === "") {
      setValueText("Vui Lòng Nhập Số Điện thoại của bạn");
    } else {
      if (!pattern.test(searchTerm1)) {
        setErrDT(true);
        setValueText("Số điện thoại không tồn tại");
        setDsKhachHang([]);
        return;
      } else {
        setErrDT(false);
      }
    }

    if (timeoutId1) {
      clearTimeout(timeoutId1); // Xóa timeout trước đó nếu còn tồn tại
    }

    if (searchTerm1.length > 0) {
      const newTimeoutId1 = setTimeout(() => {
        fetch(
          `http://localhost:8080/QLNT-Server/nhan-vien/quan-ly-khach-hang/tim-khach-hang?keyword=${encodeURIComponent(
            searchTerm1
          )}`
        )
          .then((response) => response.json())
          .then((results) => {
            if (results.length > 0) setDsKhachHang(results);
            else {
              setDsKhachHang([]);
              setErrDT(true);
              setValueText(
                "Không tìm thấy thông tin của bạn hãy chọn nhập thông tin"
              );
            }
          });
      }, 500);
      setTimeoutId1(newTimeoutId1);
    } else {
      setDsKhachHang([]);
    }
  };
  const [showNhap, setShowNhap] = useState(true);
  const [showNhapCoSan, setShowNhapCoSan] = useState(false);
  const [diaChiFull, setDiaChiFull] = useState("");
  const [errDiaChiCoSan, setErrDiaChiCoSan] = useState(false);
  const [email, setEmail] = useState("");
  const [emailerr, setEmailErr] = useState(false);
  useEffect(() => {
    if (diaChiFull !== "") {
      setErrDiaChiCoSan(false);
    }
  }, [diaChiFull]);
  const addDiaChiFromModal = (data) => {
    setDiaChiFull(data);
    setKhachHangFull({
      ...khachHangFull,
      diaChi: data,
    });
  };
  const changein4Customer = () => {
    fetch(
      `http://localhost:8080/QLNT-Server/khach-hang/thong-tin-khach-hang/${khachHangFull.maKhachHang}/cap-nhat-thong-tin-ca-nhan`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          soDienThoai: khachHangFull.soDienThoai,
          hoTen: khachHangFull.hoTen,
          email: email,
          diaChi: diaChiFull,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setKhachHangFull(data);
      })
      .catch((error) => console.error(error));
  };
  return (
    <Fragment>
      <button onClick={toggle} className="btn bg-light">
        <div className="col-xl-12 col-lg-12 d-flex align-items-start flex-column justify-content-start text-muted">
          <div>
            <GoLocation className="text-info" />
            <span className=" ms-1 mb-0 ">Thông tin của người nhận hàng :</span>
          </div>
          {Object.keys(khachHangFull).length !== 0 && (
            <div className="d-flex flex-column align-items-start">
              <span className="mb-0 fw-bold text-info">
                {`${khachHangFull.hoTen}, ${khachHangFull.soDienThoai} `}
              </span>
              <span className="mb-0 fw-bold text-success">
                {khachHangFull.diaChi}
              </span>
            </div>
          )}
        </div>
        {name !== "" &&
          phone !== "" &&
          diaChi !== "" &&
          district !== "" &&
          ward !== "" &&
          city !== "" && (
            <Fragment>
              <div className="col-xl-12 col-lg-12 d-flex align-items-center text-dark">
                <span className="ms-4">
                  {name} | {phone}
                </span>
              </div>
              <div className="col-xl-12 col-lg-12 d-flex align-items-center text-dark">
                <span className="ms-4">
                  {diaChi}, {district}, {ward}, {city}
                </span>
              </div>
            </Fragment>
          )}
      </button>

      <Modal
        isOpen={modal}
        toggle={toggle}
        backdrop="static"
        className="w-modalDiaChi"
        {...props}
      >
        <ModalHeader toggle={toggle} className="fw-bold">
          Thông tin của người nhận hàng
        </ModalHeader>
        {showNhap && (
          <ModalBody>
            <div className="container">
              <div className="row">
                <input
                  value={searchTerm1}
                  onChange={handleInputChange1}
                  type="tel"
                  placeholder="Nhập số điện thoại của bạn"
                  className="form-control w-100 px-2"
                />
              </div>
              {errDT && <span className="text-danger">{valueText} </span>}

              <div className="row rouded border">
                {dsKhachHang.map((khachHang) => (
                  <button
                    className="col-12 d-flex justify-content-between btn btn-light"
                    onClick={() => {
                      setDiaChiFull(khachHang.diaChi);
                      setEmail(khachHang.email);
                      setKhachHangFull(khachHang);
                      setShowNhapCoSan(true);
                      setDsKhachHang([]);
                    }}
                  >
                    <div className="d-flex">
                      <div>{`${khachHang.hoTen} `}</div>
                    </div>
                  </button>
                ))}
              </div>
              {showNhapCoSan && (
                <div className="row my-3 ">
                  <div className="col-12">
                    <h5 className="text-info">{`Xin chào ${khachHangFull.hoTen} `}</h5>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="col-8">
                      <textarea
                        placeholder="Nhập địa chỉ giao hàng của bạn"
                        className="form-control opacity-50"
                        readOnly
                        value={diaChiFull}
                        onChange={(e) => {
                          setDiaChiFull(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-4 text-end">
                      <ModalDiaChi
                        diaChiFull={diaChiFull}
                        setAddDiaChi={addDiaChiFromModal}
                      />
                    </div>
                  </div>
                  {errDiaChiCoSan && (
                    <div className="col-12 text-danger">
                      <span>Vui lòng thêm địa chỉ nhận hàng</span>
                    </div>
                  )}
                  <div className=" my-3">
                    <div className="col-8">
                      <input
                        placeholder="Nhập email của bạn"
                        className="form-control"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-4"></div>
                    {emailerr && (
                      <div className="col-12 text-danger">
                        <span>Vui lòng nhập địa chỉ email</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="row d-flex justify-content-between my-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowNhap(false);
                  }}
                  className="col-7 btn btn-primary"
                >
                  Nhập thông tin của bạn
                </button>
                <button
                  type="button"
                  className="col-4 btn btn-info "
                  onClick={() => {
                    if (diaChiFull === "" || diaChiFull === null) {
                      setErrDiaChiCoSan(true);
                      return;
                    } else {
                      setErrDiaChiCoSan(false);
                    }
                    if (email === "" || email === null) {
                      setEmailErr(true);
                      return;
                    } else {
                      setEmailErr(false);
                    }

                    props.sendDataToCheckOut(khachHangFull);
                    changein4Customer();
                    toggle();
                  }}
                >
                  Xác Nhận
                </button>
              </div>
            </div>
          </ModalBody>
        )}
        {!showNhap && (
          <ModalBody>
            <div className="container">
              <div className="row">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="col-12 my-3">
                    <h6 className="text-dark fw-bold">
                      Tên người nhận <span className="text-danger">*</span>
                    </h6>
                    <input
                      {...register("name", {
                        required: true,
                        maxLength: 20,
                      })}
                      type="text"
                      required
                      placeholder="Tên người nhận"
                      className="form-control"
                    />
                    {errors?.name?.type === "required" && (
                      <span className="text-danger">Tên không được trống</span>
                    )}
                    {errors?.name?.type === "maxLength" && (
                      <span className="text-danger">
                        Tên không vượt qua 20 ký tự
                      </span>
                    )}
                  </div>
                  <div className="col-12 my-3">
                    <h6 className="text-dark fw-bold">
                      Số điện thoại người nhận
                      <span className="text-danger">*</span>
                    </h6>
                    <input
                      {...register("phone", {
                        required: true,
                        pattern:
                          /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/i,
                      })}
                      type="text"
                      required
                      placeholder="Số điện thoại người nhận"
                      className="form-control inputText"
                    />
                    {errors?.phone?.type === "required" && (
                      <span className=" text-danger">
                        Vui lòng nhập số điện thoại
                      </span>
                    )}
                    {errors?.phone?.type === "pattern" && (
                      <span className=" text-danger">
                        Số điện thoại không tồn tại
                      </span>
                    )}
                  </div>
                  <div className="col-12 my-3">
                    <h6 className="text-dark fw-bold">
                      Email
                      <span className="text-danger">*</span>
                    </h6>
                    <input
                      {...register("email", {
                        required: true,

                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      })}
                      type="text"
                      required
                      placeholder="Nhập địa chỉ email của bạn"
                      className="form-control inputText"
                    />
                    {errors?.email?.type === "required" && (
                      <span className=" text-danger">Vui lòng nhập email</span>
                    )}
                    {errors?.email?.type === "pattern" && (
                      <span className=" text-danger">
                        Email không đúng định dạng
                      </span>
                    )}
                  </div>
                  <div className="col-12 my-3">
                    <select
                      className="form-select"
                      onChange={(e) => {
                        setTinhSelected(e.target.value);
                        setQuanSelected({ name: "", code: "" });
                        setXaSelected({ name: "", code: "" });
                        setDsXa([]);
                      }}
                    >
                      {dsTinh.map((tinh) => (
                        <option
                          key={tinh.code}
                          value={JSON.stringify({
                            name: tinh.name,
                            code: tinh.code,
                          })}
                        >
                          {tinh.name}
                        </option>
                      ))}
                    </select>
                    <div className="col-12 my-3">
                      <select
                        className="form-select"
                        onChange={(e) => {
                          setQuanSelected(e.target.value);
                          setXaSelected({ name: "", code: "" });
                        }}
                      >
                        {dsQuan.map((quan) => (
                          <option
                            key={quan.code}
                            value={JSON.stringify({
                              name: quan.name,
                              code: quan.code,
                            })}
                          >
                            {quan.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12 my-3">
                      <select
                        className="form-select"
                        onChange={(e) => {
                          setXaSelected(e.target.value);
                        }}
                      >
                        {dsXa.map((xa) => (
                          <option
                            value={JSON.stringify({
                              name: xa.name,
                              code: xa.code,
                            })}
                            key={xa.code}
                          >
                            {xa.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-12 my-3">
                    <label className="fw-bold">
                      Địa chỉ cụ thể
                      <span className="text-danger">*</span>
                    </label>
                    <input
                      {...register("diaChi", {
                        required: true,
                      })}
                      type="text"
                      required
                      placeholder="Số nhà/tên tòa nhà cụ thể"
                      className="form-control "
                    />
                    {errors?.diaChi?.type === "required" && (
                      <span className="text-danger">Vui lòng nhập địa chỉ</span>
                    )}
                  </div>
                  <div className="col-12 mb-1">
                    {err.show && (
                      <span className="text-danger">{err.mess}</span>
                    )}
                  </div>

                  <div className="col-7 d-inline-block ">
                    <Button
                      type="button"
                      color="warning"
                      className="w-100"
                      onClick={() => setShowNhap(true)}
                    >
                      Bạn đã từng mua hàng
                    </Button>
                  </div>
                  <div className="col-5 d-inline-block text-end">
                    <Button color="primary" type="submit" className="w-50">
                      Lưu
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </ModalBody>
        )}
      </Modal>
    </Fragment>
  );
}

export default ModalAll;
