import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import {
  BsFillCalendar2DateFill,
  BsFillCalendarDateFill,
} from "react-icons/bs";
function ModalAddNhanVien(props) {
  const [selectedDate, setSelectedDate] = useState(moment());
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const luuHandler = (e) => {
    toggle();
  };
  const onSubmit = (data) => {
    data.startDate = new Date(data.startDate).toLocaleDateString("en-GB");
    console.log(data);
  };

  return (
    <Fragment>
      <Button onClick={toggle} className="btn bg-primary my-3 text-white">
        Tạo tài khoản nhân viên
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle} className="fw-bold">
          Tạo Tài Khoản Nhân Viên
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group row my-2">
                    <label className="col-sm-3 col-form-label">Tên</label>
                    <div className="col-sm-9">
                      <input
                        {...register("name", {
                          required: true,
                          maxLength: 20,
                        })}
                        type="text"
                        required
                        className="form-control inputText"
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
                  <div className="form-group row my-2">
                    <label className="col-sm-3 col-form-label">Email</label>
                    <div className="col-sm-9">
                      <input
                        {...register("email", {
                          required: true,
                          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        })}
                        type="text"
                        className="form-control inputText"
                        required
                      />
                    </div>
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9">
                      {errors?.email?.type === "required" && (
                        <span className=" text-danger">
                          Vui lòng nhập email
                        </span>
                      )}
                      {errors?.email?.type === "pattern" && (
                        <span className=" text-danger">
                          Định dạng email sai
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label className="col-sm-3 col-form-label">
                      Điện Thoại
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
                        className="form-control inputText"
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
                  <div className="form-group row my-2">
                    <label className="col-sm-3">Giới Tính</label>
                    <div className="col-sm-3">
                      <div className="form-outline">
                        <select
                          {...register("gender")}
                          className="form-select form-select-sm text-center"
                        >
                          <option value="nam">Nam</option>
                          <option value="nữ">Nữ</option>
                        </select>
                      </div>
                    </div>
                    <label className="col-3">Ngày sinh</label>
                    <div className="col-3">
                      <Controller
                        className="w-100"
                        name="startDate"
                        control={control}
                        defaultValue={new Date()}
                        render={({ field }) => (
                          
                          <DatePicker
                            {...field}
                            selected={field.value}
                            className="my-datepicker-input"
                            onChange={(date) => field.onChange(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Select a date"
                          />
                        )}
                      />
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center ">
                    <button
                      className="btn btn-info my-2  text-white fw-bold w-100"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-between"></ModalFooter>
      </Modal>
    </Fragment>
  );
}

export default ModalAddNhanVien;
