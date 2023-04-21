import ContentChiTietThuoc from "@/Components/Admin/ContentChiTietThuoc";

import GoTopPage from "@/Components/Index/GoTopPage";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
import NotShowMess from "@/Components/utils/showMess";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  NotShowMess();
  return (
    <RouteGuard>
      <ToastContainer />
      <GoTopPage />
      <ContentChiTietThuoc />
    </RouteGuard>
  );
};

export default index;
