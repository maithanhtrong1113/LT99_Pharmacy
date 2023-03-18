import ContentThuoc from "@/Components/Admin/ContentThuoc";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentThuoc />
    </Fragment>
  );
};

export default index;
