import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
const RouteGuardSignin = (props) => {
  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  if (isAuth) {
    router.push("/admin/banThuoc");
  } else {
    return <Fragment>{props.children}</Fragment>;
  }
};

export default RouteGuardSignin;
