import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { BsPerson } from "react-icons/bs";
import {
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineKey,
  AiOutlinePhone,
} from "react-icons/ai";
const Content = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    props.onAdd(data);
  };

  return (
    <div className="my-10">
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center border rounded shadow">
          <div className="col-lg-12 col-xl-12 mt-3">
            <h3 className="text-center text-dark fw-bold">Đăng ký tài khoản</h3>
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
                    <div className="col-md-12 inputBox d-flex align-items-center ">
                      <BsPerson className="font-register me-2 text-info" />
                      <input
                        {...register("name", {
                          required: true,
                          maxLength: 20,
                        })}
                        type="text"
                        required
                        className="form-control inputText"
                      />
                      <span className="text-muted formSpan">Tên:</span>
                    </div>
                    {errors?.name?.type === "required" && (
                      <span className="ms-5 text-danger">
                        Vui lòng nhập tên
                      </span>
                    )}
                    {errors?.name?.type === "maxLength" && (
                      <span className="ms-5 text-danger">
                        Tên không vượt qua 20 ký tự
                      </span>
                    )}
                  </div>

                  <div className="row mb-3">
                    <div className=" col-md-12  inputBox">
                      <AiOutlineMail className="font-register me-2 text-info" />
                      <input
                        {...register("email", {
                          required: true,
                          pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                        })}
                        type="text"
                        className="form-control inputText"
                        required
                      />
                      <span className="text-muted formSpan">Email:</span>
                    </div>
                    {errors?.email?.type === "required" && (
                      <span className="ms-5 text-danger">
                        Vui lòng nhập email
                      </span>
                    )}
                    {errors?.email?.type === "pattern" && (
                      <span className="ms-5 text-danger">
                        Định dạng email sai
                      </span>
                    )}
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-12 inputBox">
                      <AiOutlinePhone className="font-register me-2 text-info" />
                      <input
                        {...register("phone", {
                          required: true,
                          pattern:
                            /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/i,
                        })}
                        type="tel"
                        required
                        className="form-control inputText"
                      />
                      <span className="text-muted formSpan ">
                        Số điện thoại:
                      </span>
                    </div>
                    {errors?.phone?.type === "required" && (
                      <span className="ms-5 text-danger">
                        Vui lòng nhập số điện thoại
                      </span>
                    )}
                    {errors?.phone?.type === "pattern" && (
                      <span className="ms-5 text-danger">
                        Số điện thoại không tồn tại
                      </span>
                    )}
                  </div>
                  <div className="row  mb-3">
                    <div className=" col-md-12  inputBox">
                      <AiOutlineLock className="font-register me-2 text-info" />
                      <input
                        {...register("password", {
                          required: true,
                          minLength: 8,
                        })}
                        type="password"
                        required
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
                  <div className="row mb-3">
                    <div className=" col-md-12   inputBox">
                      <AiOutlineKey className="font-register me-2 text-info" />
                      <input
                        {...register("password_repeat", {
                          required: true,
                          validate: (value) =>
                            value === watch("password", "") ||
                            "Mật khẩu không trùng",
                        })}
                        type="password"
                        required
                        className="form-control inputText"
                      />
                      <span className="text-muted formSpan">
                        Xác nhận mật khẩu:
                      </span>
                    </div>
                    {errors?.password_repeat?.type === "required" && (
                      <span className="ms-5 text-danger">
                        Vui lòng nhập mật khẩu
                      </span>
                    )}
                    {errors.password_repeat && (
                      <span className="ms-5 text-danger">
                        {errors.password_repeat.message}
                      </span>
                    )}
                  </div>
                  <div className="row mb-2">
                    <Link
                      className="text-center fw-bold  text-info"
                      href="/signin"
                    >
                      Đăng nhập với tài khoản có sẵn
                    </Link>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <button
                      className="btn btn-info mb-1  text-white fw-bold w-50"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="my-10">
    //   {/* style="background-color: #eee;" */}
    //   <div className="container h-100">
    //     <div className="row d-flex justify-content-center align-items-center h-100">
    //       <div className="col-lg-12 col-xl-11">
    //         <div className="card text-black border  rounded">
    //           {/* style="border-radius: 25px;" */}
    //           <div className="card-body p-md-5">
    //             <div className="row justify-content-center">
    //               <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
    //                 <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
    //                   Sign up
    //                 </p>

    //                 <form className="mx-1 mx-md-4">
    //                   <div className="d-flex flex-row align-items-center mb-4">
    //                     <i className="fas fa-user fa-lg me-3 fa-fw"></i>
    //                     <div className="form-outline flex-fill mb-0">
    //                       <input
    //                         type="text"
    //                         id="form3Example1c"
    //                         className="form-control"
    //                       />
    //                       <label className="form-label" for="form3Example1c">
    //                         Your Name
    //                       </label>
    //                     </div>
    //                   </div>

    //                   <div className="d-flex flex-row align-items-center mb-4">
    //                     <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
    //                     <div className="form-outline flex-fill mb-0">
    //                       <input
    //                         type="email"
    //                         id="form3Example3c"
    //                         className="form-control"
    //                       />
    //                       <label className="form-label" for="form3Example3c">
    //                         Your Email
    //                       </label>
    //                     </div>
    //                   </div>

    //                   <div className="d-flex flex-row align-items-center mb-4">
    //                     <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
    //                     <div className="form-outline flex-fill mb-0">
    //                       <input
    //                         type="password"
    //                         id="form3Example4c"
    //                         className="form-control"
    //                       />
    //                       <label className="form-label" for="form3Example4c">
    //                         Password
    //                       </label>
    //                     </div>
    //                   </div>

    //                   <div className="d-flex flex-row align-items-center mb-4">
    //                     <i className="fas fa-key fa-lg me-3 fa-fw"></i>
    //                     <div className="form-outline flex-fill mb-0">
    //                       <input
    //                         type="password"
    //                         id="form3Example4cd"
    //                         className="form-control"
    //                       />
    //                       <label className="form-label" for="form3Example4cd">
    //                         Repeat your password
    //                       </label>
    //                     </div>
    //                   </div>

    //                   <div className="form-check d-flex justify-content-center mb-5">
    //                     <input
    //                       className="form-check-input me-2"
    //                       type="checkbox"
    //                       value=""
    //                       id="form2Example3c"
    //                     />
    //                     <label className="form-check-label" for="form2Example3">
    //                       I agree all statements in{" "}
    //                       <a href="#!">Terms of service</a>
    //                     </label>
    //                   </div>

    //                   <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
    //                     <button type="button" className="btn btn-primary btn-lg">
    //                       Register
    //                     </button>
    //                   </div>
    //                 </form>
    //               </div>
    //               <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
    //                 <img
    //                   src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
    //                   className="img-fluid"
    //                   alt="Sample image"
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Content;
