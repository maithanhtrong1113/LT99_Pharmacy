import BottomNavigation from "@/Components/Index/BottomNavigation";
import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import Navigation from "@/Components/Index/Navigation";
import Content from "@/Components/ListProduct/Content";
import NotShowMess from "@/Components/utils/showMess";
import { getAllThuocTheoLoai } from "@/api/thuocApi";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const listProduct = () => {
  NotShowMess();

  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <Navigation />
      <Content />
      <Footer />
    </Fragment>
  );
};

export default listProduct;
