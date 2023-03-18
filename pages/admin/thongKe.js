import ContentThongKe from "@/Components/Admin/ContentThongKe";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentThongKe />
    </Fragment>
  );
};

export default index;
