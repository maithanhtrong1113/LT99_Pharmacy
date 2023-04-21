import React, { Fragment, useContext } from "react";
import Content from "../Components/SignUp/Content";
import Navigation from "../Components/Index/Navigation";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/Components/Index/Footer";
import RouteGuardSignin from "@/Components/RouteGuard/RouteGuardSignin";
const signup = () => {
  const router = useRouter();

  return (
    <RouteGuardSignin>
      <ToastContainer />
      <Navigation />
      <Content />
      <Footer />
    </RouteGuardSignin>
  );
};

export default signup;
