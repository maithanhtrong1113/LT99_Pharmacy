import ContentNhaCungCap from "@/Components/Admin/ContentNhaCungCap";
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
      <ContentNhaCungCap />
    </RouteGuard>
  );
};

export default loaiThuoc;
