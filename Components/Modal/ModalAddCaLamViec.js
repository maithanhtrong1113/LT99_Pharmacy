import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
function ModalAddCaLamViec(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onSubmit = (data) => {
    props.submitHandler(data);
    toggle();
  };
  const validateSoGioLam = (value) => {
    if (!Number.isInteger(Number(value)) || Number(value) <= 0) {
      return "Số giờ làm phải là số nguyên lớn hơn 0";
    }
    return true;
  };
  return (
    <Fragment>
      <Button onClick={toggle} className="btn bg-primary btn-sm text-white">
        Thêm Ca Làm Việc
      </Button>
      <Modal
        isOpen={modal}
        toggle={toggle}
        {...props}
        className="w-modalAddNhanVien"
      >
        <ModalHeader toggle={toggle}>
          <span className="fw-bold"> Thêm Ca Làm Việc</span>
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
                        placeholder="Nhập tên ca làm việc"
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
                      Số Giờ Làm
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("soGioLam", {
                          required: true,
                          validate: validateSoGioLam,
                        })}
                        type="number"
                        required
                        placeholder="Nhập số giờ làm"
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
                  <div className="row d-flex justify-content-center justify-content-between ">
                    <div className="col-4">
                      <button
                        className="btn btn-danger btn-sm text-white fw-bold w-100"
                        type="button"
                        onClick={toggle}
                      >
                        Hủy
                      </button>
                    </div>
                    <div className="col-4">
                      <button
                        className="btn btn-info btn-sm text-white fw-bold w-100"
                        type="submit"
                      >
                        Thêm Ca Làm Việc
                      </button>
                    </div>
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

export default ModalAddCaLamViec;
