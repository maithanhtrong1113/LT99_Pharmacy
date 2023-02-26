import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
const Content = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    props.Login(data);
  };

  return (
    <section className="my-10">
      <div className="container h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="images/index/login.img"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="row mb-4 d-flex align-items-center">
                <div className="col-lg-1 col-xl-1 px-2  ">
                  <AiOutlineMail className="font-register me-2 text-info" />
                </div>
                <div className="col-lg-11  col-xl-11">
                  <div className="form-outline">
                    <input
                      {...register("email", {
                        required: true,
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      })}
                      type="email"
                      className="form-control"
                      placeholder="Nhập địa chỉ email"
                    />
                    {errors?.email?.type === "required" && (
                      <span className="text-danger">Không được để trống</span>
                    )}
                    {errors?.email?.type === "pattern" && (
                      <span className="text-danger">Định dạng email sai</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mb-4 d-flex align-items-center">
                <div className="col-lg-1 col-xl-1 px-2">
                  <AiOutlineLock className="font-register me-2 text-info" />
                </div>
                <div className="col-lg-11 col-xl-11 ">
                  <div className="form-outline ">
                    <input
                      {...register("password", {
                        required: true,
                        minLength: 8,
                      })}
                      type="password"
                      className="form-control"
                      placeholder="Nhập password"
                    />
                    {errors?.password?.type === "required" && (
                      <span className="text-danger">Không được để trống</span>
                    )}
                    {errors?.password?.type === "minLength" && (
                      <span className="text-danger">
                        Mật khẩu tối thiểu phải có 8 ký tự
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 col xl-12 my-3 justify-content-center d-flex w-100">
                  <button
                    type="submit"
                    className="btn btn-info btn-lg text-white"
                  >
                    Đăng nhập
                  </button>
                </div>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Bạn chưa có tài khoản?{" "}
                  <Link href="/signup" className="link-info">
                    Đăng ký
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
