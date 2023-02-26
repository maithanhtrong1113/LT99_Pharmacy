import Footer from "@/Components/Index/Footer";
import GoTopPage from "@/Components/Index/GoTopPage";
import Navigation from "@/Components/Index/Navigation";
import Content from "@/Components/ProductDetail/Content";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

const page = () => {
  const router = useRouter();
  const productId = router.query.id;

  return (
    <Fragment>
      <GoTopPage />
      <Navigation />
      <Content />
      <Footer />
    </Fragment>
  );
};

export default page;
