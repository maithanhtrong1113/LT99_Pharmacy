import ContentLoaiThuoc from "@/Components/Admin/ContentLoaiThuoc";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentLoaiThuoc />
    </Fragment>
  );
};

export default index;
