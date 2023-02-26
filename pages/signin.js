import React, { Fragment, useContext, useState } from "react";
import Navigation from "../Components/Index/Navigation";
import Content from "../Components/SignIn/Content";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import authApi from "../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/Components/Index/Footer";
const signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const loginHandler = async (data) => {
    authApi
      .login(data.email, data.password)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("id", response.data.id);

        dispatch(authActions.login());
        // setTimeout(() => {
        //   dispatch(authActions.logout());
        // }, 5000);
        toast.success("Đăng nhập thành công!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 500,
          theme: "light",
        });
        setTimeout(() => {
          router.push("/");
        }, 700);
      })
      .catch((err) => {
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1500,
          theme: "light",
        });
      });
  };

  return (
    <Fragment>
      <ToastContainer />
      <Navigation />
      <Content Login={loginHandler} />
      <Footer />
    </Fragment>
  );
};

export default signin;
