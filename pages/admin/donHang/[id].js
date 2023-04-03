import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import GoTopPage from "@/Components/Index/GoTopPage";
import NotShowMess from "@/Components/utils/showMess";
import ContentChiTietDonHang from "@/Components/Admin/ContentChiTietDonHang";
const donHang = (props) => {
  NotShowMess();
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentChiTietDonHang />
    </Fragment>
  );
};

export default donHang;
