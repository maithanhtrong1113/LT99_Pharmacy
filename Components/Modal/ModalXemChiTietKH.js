import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import { BsThreeDots } from "react-icons/bs";

function ModalXemChiTietKH(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [khachHang, setKhachHang] = useState(props.khachHang);
  return (
    <Fragment>
      <Button onClick={toggle} className="btn btn-info btn-sm me-2">
        Xem Chi Tiết
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        {...props}
        className="w-modalAddNhanVien"
      >
        <ModalHeader toggle={toggle}>
          <span className="fw-bold text-info"> Thông Tin Khách Hàng</span>
        </ModalHeader>
        <ModalBody>
          <div className="container rounded border shadow">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form noValidate>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Mã Khách Hàng:
                    </label>
                    <div className="col-sm-8 fw-bold text-info">
                      <label>{khachHang.maKhachHang}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Tên Khách Hàng:
                    </label>
                    <div className="col-sm-8">
                      <label>{khachHang.hoTen}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Số điện thoại:
                    </label>
                    <div className="col-sm-8">
                      <label>{khachHang.soDienThoai}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Email:
                    </label>
                    <div className="col-sm-8">
                      <label>
                        {khachHang.email === "" || khachHang.email === null ? (
                          <BsThreeDots className="text-success fs-20" />
                        ) : (
                          khachHang.email
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Địa Chỉ:
                    </label>
                    <div className="col-sm-8">
                      <label>
                        {khachHang.diaChi === "" ||
                        khachHang.diaChi === null ? (
                          <BsThreeDots className="text-success fs-20" />
                        ) : (
                          khachHang.diaChi
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Giới Tính:
                    </label>
                    <div className="col-sm-8">
                      <label>
                        {khachHang.gioiTinh === "" ||
                        khachHang.gioiTinh === null ? (
                          <BsThreeDots className="text-success fs-20" />
                        ) : (
                          khachHang.gioiTinh
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Ngày Sinh:
                    </label>
                    <div className="col-sm-8">
                      <label>
                        {khachHang.ngaySinh === "" ||
                        khachHang.ngaySinh === null ? (
                          <BsThreeDots className="text-success fs-20" />
                        ) : (
                          khachHang.ngaySinh
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center "></div>
                </form>
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default ModalXemChiTietKH;
