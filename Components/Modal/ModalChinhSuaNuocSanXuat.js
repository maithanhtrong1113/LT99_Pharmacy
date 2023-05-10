import React, { Fragment, useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";

import "react-datepicker/dist/react-datepicker.css";

function ModalChinhSuaNuocSanXuat(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [tenNuoc, setTenNuoc] = useState(props.nuocSanXuat.tenNuoc);

  const onSubmit = (data) => {
    data.maNuoc = props.nuocSanXuat.maNuoc;
    data.tenNuoc = tenNuoc;
    props.chinhSuaNuocSanXuatHandler(data);
    toggle();
  };
  function handleInputChange(event) {
    setTenNuoc(event.target.value);
  }

  return (
    <Fragment>
      <Button onClick={toggle} className="btn btn-warning btn-sm me-2">
        Chỉnh sửa
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>
          <span className="fw-bold"> Chỉnh Sửa Nơi Sản Xuất</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group row my-2">
                    <label className="col-sm-4 col-form-label fw-bold">
                      Tên Nơi Sản Xuất:
                    </label>
                    <div className="col-sm-8">
                      <input
                        {...register("tenNuoc", {
                          required: true,
                        })}
                        type="text"
                        required
                        value={tenNuoc}
                        onChange={handleInputChange}
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-8">
                      {errors?.tenNuoc?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập tên nơi sản xuất
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row d-flex justify-content-between ">
                    <button
                      className="btn btn-danger btn-sm my-3  text-white fw-bold w-25"
                      type="button"
                      onClick={toggle}
                    >
                      Hủy
                    </button>
                    <button
                      className="btn btn-info my-3 btn-sm  text-white fw-bold w-50"
                      type="submit"
                    >
                      Chỉnh Sửa Nơi Sản Xuất
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

export default ModalChinhSuaNuocSanXuat;
