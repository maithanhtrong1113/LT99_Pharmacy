import ContentThongKe from "@/Components/Admin/ContentThongKe";
import GoTopPage from "@/Components/Index/GoTopPage";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
import RouteGuardAdmin from "@/Components/RouteGuard/RouteGuardAdmin";
import NotShowMess from "@/Components/utils/showMess";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const thongKe = () => {
  NotShowMess();
  return (
    <RouteGuardAdmin>
      <ToastContainer />
      <GoTopPage />
      <ContentThongKe />
    </RouteGuardAdmin>
  );
};

export default thongKe;
