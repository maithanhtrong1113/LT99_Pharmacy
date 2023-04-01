import ContentLoaiThuoc from "@/Components/Admin/ContentLoaiThuoc";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const loaiThuoc = () => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentLoaiThuoc />
    </Fragment>
  );
};

export default loaiThuoc;
