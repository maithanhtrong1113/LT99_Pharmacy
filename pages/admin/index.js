import Content from "@/Components/Admin/Content";
import GoTopPage from "@/Components/Index/GoTopPage";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const index = (props) => {
  const router = useRouter();
  const { pathname } = router;
  const [hasAdminString, setHasAmdminString] = useState(false);

  useEffect(() => {
    setHasAmdminString(pathname.includes("admin"));
    const fbRoot = document.getElementById("fb-root");

    if (hasAdminString) fbRoot.classList.add("invisible");
    else {
      fbRoot.className = " ";
    }
  }, [router]);

  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <Content />
    </Fragment>
  );
};

export default index;
