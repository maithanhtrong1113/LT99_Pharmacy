import ContentNhaCungCap from "@/Components/Admin/ContentNhaCungCap";
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
      <ContentNhaCungCap />
    </Fragment>
  );
};

export default loaiThuoc;
