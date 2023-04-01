import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import GoTopPage from "@/Components/Index/GoTopPage";
import ContentKhachHang from "@/Components/Admin/ContentKhachHang";
const khachHang = (props) => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentKhachHang />
    </Fragment>
  );
};

export default khachHang;
