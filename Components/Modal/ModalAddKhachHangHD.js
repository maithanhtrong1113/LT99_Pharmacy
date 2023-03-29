import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function ModalAddKhachHangHD(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },

    control,
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onSubmit = (data) => {
    data.date = new Date(data.date).toLocaleDateString("vi-VN");
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
          gioiTinh: data.gender,
          ngaySinh: data.date,
        }),
      }
    )
      .then((response) => response.json())
      .then((results) => {
        props.setThongTin(results);
        toast.success("Thêm khách hàng thành công", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
          theme: "light",
        });
      });

    toggle();
  };

  return (
    <Fragment>
      <Button
        onClick={toggle}
        className="btn bg-primary text-white "
        type="button"
      >
        Thêm khách hàng
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        {...props}
        className="w-modalAddKhachHang"
      >
        <ModalHeader toggle={toggle}>
          <span className="fw-bold text-info ">Thêm khách hàng</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
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
                      <label className="fw-bold w-100 text-info">
                        Ngày sinh:
                      </label>
                      <Controller
                        className="w-100"
                        name="date"
                        control={control}
                        defaultValue={new Date()}
                        render={({ field }) => (
                          <DatePicker
                            {...field}
                            selected={field.value}
                            className="my-datepicker-input form-select"
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
                        {...register("diaChi", {})}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9"></div>
                  </div>

                  <div className="row d-flex justify-content-center ">
                    <button
                      className="btn btn-info my-3  text-white fw-bold w-100"
                      type="submit"
                    >
                      Thêm khách hàng
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

export default ModalAddKhachHangHD;
