import Link from "next/link";
import React, { Fragment, useEffect, useState } from "react";
import authApi from "../../api/authApi";
import { BsPerson, BsInfoCircle, BsLock } from "react-icons/bs";
import { FiLock } from "react-icons/fi";

import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authActions } from "@/store/auth";
import { useForm } from "react-hook-form";

function Content() {
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
  } = useForm();
  const onSubmit = (data) => {
    // props.Login(data);
  };
  return (
    // <Fragment>
    //   <section className=" my-10" style={{ backgroundColor: "#f4f5f7" }}>
    //     <div className="container py-5 ">
    //       <div className="row d-flex justify-content-center align-items-center">
    //         <div className="col col-lg-6 mb-4 mb-lg-0">
    //           <div className="card mb-3" style={{ bordeRadius: "0.5rem" }}>
    //             <div className="row g-0">
    //               <div className="col-md-4 gradient-custom text-center text-white me">
    //                 <img
    //                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
    //                   alt="Avatar"
    //                   className="img-fluid my-5"
    //                   style={{ width: "80px" }}
    //                 />
    //                 <h5>{name}</h5>
    //                 <p>Web Designer</p>
    //                 <i className="far fa-edit mb-5"></i>
    //               </div>
    //               <div className="col-md-8">
    //                 <div className="card-body p-4">
    //                   <h6>Information</h6>
    //                   <hr className="mt-0 mb-4" />
    //                   <div className="row pt-1">
    //                     <div>
    //                       <h6>Email:</h6>
    //                       <p className="text-info">{email}</p>
    //                     </div>
    //                   </div>
    //                   <div className="row pt-1">
    //                     <div className=" mb-3">
    //                       <h6>Phone:</h6>
    //                       <p className="text-info">{phone}</p>
    //                     </div>
    //                   </div>

    //                   <h6>Projects</h6>
    //                   <hr className="mt-0 mb-4" />
    //                   <div className="row pt-1">
    //                     <div className="col-6 ">
    //                       <h6>Recent</h6>
    //                       <p className="text-muted">Lorem ipsum</p>
    //                     </div>
    //                     <div className="col-6 ">
    //                       <h6>Most Viewed</h6>
    //                       <p className="text-muted">Dolor sit amet</p>
    //                     </div>
    //                   </div>
    //                   <div className="d-flex justify-content-start">
    //                     <a href="#!">
    //                       <i className="fab fa-facebook-f fa-lg me-3"></i>
    //                     </a>
    //                     <a href="#!">
    //                       <i className="fab fa-twitter fa-lg me-3"></i>
    //                     </a>
    //                     <a href="#!">
    //                       <i className="fab fa-instagram fa-lg"></i>
    //                     </a>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </Fragment>
    <Fragment>
      <div className="container my-10">
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
                className="row py-3 my-2 link-me active "
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
                className="row py-3 my-2 link-me"
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
                className="row py-3 my-2 link-me"
                onClick={() => {
                  router.push("/doiMatKhau");
                }}
              >
                <div className="col-1">
                  <FiLock />
                </div>
                <div className="col-11">
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
            <h3 className="text-info text-center py-3">
              Chỉnh sửa thông tin cá nhân
            </h3>
            <hr />
            <div className="container">
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="row mb-4 d-flex align-items-center">
                  <div className="col-lg-3 col-xl-3">
                    <label className="fw-bold">Họ và Tên</label>
                  </div>
                  <div className="col-lg-9  col-xl-9">
                    <div className="form-outline">
                      <input
                        {...register("name", {
                          required: true,
                        })}
                        type="name"
                        className="form-control"
                        placeholder={name}
                      />
                      {errors?.name?.type === "required" && (
                        <span className="text-danger">Vui lòng nhập tên</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mb-4 d-flex align-items-center">
                  <div className="col-lg-3 col-xl-3  ">
                    <label className="fw-bold">Email</label>
                  </div>
                  <div className="col-lg-9  col-xl-9">
                    <div className="form-outline">
                      <input
                        {...register("email", {
                          required: true,
                          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        })}
                        type="email"
                        className="form-control"
                        placeholder={email}
                      />
                      {errors?.email?.type === "required" && (
                        <span className="text-danger">Vui lòng nhập email</span>
                      )}
                      {errors?.email?.type === "pattern" && (
                        <span className="text-danger">Định dạng email sai</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mb-4 d-flex align-items-center">
                  <div className="col-lg-3 col-xl-3  ">
                    <label className="fw-bold">Số điện thoại</label>
                  </div>
                  <div className="col-lg-9  col-xl-9">
                    <div className="form-outline">
                      <input
                        {...register("phone", {
                          required: true,
                          pattern:
                            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/i,
                        })}
                        type="text"
                        className="form-control"
                        placeholder={phone}
                      />
                      {errors?.phone?.type === "required" && (
                        <span className="text-danger">
                          Vui lòng nhập số điện thoại
                        </span>
                      )}
                      {errors?.phone?.type === "pattern" && (
                        <span className="text-danger">
                          Số điện thoại không tồn tại
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mb-4 d-flex align-items-center">
                  <div className="col-lg-3 col-xl-3  ">
                    <label className="fw-bold">Giới tính</label>
                  </div>
                  <div className="col-lg-9  col-xl-9">
                    <div className="form-outline">
                      <select
                        {...register("gender")}
                        className="w-25 text-center"
                      >
                        <option value="nam">Nam</option>
                        <option value="nữ">Nữ</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mb-4 d-flex align-items-center">
                  <div className="col-lg-3 col-xl-3  "></div>
                  <div className="col-lg-6  col-xl-6">
                    <button className="btn btn-md btn-info text-white">
                      Cập nhập
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
}

export default Content;
