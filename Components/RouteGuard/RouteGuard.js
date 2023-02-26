import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
const RouteGuard = (props) => {
  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  if (!isAuth) {
    toast.warn("Vui lòng đăng nhập!", {
      toastId: "err1",
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
    router.push("/signin");
  } else {
    return <Fragment>{props.children}</Fragment>;
  }
};

export default RouteGuard;
