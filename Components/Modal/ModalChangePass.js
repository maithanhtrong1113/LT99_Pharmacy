import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
function ModalChangePass(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const onSubmit = (data) => {
    console.log(data);
    toggle();
  };

  return (
    <Fragment>
      <Button
        onClick={toggle}
        color={"white"}
        className="btn btn-white text-warning fw-bold w-100 text-start"
      >
        Đổi mật khẩu
      </Button>
      <Modal isOpen={modal} toggle={toggle} {...props}>
        <ModalHeader toggle={toggle}>
          <span className="fw-bold"> Đổi mật khẩu</span>
        </ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="row">
              <div className="col-xl-12 col-lg-12">
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className="form-group row my-2">
                    <label className="col-sm-5 col-form-label fw-bold">
                      Mật khẩu mới:
                    </label>
                    <div className="col-sm-7">
                      <input
                        {...register("password", {
                          required: true,
                          minLength: 8,
                        })}
                        type="password"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7">
                      {errors?.password?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập mật khẩu mới
                        </span>
                      )}
                      {errors?.password?.type === "minLength" && (
                        <span className=" text-danger">
                          Tên không vượt qua 8 ký tự
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="form-group row my-2">
                    <label className="col-sm-5 col-form-label fw-bold">
                      Xác nhận mật khẩu:
                    </label>
                    <div className="col-sm-7">
                      <input
                        {...register("password_repeat", {
                          required: true,
                          validate: (value) =>
                            value === watch("password", "") ||
                            "Mật khẩu không trùng",
                        })}
                        type="password"
                        required
                        className="form-control form-control-sm inputText"
                      />
                    </div>
                    <div className="col-sm-5"></div>
                    <div className="col-sm-7">
                      {errors?.password_repeat?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng xác nhận mật khẩu
                        </span>
                      )}
                      {errors.password_repeat && (
                        <span className="text-danger">
                          {errors.password_repeat.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="row d-flex justify-content-between ">
                    <button
                      className="btn btn-danger my-3  text-white fw-bold w-25 "
                      type="button"
                      onClick={toggle}
                    >
                      Hủy
                    </button>
                    <button
                      className="btn btn-info my-3  text-white fw-bold w-25"
                      type="submit"
                    >
                      Đổi mật khẩu
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

export default ModalChangePass;