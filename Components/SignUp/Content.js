import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsPerson } from "react-icons/bs";
import { AiOutlineLock } from "react-icons/ai";
import { Login } from "@/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "@/store/auth";
import { useRouter } from "next/router";
const Content = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const router = useRouter();

  const onSubmit = async (data) => {
    const res = await Login(data);
    if (Object.keys(res).length !== 0) {
      localStorage.setItem("id", res.user_profile_details.account_id);
      localStorage.setItem("token", res.user_profile_details.token);
      dispatch(authActions.login(res.user_profile_details.maQuyen));

      router.push("/admin/banThuoc");
    }

    return;
  };

  return (
    <div className="my-10">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center border rounded shadow">
          <div className="col-lg-12 col-xl-12 mt-3">
            <h3 className="text-center text-dark fw-bold">Đăng Nhập</h3>
          </div>
          <div className="col-lg-6 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6 col-xl-6">
            <div className="">
              <div className="card-body p-md-5">
                <form
                  className="px-md-2"
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                >
                  <div className="row mb-3">
                    <div className="col-md-12 inputBox">
                      <BsPerson className="font-register me-2 text-info" />
                      <input
                        {...register("username", {
                          required: true,
                        })}
                        type="text"
                        className="form-control inputText"
                      />
                      <span className="text-muted formSpan">
                        Tên đăng nhập:
                      </span>
                    </div>
                    {errors?.username?.type === "required" && (
                      <span className="ms-5 text-danger">
                        Vui lòng nhập tên đăng nhập
                      </span>
                    )}
                  </div>

                  <div className="row  mb-3">
                    <div className="col-md-12  inputBox">
                      <AiOutlineLock className="font-register me-2 text-info" />
                      <input
                        {...register("password", {
                          required: true,
                          minLength: 8,
                        })}
                        type="password"
                        className="form-control inputText"
                      />
                      <span className="text-muted formSpan">Mật khẩu:</span>
                    </div>
                    {errors?.password?.type === "required" && (
                      <span className="ms-5 text-danger">
                        Vui lòng nhập mật khẩu
                      </span>
                    )}
                    {errors?.password?.type === "minLength" && (
                      <span className="ms-5 text-danger">
                        Mật khẩu tối thiểu phải có 8 ký tự
                      </span>
                    )}
                  </div>

                  <div className="row d-flex justify-content-center">
                    <button
                      className="btn btn-info mb-1  text-white fw-bold w-50"
                      type="submit"
                    >
                      Đăng Nhập
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
