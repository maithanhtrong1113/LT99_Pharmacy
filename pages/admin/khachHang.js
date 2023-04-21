import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import GoTopPage from "@/Components/Index/GoTopPage";
import ContentKhachHang from "@/Components/Admin/ContentKhachHang";
import NotShowMess from "@/Components/utils/showMess";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
const khachHang = (props) => {
  NotShowMess();
  return (
    <RouteGuard>
      <ToastContainer />
      <GoTopPage />
      <ContentKhachHang />
    </RouteGuard>
  );
};

export default khachHang;
