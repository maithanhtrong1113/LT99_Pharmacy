import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import GoTopPage from "@/Components/Index/GoTopPage";
import NotShowMess from "@/Components/utils/showMess";
import ContentDonHang from "@/Components/Admin/ContentDonHang";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
const donHang = (props) => {
  NotShowMess();
  return (
    <RouteGuard>
      <ToastContainer />
      <GoTopPage />
      <ContentDonHang />
    </RouteGuard>
  );
};

export default donHang;
