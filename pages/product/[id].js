import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import Navigation from "@/Components/Index/Navigation";
import Content from "@/Components/ProductDetail/Content";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

const page = (props) => {
  const router = useRouter();
  return (
    <Fragment>
      <GoTopPage />
      <Navigation />
      <Content thuoc={props.thuoc} />
      <Footer />
    </Fragment>
  );
};
export async function getServerSideProps({ query }) {
  const res = await fetch(
    `http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/thuoc/${query.id}`
  );
  const data = await res.json();

  return {
    props: {
      thuoc: data,
    },
  };
}
export default page;
