import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import GoTopPage from "@/Components/Index/GoTopPage";
import ContentHoaDon from "@/Components/Admin/ContentHoaDon";
import NotShowMess from "@/Components/utils/showMess";
const hoaDon = (props) => {
  NotShowMess();
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentHoaDon />
    </Fragment>
  );
};

export default hoaDon;
