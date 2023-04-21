import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

function ModalChinhSuaNhaCungCap(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [tenNhaCungCap, setTenNhaCungCap] = useState(
    props.nhaCungCap.tenNhaCungCap
  );
  const [diaChi, setDiaChi] = useState(props.nhaCungCap.diaChi);
  const [soDienThoai, setSoDienThoai] = useState(props.nhaCungCap.soDienThoai);
  const onSubmit = (data) => {
    data.maNhaCungCap = props.nhaCungCap.maNhaCungCap;
    data.tenNhaCungCap = tenNhaCungCap;
    data.diaChi = diaChi;
    data.soDienThoai = soDienThoai;
    props.chinhSuaNhaCungCapHandler(data);
    toggle();
  };
  function handleInputChange(event) {
    setTenNhaCungCap(event.target.value);
  }

  function handleInputChange1(event) {
    const value = event.target.value;
    setDiaChi(value);
  }
  function handleInputChange2(event) {
    const value = event.target.value;
    setSoDienThoai(value);
  }

  return (
    <Fragment>
      <Button onClick={toggle} className="btn btn-warning btn-sm me-2">
        Chỉnh sửa
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>
          <span className="fw-bold">Chỉnh Sửa Nhà Cung Cấp</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group row my-2">
                    <label className="col-sm-5 col-form-label fw-bold">
                      Tên Nhà Cung Cấp:
                    </label>
                    <div className="col-sm-7">
                      <input
                        {...register("tenNhaCungCap", {
                          required: true,
                        })}
                        type="text"
                        required
                        value={tenNhaCungCap}
                        onChange={handleInputChange}
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7">
                      {errors?.tenNhaCungCap?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập tên nhà cung cấp
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label className="col-sm-5 col-form-label fw-bold">
                      Địa chỉ
                    </label>
                    <div className="col-sm-7">
                      <input
                        {...register("diaChi", {
                          required: true,
                        })}
                        type="text"
                        required
                        value={diaChi}
                        onChange={handleInputChange1}
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7">
                      {errors?.diaChi?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập địa chỉ
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label className="col-sm-5 col-form-label fw-bold">
                      Số Điện Thoại
                    </label>
                    <div className="col-sm-7">
                      <input
                        {...register("soDienThoai", {
                          required: true,
                          pattern:
                            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/i,
                        })}
                        type="tel"
                        required
                        value={soDienThoai}
                        onChange={handleInputChange2}
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7">
                      {errors?.soDienThoai?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập số điện thoại
                        </span>
                      )}
                      {errors?.soDienThoai?.type === "pattern" && (
                        <span className="text-danger">
                          Số điện thoại không tồn tại
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row d-flex justify-content-between ">
                    <button
                      className="btn btn-danger btn-sm my-3  text-white fw-bold w-25"
                      type="button"
                      onClick={toggle}
                    >
                      Hủy
                    </button>
                    <button
                      className="btn btn-info my-3 btn-sm text-white fw-bold w-50"
                      type="submit"
                    >
                      Chỉnh Sửa Nhà Cung Cấp
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default ModalChinhSuaNhaCungCap;
