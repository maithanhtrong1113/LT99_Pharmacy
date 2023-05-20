import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";
import { BsCheck2 } from "react-icons/bs";
import { MdOutlineClose } from "react-icons/md";
import VND from "../utils/formatVND";

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
  const [thuoc, setThuoc] = useState({});
  useEffect(() => {
    fetch(
      `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc/${props.thuoc.maThuoc}`
    )
      .then((response) => response.json())
      .then((results) => {
        setThuoc(results);
      });
  }, []);
  return (
    <Fragment>
      <Button onClick={toggle} className="btn btn-info btn-sm me-2">
        Xem Chi Tiết
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        {...props}
        className="w-modalAddNhanVien2"
      >
        <ModalHeader toggle={toggle}>
          <span className="fw-bold text-info"> Thông Tin Thuốc</span>
        </ModalHeader>
        <ModalBody>
          <div className="container ">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                {Object.keys(thuoc).length !== 0 && (
                  <form noValidate>
                    <div className="form-group row my-2 d-flex align-items-center">
                      <label className="col-sm-4 col-form-label fw-bold">
                        Mã Thuốc:
                      </label>
                      <div className="col-sm-4">
                        <label className="text-info">
                          {thuoc.thuoc.maThuoc}
                        </label>
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
                      <div className="col-sm-4">
                        <label className="fw-bold text-info">
                          {thuoc.thuoc.tenThuoc}
                        </label>
                      </div>
                      <label className="col-sm-2 col-form-label fw-bold">
                        Giá Bán Sỉ:
                      </label>
                      <div className="col-sm-2">
                        <label className="fw-bold text-info">
                          {VND.format(thuoc.giaBanSi)}
                        </label>
                      </div>
                    </div>
                    <div className="form-group row my-2 d-flex align-items-center">
                      <label className="col-sm-4 col-form-label fw-bold">
                        Loại Thuốc:
                      </label>
                      <div className="col-sm-4">
                        <label>{thuoc.thuoc.loaiThuoc.tenLoai}</label>
                      </div>
                      <label className="col-sm-2 col-form-label fw-bold">
                        Giá Bán Lẻ:
                      </label>
                      <div className="col-sm-2">
                        <label className="fw-bold text-info">
                          {VND.format(thuoc.giaBanLe)}
                        </label>
                      </div>
                    </div>
                    <div className="form-group row my-2 d-flex align-items-center">
                      <label className="col-sm-4 col-form-label fw-bold">
                        Liều Lượng:
                      </label>
                      <div className="col-sm-8">
                        <label>{thuoc.thuoc.lieuLuong}</label>
                      </div>
                    </div>
                    <div className="form-group row my-2 d-flex align-items-center">
                      <label className="col-sm-4 col-form-label fw-bold">
                        Công Dụng:
                      </label>
                      <div className="col-sm-8">
                        <label>{thuoc.thuoc.congDung}</label>
                      </div>
                    </div>
                    <div className="form-group row my-2 d-flex align-items-center">
                      <label className="col-sm-4 col-form-label fw-bold">
                        Đơn Vị Tính:
                      </label>
                      <div className="col-sm-8">
                        <label>{thuoc.thuoc.donViTinh}</label>
                      </div>
                    </div>
                    <div className="form-group row my-2 d-flex align-items-center">
                      <label className="col-sm-4 col-form-label fw-bold">
                        Quy Cách Đóng Gói:
                      </label>
                      <div className="col-sm-8">
                        <label>{thuoc.thuoc.quyCachDongGoi}</label>
                      </div>
                    </div>
                    <div className="form-group row my-2 d-flex align-items-center">
                      <label className="col-sm-4 col-form-label fw-bold">
                        Tác Dụng Phụ:
                      </label>
                      <div className="col-sm-8">
                        <label>{thuoc.thuoc.tacDungPhu}</label>
                      </div>
                    </div>
                    <div className="form-group row my-2 d-flex align-items-center">
                      <label className="col-sm-4 col-form-label fw-bold">
                        Hướng Dẫn Sử Dụng:
                      </label>
                      <div className="col-sm-8">
                        <label>{thuoc.thuoc.huongDanSuDung}</label>
                      </div>
                    </div>
                    <div className="form-group row my-2 d-flex align-items-center">
                      <label className="col-sm-4 col-form-label fw-bold">
                        Mô Tả:
                      </label>
                      <div className="col-sm-8">
                        <label>{thuoc.thuoc.moTa}</label>
                      </div>
                    </div>

                    <div className="row d-flex justify-content-center "></div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default ModalXemThuoc;
