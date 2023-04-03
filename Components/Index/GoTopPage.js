import React, { Fragment, useEffect, useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
const GoTopPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const listenToScroll = () => {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (winScroll < 250) {
        setIsVisible((prev) => {
          prev = !prev;
        });
      } else {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);
  const scrollTopOnClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Fragment>
      {isVisible && (
        <div className="fixed-bottomm pointer">
          <FaArrowCircleUp
            className="fs-35 color1"
            onClick={scrollTopOnClick}
          />
        </div>
      )}
    </Fragment>
  );
};

export default GoTopPage;
