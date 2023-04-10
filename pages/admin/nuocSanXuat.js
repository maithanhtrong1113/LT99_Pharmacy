import ContentNuocSanXuat from "@/Components/Admin/ContentNuocSanXuat";
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
      <ContentNuocSanXuat />
    </Fragment>
  );
};

export default loaiThuoc;
