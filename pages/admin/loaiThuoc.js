import ContentLoaiThuoc from "@/Components/Admin/ContentLoaiThuoc";
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
      <ContentLoaiThuoc />
    </RouteGuard>
  );
};

export default loaiThuoc;
