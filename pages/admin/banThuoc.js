import ContentBanThuoc from "@/Components/Admin/ContentBanThuoc";
import GoTopPage from "@/Components/Index/GoTopPage";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
import NotShowMess from "@/Components/utils/showMess";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const banThuoc = () => {
  NotShowMess();
  return (
    <RouteGuard>
      <ToastContainer />
      <GoTopPage />
      <ContentBanThuoc />
    </RouteGuard>
  );
};

export default banThuoc;
