import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

function ModalChinhSuaLoaiThuoc(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [tenLoai, setTenLoai] = useState("");
  const [moTaChung, setMoTaChung] = useState("");

  const onSubmit = (data) => {
    data.maLoai = props.loaiThuoc.maLoai;
    console.log(data);
    props.chinhSuaLoaiThuoc(data);
    toggle();
  };
  function handleInputChange(event) {
    setTenLoai(event.target.value);
  }
  function handleInputChange1(event) {
    setMoTaChung(event.target.value);
  }

  // lấy thông tin loại thuốc
  useEffect(() => {
    fetch(
      `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/loai-thuoc/${props.loaiThuoc.maLoai}`
    )
      .then((response) => response.json())
      .then((data) => {
        setTenLoai(data.tenLoai);
        setMoTaChung(data.moTaChung);
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <Fragment>
      <Button onClick={toggle} className="btn btn-warning btn-sm me-2">
        Chỉnh sửa
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>
          <span className="fw-bold"> Chỉnh Sửa Loại Thuốc</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Tên Loại Thuốc:
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("tenLoai", {
                          required: true,
                        })}
                        type="text"
                        required
                        value={tenLoai}
                        onChange={handleInputChange}
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.tenLoai?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập tên loại thuốc
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Mô tả chung
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("moTaChung", {
                          required: true,
                        })}
                        type="text"
                        required
                        value={moTaChung}
                        onChange={handleInputChange1}
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.moTaChung?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập mô tả chung
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="row d-flex justify-content-between ">
                    <button
                      className="btn btn-danger my-3 btn-sm text-white fw-bold w-25"
                      type="button"
                      onClick={toggle}
                    >
                      Hủy
                    </button>
                    <button
                      className="btn btn-info my-3  btn-sm text-white fw-bold w-50"
                      type="submit"
                    >
                      Chỉnh Sửa Loại Thuốc
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

export default ModalChinhSuaLoaiThuoc;
