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
  const [nhanVien, setNhanVien] = useState(props.nhanVien);
  if (nhanVien !== props.nhanVien) {
    setNhanVien(props.nhanVien);
  }
  return (
    <Fragment>
      <Button onClick={toggle} className="btn btn-info btn-sm">
        Xem Chi Tiết
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        {...props}
        className="w-modalAddNhanVien"
      >
        <ModalHeader toggle={toggle}>
          <span className="fw-bold text-info"> Thông Tin Nhân Viên</span>
        </ModalHeader>
        <ModalBody>
          <div className="container rounded border shadow">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form noValidate>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Mã Nhân Viên:
                    </label>
                    <div className="col-sm-8 fw-bold text-info">
                      <label>{nhanVien.maNhanVien}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Tên Nhân Viên:
                    </label>
                    <div className="col-sm-8">
                      <label>{nhanVien.hoTen}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Số điện thoại:
                    </label>
                    <div className="col-sm-8">
                      <label>{nhanVien.soDienThoai}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Địa Chỉ:
                    </label>
                    <div className="col-sm-8">
                      <label>
                        {nhanVien.diaChi === "" || nhanVien.diaChi === null ? (
                          <BsThreeDots className="text-success fs-20" />
                        ) : (
                          nhanVien.diaChi
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
                        {nhanVien.gioiTinh === "" ||
                        nhanVien.gioiTinh === null ? (
                          <BsThreeDots className="text-success fs-20" />
                        ) : (
                          nhanVien.gioiTinh
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
                        {nhanVien.ngaySinh === "" ||
                        nhanVien.ngaySinh === null ? (
                          <BsThreeDots className="text-success fs-20" />
                        ) : (
                          nhanVien.ngaySinh
                        )}
                      </label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Ca Làm Việc:
                    </label>
                    <div className="col-sm-8">
                      <label>{nhanVien.caLamViec.tenCa}</label>
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
