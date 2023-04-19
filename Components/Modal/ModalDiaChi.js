import React, { Fragment, use, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm } from "react-hook-form";
import { GoLocation } from "react-icons/go";

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
  const [diaChiFull, setDiaChiFull] = useState("");
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
    setDiaChiFull(data.diaChi);
    props.setAddDiaChi(data.diaChi);
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
  return (
    <Fragment>
      <button onClick={toggle} className="btn btn-secondary btn-sm">
        <div className="col-xl-12 col-lg-12 d-flex align-items-start flex-column justify-content-start ">
          <div>
            <GoLocation />
            <span className="ms-1 mb-0 "> Thêm địa chỉ nhận hàng</span>
          </div>
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
        <ModalHeader className="fw-bold">Thêm địa chỉ nhận hàng</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                  {err.show && <span className="text-danger">{err.mess}</span>}
                </div>

                <div className="col-6 d-inline-block ">
                  <Button color="secondary" className="w-50" onClick={toggle}>
                    Hủy
                  </Button>
                </div>
                <div className="col-6 d-inline-block text-end">
                  <Button color="primary" type="submit" className="w-50">
                    Lưu
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default ModalAll;
