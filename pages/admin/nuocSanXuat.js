import ContentNuocSanXuat from "@/Components/Admin/ContentNuocSanXuat";
import GoTopPage from "@/Components/Index/GoTopPage";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
import NotShowMess from "@/Components/utils/showMess";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const loaiThuoc = () => {
  NotShowMess();
  return (
    <RouteGuard>
      <ToastContainer />
      <GoTopPage />
      <ContentNuocSanXuat />
    </RouteGuard>
  );
};

export default loaiThuoc;
