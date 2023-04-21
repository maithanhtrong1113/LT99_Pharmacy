import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import GoTopPage from "@/Components/Index/GoTopPage";
import ContentHoaDon from "@/Components/Admin/ContentHoaDon";
import NotShowMess from "@/Components/utils/showMess";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
const hoaDon = () => {
  NotShowMess();
  return (
    <RouteGuard>
      <ToastContainer />
      <GoTopPage />
      <ContentHoaDon />
    </RouteGuard>
  );
};

export default hoaDon;
