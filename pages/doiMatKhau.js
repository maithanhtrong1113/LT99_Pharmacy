import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import Navigation from "@/Components/Index/Navigation";
import ContentDoiMatKhau from "@/Components/Me/ContentDoiMatKhau";
import React, { Fragment } from "react";

const doiMatKhau = () => {
  return (
    <Fragment>
      <GoTopPage />
      <Navigation />
      <ContentDoiMatKhau />
      <Footer />
    </Fragment>
  );
};

export default doiMatKhau;
