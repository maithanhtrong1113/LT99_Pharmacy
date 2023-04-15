import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

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
  const [tenLoai, setTenLoai] = useState("");
  const [moTa, setMota] = useState("");
  useEffect(() => {
    // lấy thông tin loại thuốc
    fetch(
      `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc/${props.thuoc.maThuoc}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTenLoai(data.tenLoai);
        setMota(data.moTaChung);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Fragment>
      <Button onClick={toggle} className="btn btn-info btn-sm me-2">
        Xem Chi Tiết
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
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
                      Tên Thuốc:
                    </label>
                    <div className="col-sm-8">
                      <label>{tenLoai}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Liều Lượng:
                    </label>
                    <div className="col-sm-8">
                      <label>{moTa}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Công dụng
                    </label>
                    <div className="col-sm-8">
                      <label>{moTa}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Đơn vị tính
                    </label>
                    <div className="col-sm-8">
                      <label>{moTa}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Quy cách đóng gói
                    </label>
                    <div className="col-sm-8">
                      <label>{moTa}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Tác dụng phụ
                    </label>
                    <div className="col-sm-8">
                      <label>{moTa}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Hướng dẫn sử dụng
                    </label>
                    <div className="col-sm-8">
                      <label>{moTa}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Số Lượng
                    </label>
                    <div className="col-sm-8">
                      <label>{moTa}</label>
                    </div>
                  </div>
                  <div className="form-group row my-2 d-flex align-items-center">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Mô Tả
                    </label>
                    <div className="col-sm-8">
                      <label>{moTa}</label>
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
