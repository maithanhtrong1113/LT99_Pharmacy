import ContentChiTietThuoc from "@/Components/Admin/ContentChiTietThuoc";

import GoTopPage from "@/Components/Index/GoTopPage";
import NotShowMess from "@/Components/utils/showMess";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  NotShowMess();
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentChiTietThuoc />
    </Fragment>
  );
};

export default index;
