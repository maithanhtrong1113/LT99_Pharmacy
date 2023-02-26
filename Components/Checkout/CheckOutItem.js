import React, { Fragment } from "react";

const CheckOutItem = (props) => {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return (
    <Fragment>
      <tr>
        <th>
          <img src={props.item.image} className="img-fluid sizeImgCart"></img>
        </th>
        <td className="pt-4 text-info">{props.item.title}</td>
        <td className="pt-4 text-info">{VND.format(props.item.price)}</td>
        <td className="pt-4">
          <span>{props.item.quantity}</span>
        </td>
        <td className="pt-4 text-info">{VND.format(props.item.total)}</td>
      </tr>
    </Fragment>
  );
};

export default CheckOutItem;
