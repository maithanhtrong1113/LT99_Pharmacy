import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm, Controller } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

function ModalAddLoaiThuoc(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const luuHandler = (e) => {
    toggle();
  };
  const onSubmit = (data) => {
    props.submitHandler(data);
    toggle();
  };

  return (
    <Fragment>
      <Button onClick={toggle} className="btn bg-primary my-3 text-white">
        Thêm Loại Thuốc
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>
          <span className="fw-bold"> Thêm Loại Thuốc</span>
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
                  <div className="row d-flex justify-content-center ">
                    <button
                      className="btn btn-info my-3  text-white fw-bold w-100"
                      type="submit"
                    >
                      Thêm Loại Thuốc
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

export default ModalAddLoaiThuoc;
