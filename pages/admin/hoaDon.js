import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import GoTopPage from "@/Components/Index/GoTopPage";
import ContentHoaDon from "@/Components/Admin/ContentHoaDon";
const khachHang = () => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentHoaDon />
    </Fragment>
  );
};

export default khachHang;
