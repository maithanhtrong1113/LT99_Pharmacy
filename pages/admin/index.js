import ContentNhanVien from "@/Components/Admin/ContentNhanVien";
import GoTopPage from "@/Components/Index/GoTopPage";
import NotShowMess from "@/Components/utils/showMess";
import showMess from "@/Components/utils/showMess";
import { useRouter } from "next/router";

import React, { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  NotShowMess();
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentNhanVien />
    </Fragment>
  );
};

export default index;
