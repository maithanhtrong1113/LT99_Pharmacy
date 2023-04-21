import { authActions } from "@/store/auth";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
const RouteGuardAdmin = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  if (!isAuth || role !== 1) {
    dispatch(authActions.logout());
    router.push("/signin");
    setTimeout(() => {
      toast.warn("Cần đăng nhập dưới quyền admin!", {
        toastId: "err1",
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
        theme: "light",
      });
    }, 100);
    return;
  } else {
    return <Fragment>{props.children}</Fragment>;
  }
};

export default RouteGuardAdmin;
