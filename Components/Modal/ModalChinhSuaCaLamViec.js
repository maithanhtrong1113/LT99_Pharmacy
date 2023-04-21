import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

function ModalChinhSuaCaLamViec(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [tenCa, setTenCa] = useState(props.caLamViec.tenCa);
  const [soGioLam, setSoGioLam] = useState(props.caLamViec.soGioLam);

  const onSubmit = (data) => {
    data.maCaLam = props.caLamViec.maCaLam;
    data.tenCa = tenCa;
    data.soGioLam = soGioLam;
    props.chinhSuaCaLamViecHandler(data);
    toggle();
  };
  function handleInputChange(event) {
    setTenCa(event.target.value);
  }

  function handleInputChange1(event) {
    const value = event.target.value;
    setSoGioLam(value);
  }
  const validateSoGioLam = (value) => {
    if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
      return "Số giờ làm phải là số nguyên lớn hơn 0";
    }
    return true;
  };
  return (
    <Fragment>
      <Button onClick={toggle} className="btn btn-warning btn-sm me-2">
        Chỉnh sửa
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>
          <span className="fw-bold"> Chỉnh Sửa Ca Làm Việc</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Tên Ca Làm Việc:
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("tenCa", {
                          required: true,
                        })}
                        type="text"
                        required
                        value={tenCa}
                        onChange={handleInputChange}
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.tenCa?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập tên ca làm việc
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Số Giờ Làm Việc
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("soGioLam", {
                          required: true,
                          validate: validateSoGioLam,
                        })}
                        type="number"
                        required
                        value={soGioLam}
                        onChange={handleInputChange1}
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.soGioLam?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập số giờ làm
                        </span>
                      )}
                      {errors.soGioLam && (
                        <span className="text-danger">
                          {errors.soGioLam.message}
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
                      className="btn btn-info my-3 btn-sm text-white fw-bold w-50"
                      type="submit"
                    >
                      Chỉnh Sửa Ca Làm Việc
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

export default ModalChinhSuaCaLamViec;
