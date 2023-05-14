import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Controller, useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import { BsThreeDots } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { getAllCaLamViec } from "@/api/caLamViecApi";
import { useEffect } from "react";
import { isSameDay } from "../utils/sanDay";

function ModalChangeIn4ByQL(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [nhanVien, setNhanVien] = useState(props.nhanVien);
  const [caLamViec, setCaLamViec] = useState([]);
  const [hoTen, setHoTen] = useState(nhanVien.hoTen);
  const [soDienThoai, setSoDienThoai] = useState(nhanVien.soDienThoai);
  const [diaChi, setDiaChi] = useState(nhanVien.diaChi);
  const [selectedGT, setGT] = useState(nhanVien.gioiTinh);
  const [caLamViecsl, setCaLamViecSL] = useState(nhanVien.caLamViec.maCaLam);
  const dateParts = nhanVien.ngaySinh.split("/");
  const onSubmit = (data) => {
    data.date = new Date(data.date).toLocaleDateString("vi-VN");
    const trung =
      data.date === new Date().toLocaleDateString("vi-VN") ? true : false;
    trung === true
      ? (data.ngaySinh = props.nhanVien.ngaySinh)
      : (data.ngaySinh = data.date);
    data.gioiTinh = selectedGT;
    data.caLamViec = { maCaLam: caLamViecsl };
    data.maNhanVien = nhanVien.maNhanVien;
    console.log(data);
    props.changeNVSubmit(data);
    toggle();
  };
  async function fetchData() {
    const res = await getAllCaLamViec();
    setCaLamViec(res);
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <Button
        onClick={toggle}
        color="warning"
        className="btn btn-white btn-sm text-dark fw-bold  text-start"
      >
        Cập nhập thông tin
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        {...props}
        className="w-modalAddNhanVien2"
      >
        <ModalHeader toggle={toggle}>
          <span className="fw-bold text-info">
            Chỉnh Sửa Thông Tin Nhân Viên
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="container rounded border shadow">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form noValidate onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Tên Nhân Viên:
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("hoTen", {
                          required: true,
                        })}
                        className="form-control"
                        value={hoTen}
                        onChange={(e) => {
                          setHoTen(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.hoTen?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập họ tên nhân viên
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Số điện thoại:
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("soDienThoai", {
                          required: true,
                          pattern:
                            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/i,
                        })}
                        className="form-control"
                        value={soDienThoai}
                        onChange={(e) => {
                          setSoDienThoai(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.soDienThoai?.type === "required" && (
                        <span className=" text-danger">
                          Vui lòng nhập số điện thoại
                        </span>
                      )}
                      {errors?.soDienThoai?.type === "pattern" && (
                        <span className=" text-danger">
                          Số điện thoại không tồn tại
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Địa Chỉ:
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("diaChi", {
                          required: true,
                        })}
                        className="form-control"
                        value={diaChi}
                        onChange={(e) => {
                          setDiaChi(e.target.value);
                        }}
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.diaChi?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập địa chỉ
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Giới Tính:
                    </label>
                    <div className="col-sm-8">
                      <select
                        defaultValue={selectedGT}
                        onChange={(e) => {
                          setGT(e.target.value);
                        }}
                        className="form-select"
                      >
                        <option value={"Nam"}>Nam</option>
                        <option value={"Nữ"}>Nữ</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Ngày Sinh:
                    </label>
                    <div className="col-sm-8">
                      <Controller
                        className="w-100 pr-opx"
                        name="date"
                        control={control}
                        defaultValue={
                          new Date(
                            +dateParts[2],
                            dateParts[1] - 1,
                            +dateParts[0]
                          )
                        }
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            selected={field.value}
                            className="my-datepicker-input form-select form-control form-control-sm"
                            onChange={(date) => field.onChange(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select a date"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Ca Làm Việc:
                    </label>
                    <div className="col-sm-8">
                      <select
                        className="form-select"
                        defaultValue={caLamViecsl}
                        onChange={(e) => setCaLamViecSL(e.target.value)}
                      >
                        {caLamViec.map((caLamViec) => (
                          <option
                            key={caLamViec.maCaLam}
                            value={caLamViec.maCaLam}
                          >
                            {caLamViec.tenCa}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <ModalFooter className="d-flex justify-content-between">
                    <Button color="secondary" onClick={toggle} className="w-25">
                      Hủy
                    </Button>
                    <Button color="primary" className="w-25" type="submit">
                      Lưu
                    </Button>
                  </ModalFooter>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default ModalChangeIn4ByQL;
