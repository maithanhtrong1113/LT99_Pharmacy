import Content from "@/Components/Admin/Content";
import GoTopPage from "@/Components/Index/GoTopPage";
import showMess from "@/Components/utils/showMess";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const index = (props) => {
  showMess();
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <Content />
    </Fragment>
  );
};

export default index;
