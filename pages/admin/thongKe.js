import ContentThongKe from "@/Components/Admin/ContentThongKe";
import GoTopPage from "@/Components/Index/GoTopPage";
import NotShowMess from "@/Components/utils/showMess";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const thongKe = () => {
  NotShowMess();
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentThongKe />
    </Fragment>
  );
};

export default thongKe;
