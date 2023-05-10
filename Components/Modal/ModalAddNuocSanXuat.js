import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
function ModalAddNuocSanXuat(props) {
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

  return (
    <Fragment>
      <Button onClick={toggle} className="btn bg-primary btn-sm text-white">
        Thêm nơi sản xuất
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>
          <span className="fw-bold"> Thêm nơi sản xuất</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group row my-2">
                    <label className="col-sm-5 col-form-label fw-bold">
                      Tên nơi sản xuất:
                    </label>
                    <div className="col-sm-7">
                      <input
                        {...register("tenNuoc", {
                          required: true,
                        })}
                        type="text"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7">
                      {errors?.tenNuoc?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập tên nơi sản xuất
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row d-flex justify-content-between ">
                    <div className="col-4">
                      {" "}
                      <button
                        className="btn btn-danger my-3 btn-sm text-white fw-bold w-100"
                        type="button"
                        onClick={toggle}
                      >
                        Hủy
                      </button>
                    </div>

                    <div className="col-5">
                      <button
                        className="btn btn-info my-3 btn-sm text-white fw-bold w-100"
                        type="submit"
                      >
                        Thêm nơi sản xuất
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

export default ModalAddNuocSanXuat;
