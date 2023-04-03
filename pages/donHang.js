import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import Navigation from "@/Components/Index/Navigation";
import ContentLichSuDonHang from "@/Components/Me/ContentLichSuDonHang";
import NotShowMess from "@/Components/utils/showMess";
import React, { Fragment } from "react";
const donHang = () => {
  NotShowMess();
  return (
    <Fragment>
      <GoTopPage />
      <Navigation />
      <ContentLichSuDonHang />
      <Footer />
    </Fragment>
  );
};

export default donHang;
