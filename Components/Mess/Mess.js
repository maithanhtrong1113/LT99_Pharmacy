import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";

const Mess = () => {
  const [isShow, setShow] = useState(true);

  useEffect(() => {
    if (includes("admin")) setShow(false);
  }, []);
  return <Fragment>{isShow && <div id="fb-root"></div>}</Fragment>;
};

export default Mess;
