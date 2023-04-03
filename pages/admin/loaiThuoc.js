import ContentLoaiThuoc from "@/Components/Admin/ContentLoaiThuoc";
import GoTopPage from "@/Components/Index/GoTopPage";
import NotShowMess from "@/Components/utils/showMess";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const loaiThuoc = () => {
  NotShowMess();
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentLoaiThuoc />
    </Fragment>
  );
};

export default loaiThuoc;
