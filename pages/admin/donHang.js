import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import GoTopPage from "@/Components/Index/GoTopPage";
import NotShowMess from "@/Components/utils/showMess";
import ContentDonHang from "@/Components/Admin/ContentDonHang";
const donHang = (props) => {
  NotShowMess();
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentDonHang />
    </Fragment>
  );
};

export default donHang;
