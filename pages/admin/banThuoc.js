import ContentBanThuoc from "@/Components/Admin/ContentBanThuoc";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentBanThuoc />
    </Fragment>
  );
};

export default index;
