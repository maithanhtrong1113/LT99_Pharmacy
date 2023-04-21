import ContentThuoc from "@/Components/Admin/ContentThuoc";
import GoTopPage from "@/Components/Index/GoTopPage";
import RouteGuard from "@/Components/RouteGuard/RouteGuard";
import NotShowMess from "@/Components/utils/showMess";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
// import fetch from "node-fetch";

const index = () => {
  NotShowMess();
  return (
    <RouteGuard>
      <ToastContainer />
      <GoTopPage />
      <ContentThuoc />
    </RouteGuard>
  );
};

export default index;
