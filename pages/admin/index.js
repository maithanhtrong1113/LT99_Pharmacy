import Content from "@/Components/Admin/Content";
import GoTopPage from "@/Components/Index/GoTopPage";
import showMess from "@/Components/utils/showMess";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  const router = useRouter();
  useEffect(() => {
    showMess(router);
  }, [router.asPath]);

  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <Content />
    </Fragment>
  );
};

export default index;
