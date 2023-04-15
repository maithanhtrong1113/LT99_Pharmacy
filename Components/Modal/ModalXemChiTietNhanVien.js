import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getAllCaLamViec } from "@/api/caLamViecApi";

function ModalAddNhanVien(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [caLamViec, setCaLamViec] = useState([]);
  useEffect(() => {
    DanhSachCaLamViec();
  }, []);
  const onSubmit = (data) => {
    data.date = new Date(data.date).toLocaleDateString("vi-VN");
    console.log(data);
    props.addNhanVienHandler(data);
    toggle();
  };
  async function DanhSachCaLamViec() {
    const data = await getAllCaLamViec();
    setCaLamViec(data);
  }
  return (
    <Fragment>
      <Button onClick={toggle} className="btn bg-primary my-3 text-white">
        Thêm nhân viên
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        {...props}
        className="w-modalAddNhanVien"
      >
        <ModalHeader toggle={toggle}>
          <span className="fw-bold text-info ">Thêm Nhân Viên</span>
        </ModalHeader>
        <ModalBody>
          <div className="container rounded border shadow">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  {/* Tên */}
                  <div className="form-group row my-2">
                    <label className="col-sm-3 col-form-label fw-bold text-info">
                      Họ và tên:
                    </label>
                    <div className="col-sm-9">
                      <input
                        {...register("name", {
                          required: true,
                          maxLength: 20,
                        })}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                      {errors?.name?.type === "required" && (
                        <span className="text-danger">Vui lòng nhập tên</span>
                      )}
                      {errors?.name?.type === "maxLength" && (
                        <span className="text-danger">
                          Tên không vượt qua 20 ký tự
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Số Điện Thoại */}
                  <div className="form-group row my-2">
                    <label className="col-sm-3 col-form-label fw-bold text-info">
                      Điện Thoại:
                    </label>
                    <div className="col-sm-9">
                      <input
                        {...register("phone", {
                          required: true,
                          pattern:
                            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/i,
                        })}
                        type="tel"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
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
                  </div>

                  {/* Giới Tính và ngày sinh */}
                  <div className="form-group row my-2">
                    <label className="col-sm-3 fw-bold text-info">
                      Giới Tính:
                    </label>
                    <div className="col-sm-3">
                      <div className="form-outline">
                        <select
                          {...register("gender")}
                          className="form-select form-select-sm "
                        >
                          <option value="Nam">Nam</option>
                          <option value="Nữ">Nữ</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-sm-6 d-flex">
                      <label className="fw-bold w-75 text-info p">
                        Ngày sinh:
                      </label>
                      <Controller
                        className="w-100 pr-opx"
                        name="date"
                        control={control}
                        defaultValue={new Date()}
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
                  {/* Địa chỉ */}
                  <div className="form-group row my-2">
                    <div className="col-3">
                      <label className="fw-bold text-info">Địa chỉ:</label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        {...register("diaChi", {
                          required: true,
                        })}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                      {errors?.diaChi?.type === "required" && (
                        <span className=" text-danger">
                          Vui lòng nhập địa chỉ
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Tên đăng nhập */}
                  <div className="form-group row my-2">
                    <div className="col-3">
                      <label className="fw-bold text-info">
                        Tên đăng nhập:
                      </label>
                    </div>
                    <div className="col-sm-9">
                      <input
                        {...register("tenDangNhap", {
                          required: true,
                        })}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                      {errors?.tenDangNhap?.type === "required" && (
                        <span className=" text-danger">
                          Vui lòng nhập tên đăng nhập
                        </span>
                      )}
                    </div>
                  </div>
                  {/* password */}
                  <div className="form-group row my-2">
                    <label className="col-sm-3 col-form-label fw-bold text-info">
                      Password:
                    </label>
                    <div className="col-sm-9">
                      <input
                        {...register("password", {
                          required: true,
                          minLength: 8,
                        })}
                        type="password"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                      {errors?.password?.type === "required" && (
                        <span className=" text-danger">
                          Vui lòng nhập mật khẩu
                        </span>
                      )}
                      {errors?.password?.type === "minLength" && (
                        <span className=" text-danger">
                          Mật khẩu tối thiểu phải có 8 ký tự
                        </span>
                      )}
                    </div>
                  </div>
                  {/* Ca làm Việc và Quyền */}
                  <div className="form-group row my-2">
                    <div className="col-3">
                      <label className="fw-bold text-info">Ca làm việc</label>
                    </div>
                    <div className="col-3">
                      {caLamViec.length !== 0 && (
                        <select
                          className="form-select form-select-sm"
                          {...register("caLamViec")}
                          defaultValue={caLamViec[0].maCaLam}
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
                      )}
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center ">
                    <button
                      className="btn btn-info my-3  text-white fw-bold w-100"
                      type="submit"
                    >
                      Tạo tài khoản
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

export default ModalAddNhanVien;
