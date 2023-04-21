import ContentNhanVien from "@/Components/Admin/ContentNhanVien";
import GoTopPage from "@/Components/Index/GoTopPage";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
import RouteGuardAdmin from "@/Components/RouteGuard/RouteGuardAdmin";
import NotShowMess from "@/Components/utils/showMess";
import showMess from "@/Components/utils/showMess";
import { useRouter } from "next/router";

import React, { Fragment, useEffect } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  NotShowMess();
  return (
    <RouteGuardAdmin>
      <ToastContainer />
      <GoTopPage />
      <ContentNhanVien />
    </RouteGuardAdmin>
  );
};

export default index;
