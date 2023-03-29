import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import GoTopPage from "@/Components/Index/GoTopPage";
import ContentHoaDon from "@/Components/Admin/ContentHoaDon";
const hoaDon = (props) => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <ContentHoaDon hoaDon={props.hoaDon} />
    </Fragment>
  );
};
export async function getServerSideProps() {
  const res = await fetch(
    "http://localhost:8080/QLNT-Server/nhan-vien/hoa-don/"
  );
  const data = await res.json();

  return {
    props: {
      hoaDon: data,
    },
  };
}
export default hoaDon;
