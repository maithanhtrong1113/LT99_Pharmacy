import Content from "@/Components/Admin/Content";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <Content />
    </Fragment>
  );
};

export default index;
