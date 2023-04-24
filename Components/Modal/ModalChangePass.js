import React, { Fragment, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { useForm } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";
import { changePass } from "@/api/nhanVienApi";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store/auth";
import ModalAll from "./ModalAll";
function ModalChangePass(props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const toggle = () => {
    setModal(!modal);
  };
  const role = useSelector((state) => state.auth.role);
  const onSubmit = async (data) => {
    const res = await changePass(data, role);
    if (res) {
      props.toggl();
      setTimeout(() => {
        dispatch(authActions.logout());
      }, [2000]);
    } else {
      return;
    }
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
                      Mật khẩu cũ:
                    </label>
                    <div className="col-sm-7">
                      <input
                        {...register("passwordold", {
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
                      {errors?.passwordold?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập mật khẩu cũ
                        </span>
                      )}
                      {errors?.passwordold?.type === "minLength" && (
                        <span className=" text-danger">
                          Mật khẩu phải bao gồm 8 ký tự
                        </span>
                      )}
                    </div>
                  </div>

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
                          Mật khẩu phải bao gồm 8 ký tự
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
