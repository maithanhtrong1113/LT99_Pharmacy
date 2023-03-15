import ContentXuatNhapThuoc from "@/Components/Admin/ContentXuatNhapThuoc";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentXuatNhapThuoc />
    </Fragment>
  );
};

export default index;
