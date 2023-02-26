import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BsPerson, BsInfoCircle, BsLock } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import authApi from "../../api/authApi";
import { FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { authActions } from "@/store/auth";
const ContentDoiMatKhau = () => {
  const router = useRouter();
  let user = {};
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    authApi.fetchUser().then((res) => {
      user = res.data.user;
      setName(user.name);
      setPhone(user.phone);
      setEmail(user.email);
    });
  }, []);

  const logOutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    router.push("/");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = (data) => {
    // props.Login(data);
  };
  return (
    <Fragment>
      <div className="container my-10   ">
        <div className="row">
          <div className="col-4  rounded shadow py-3">
            <div className="container">
              <div className="row">
                <div className="col-4">
                  <img
                    src="/images/user-profile.jpg"
                    className="img-fluid size-img-profile"
                  />
                </div>
                <div className="col-8">
                  <h4>{name}</h4>
                  <span>{email}</span>
                </div>
              </div>
              <hr />
              <div
                className="row py-3 my-2 link-me  "
                onClick={() => {
                  router.push("/me");
                }}
              >
                <div className="col-1">
                  <BsPerson />
                </div>
                <div className="col-11 ">
                  <Link href="/me" className="text-decoration-none  text-dark ">
                    Thông tin cá nhân
                  </Link>
                </div>
              </div>
              <div
                className="row py-3 my-2 link-me  "
                onClick={() => {
                  router.push("/donHang");
                }}
              >
                <div className="col-1">
                  <BsInfoCircle />
                </div>
                <div className="col-11  ">
                  <Link
                    href="/donHang"
                    className="text-decoration-none  text-dark"
                  >
                    Lịch sử đơn hàng
                  </Link>
                </div>
              </div>
              <div
                className="row py-3 my-2 link-me active"
                onClick={() => {
                  router.push("/doiMatKhau");
                }}
              >
                <div className="col-1">
                  <FiLock />
                </div>
                <div className="col-11  ">
                  <Link
                    href="/doiMatKhau"
                    className="text-decoration-none  text-dark"
                  >
                    Đổi mật khẩu
                  </Link>
                </div>
              </div>
              <div className="row py-3 my-2 link-me" onClick={logOutHandler}>
                <div className="col-1">
                  <AiOutlineLogout />
                </div>
                <div className="col-11  ">
                  <Link href="/" className="text-decoration-none  text-dark">
                    Đăng xuất
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-7 rounded shadow py-3 ms-4 ">
            <h3 className="text-info text-center py-3"> Đổi mật khẩu</h3>
            <hr />
            <div className="container">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="row mb-4 d-flex align-items-center">
                  <div className="col-lg-4 col-xl-4">
                    <label className="fw-bold">Mật khẩu mới</label>
                  </div>
                  <div className="col-lg-8  col-xl-8">
                    <div className="form-outline">
                      <input
                        {...register("password", {
                          required: true,
                        })}
                        type="password"
                        className="form-control"
                      />
                      {errors?.password?.type === "required" && (
                        <span className=" text-danger">
                          Vui lòng nhập mật khẩu mới
                        </span>
                      )}
                      {errors?.password?.type === "minLength" && (
                        <span className=" text-danger">
                          Mật khẩu tối thiểu phải có 8 ký tự
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row mb-4 d-flex align-items-center">
                  <div className="col-lg-4 col-xl-4  ">
                    <label className="fw-bold">Xác nhận mật khẩu</label>
                  </div>
                  <div className="col-lg-8  col-xl-8">
                    <div className="form-outline">
                      <input
                        {...register("password_repeat", {
                          required: true,
                          validate: (value) =>
                            value === watch("password", "") ||
                            "Mật khẩu không trùng",
                        })}
                        type="password"
                        className="form-control"
                      />

                      {errors?.password_repeat?.type === "required" && (
                        <span className=" text-danger">
                          Vui lòng nhập mật khẩu
                        </span>
                      )}
                      {errors.password_repeat && (
                        <span className=" text-danger">
                          {errors.password_repeat.message}
                        </span>
                      )}
                      {errors?.phone?.type === "pattern" && (
                        <span className="text-danger"></span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="row mb-4 d-flex align-items-center">
                  <div className="col-lg-4 col-xl-4 "></div>
                  <div className="col-lg-6  col-xl-6">
                    <button className="btn btn-md btn-info text-white">
                      Đổi mật khẩu
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentDoiMatKhau;
