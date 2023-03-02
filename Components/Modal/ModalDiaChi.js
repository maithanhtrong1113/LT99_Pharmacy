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
  let quan = [];
  let phuong = [];
  const toggle = () => {
    setModal(!modal);
  };
  const [data, setData] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [diaChi, setDiaChi] = useState("");

  for (let i = 0; i < data.length; i++) {
    if (data[i].Name === city) {
      quan = data[i].Districts;
    }
  }
  console.log(quan);
  for (let i = 0; i < quan.length; i++) {
    if (quan[i].Name === district) {
      phuong = quan[i].Wards;
    }
  }

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
    if (modal) {
      setDiaChi("");
      setName("");
      setPhone("");
      setCity("");
      setDistrict("");
      setWard("");
    }
  }, [modal]);
  const onSubmit = async (data) => {
    setDiaChi(data.diaChi);
    setName(data.name);
    setPhone(data.phone);
    toggle();
    await props.sendDataToCheckOut({
      name,
      phone,
      diaChi,
      district,
      ward,
      city,
    });
  };

  return (
    <Fragment>
      <button onClick={toggle} className="btn bg-light">
        <div className="col-xl-12 col-lg-12 d-flex align-items-center text-muted">
          <GoLocation className="me-2" />
          <span>Địa chỉ nhận hàng</span>
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
      <Modal isOpen={modal} toggle={toggle} backdrop="static" {...props}>
        <ModalHeader className="fw-bold">Thêm địa chỉ nhận hàng</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="col-12 my-3">
                  <h6 className="text-dark">
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
                  <h6 className="text-dark">
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
                    <span className="ms-5 text-danger">
                      Số điện thoại không tồn tại
                    </span>
                  )}
                </div>
                <div className="col-12 my-3">
                  <select
                    className="form-select form-select-sm py-2 "
                    aria-label=".form-select-sm "
                    {...register("tinhh", {
                      required: true,
                    })}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  >
                    <option value="" defaultValue>
                      Chọn tỉnh thành
                    </option>
                    {data.map((city) => (
                      <option value={city.Name} key={city.Id}>
                        {city.Name}
                      </option>
                    ))}
                  </select>
                  {errors?.tinh?.type === "required" && (
                    <span className="text-danger">Vui lòng chọn tỉnh</span>
                  )}
                </div>
                <div className="col-12 my-3">
                  <select
                    className="form-select form-select-sm py-2"
                    id="district"
                    aria-label=".form-select-md"
                    {...register("quan", {
                      required: true,
                    })}
                    onChange={(e) => {
                      setDistrict(e.target.value);
                    }}
                  >
                    <option value="" defaultValue>
                      Chọn quận huyện
                    </option>

                    {quan.map((quan) => (
                      <option value={quan.Name} key={quan.Id}>
                        {quan.Name}
                      </option>
                    ))}
                  </select>
                  {errors?.quan?.type === "required" && (
                    <span className="text-danger">
                      Vui lòng chọn quận huyện
                    </span>
                  )}
                </div>
                <div className="col-12 my-3">
                  <select
                    className="form-select form-select-sm py-2"
                    id="ward"
                    aria-label=".form-select-sm"
                    {...register("phuong", {
                      required: true,
                    })}
                    onChange={(e) => {
                      setWard(e.target.value);
                    }}
                  >
                    <option value="" defaultValue>
                      Chọn phường xã
                    </option>
                    {phuong.map((phuong) => (
                      <option value={phuong.Name} key={phuong.Id}>
                        {phuong.Name}
                      </option>
                    ))}
                  </select>
                  {errors?.phuong?.type === "required" && (
                    <span className="text-danger">Vui lòng chọn phường xã</span>
                  )}
                </div>
                <div className="col-12 my-3">
                  <label>
                    Địa chỉ người nhận<span className="text-danger">*</span>
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
                <div className="col-6 d-inline-block">
                  <Button color="primary" type="submit">
                    Lưu
                  </Button>
                </div>

                <div className="col-6 d-inline-block text-end">
                  <Button color="secondary" className="ms-5" onClick={toggle}>
                    Hủy
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
