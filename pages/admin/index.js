import Content from "@/Components/Admin/Content";
import GoTopPage from "@/Components/Index/GoTopPage";
import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";

const index = (props) => {
  return (
    <Fragment>
      <ToastContainer />
      <GoTopPage />
      <Content nhanVien={props.nhanVien} />
    </Fragment>
  );
};
export async function getServerSideProps() {
  const res = await fetch(
    "http://localhost:8080/QLNT-Server/quan-ly/danh-sach-nhan-vien"
  );
  const data = await res.json();

  return {
    props: {
      nhanVien: data,
    },
  };
}
export default index;
