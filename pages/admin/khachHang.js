import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import GoTopPage from "@/Components/Index/GoTopPage";
import ContentKhachHang from "@/Components/Admin/ContentKhachHang";
import NotShowMess from "@/Components/utils/showMess";
const khachHang = (props) => {
  NotShowMess();
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentKhachHang />
    </Fragment>
  );
};

export default khachHang;
