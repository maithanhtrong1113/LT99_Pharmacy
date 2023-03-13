import ContentChiTietThuoc from "@/Components/Admin/ContentChiTietThuoc";

import GoTopPage from "@/Components/Index/GoTopPage";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const index = () => {
  // const router = useRouter();
  // const { id } = router.query;
  // console.log(id);
  // const [thuoc, setThuoc] = useState();
  // useEffect(() => {
  //   async function fetchData() {
  //     if (typeof id === "string") {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc/${id}`
  //         );
  //         const data = await response.json();
  //         console.log(data);
  //         setThuoc(data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   }
  //   fetchData();
  // }, [id]);

  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentChiTietThuoc />
    </Fragment>
  );
};

export default index;
