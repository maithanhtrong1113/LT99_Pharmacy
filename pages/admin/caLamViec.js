import ContentCaLamViec from "@/Components/Admin/ContentCalamViec";
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
      <ContentCaLamViec />
    </Fragment>
  );
};

export default loaiThuoc;
