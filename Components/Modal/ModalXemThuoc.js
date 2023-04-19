import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";

function ModalXemThuoc(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  const [thuoc, setThuoc] = useState(props.thuoc);

  return (
    <Fragment>
      <Button onClick={toggle} className="btn btn-info btn-sm me-2">
        Xem Chi Tiết
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        {...props}
        className="w-modalDiaChi"
      >
        <ModalHeader toggle={toggle}>
          <span className="fw-bold text-info"> Thông Tin Loại Thuốc</span>
        </ModalHeader>
        <ModalBody>
          <div className="container rounded border shadow">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form noValidate>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Mã Thuốc:
                    </label>
                    <div className="col-sm-4">
                      <label className="text-info">{thuoc.maThuoc}</label>
                    </div>
                    <label className="col-sm-4 col-form-label fw-bold">
                      Thuốc Kê Đơn:
                      {thuoc.isThuocKeDon === true ? (
                        <BsCheck2 className="ms-3 text-success fs-20" />
                      ) : (
                        <MdOutlineClose className=" ms-3 text-danger fs-20" />
                      )}
                    </label>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Tên Thuốc:
                    </label>
                    <div className="col-sm-8">
                      <label className="fw-bold text-info">
                        {thuoc.tenThuoc}
                      </label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Loại Thuốc:
                    </label>
                    <div className="col-sm-8">
                      <label>{thuoc.loaiThuoc.tenLoai}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Liều Lượng:
                    </label>
                    <div className="col-sm-8">
                      <label>{thuoc.lieuLuong}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Công Dụng:
                    </label>
                    <div className="col-sm-8">
                      <label>{thuoc.congDung}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Đơn Vị Tính:
                    </label>
                    <div className="col-sm-8">
                      <label>{thuoc.donViTinh}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Quy Cách Đóng Gói:
                    </label>
                    <div className="col-sm-8">
                      <label>{thuoc.quyCachDongGoi}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Tác Dụng Phụ:
                    </label>
                    <div className="col-sm-8">
                      <label>{thuoc.tacDungPhu}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Hướng Dẫn Sử Dụng:
                    </label>
                    <div className="col-sm-8">
                      <label>{thuoc.huongDanSuDung}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Mô Tả:
                    </label>
                    <div className="col-sm-8">
                      <label>{thuoc.moTa}</label>
                    </div>
                  </div>
                  {/* <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Loại Thuốc
                    </label>
                    <div className="col-sm-8">
                      <label>{moTa}</label>
                    </div>
                  </div> */}
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

export default ModalXemThuoc;
