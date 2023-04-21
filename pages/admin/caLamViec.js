import ContentCaLamViec from "@/Components/Admin/ContentCalamViec";
import GoTopPage from "@/Components/Index/GoTopPage";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
import RouteGuardAdmin from "@/Components/RouteGuard/RouteGuardAdmin";
import NotShowMess from "@/Components/utils/showMess";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const loaiThuoc = () => {
  NotShowMess();
  return (
    <RouteGuardAdmin>
      <ToastContainer />
      <GoTopPage />
      <ContentCaLamViec />
    </RouteGuardAdmin>
  );
};

export default loaiThuoc;
