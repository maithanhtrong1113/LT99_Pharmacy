import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import Navigation from "@/Components/Index/Navigation";
import ContentChiTietDonHang from "@/Components/Me/ContentChiTietDonHang";
import NotShowMess from "@/Components/utils/showMess";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
const donHang = () => {
  NotShowMess();
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <Navigation />
      <ContentChiTietDonHang />
      <Footer />
    </Fragment>
  );
};

export default donHang;
