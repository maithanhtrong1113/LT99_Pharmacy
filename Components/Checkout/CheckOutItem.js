import React, { Fragment, useEffect, useState } from "react";
import VND from "../utils/formatVND";

const CheckOutItem = (props) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Fragment>
      {windowWidth > 1000 && (
        <tr>
          <th>
            <img src={props.item.image} className="img-fluid sizeImgCart"></img>
          </th>
          <td className="pt-4 text-dark fw-bold">{props.item.title}</td>
          <td className="pt-4 text-info">{VND.format(props.item.price)}</td>
          <td className="pt-4">
            <span>{props.item.quantity}</span>
          </td>
          <td className="pt-4 text-info">{VND.format(props.item.total)}</td>
        </tr>
      )}
      {windowWidth < 1000 && (
        <div className="row d-flex">
          <div className="col-3">
            <img src={props.item.image} className="img-fluid sizeImgCart"></img>
          </div>
          <div className="col-9 text-dark fw-bold  ">
            <p> {props.item.title}</p>
            <p className="text-info mb-0 ">{`${VND.format(
              props.item.price
            )} x ${props.item.quantity} `}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default CheckOutItem;
