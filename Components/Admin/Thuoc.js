import React, { Fragment } from "react";
import { AiOutlineMore } from "react-icons/ai";

const Thuoc = () => {
  return (
    <Fragment>
      <tr>
        <td>1</td>
        <td>Panadol Extra (15 vỉ x 12 viên)</td>
        <td>Thuốc không kê đơn</td>
        <td>20/12/2022</td>
        <td>20/12/2026</td>
        <td>10 hộp</td>
        <td>
          <button className="btn">
            <AiOutlineMore />
          </button>
        </td>
      </tr>
    </Fragment>
  );
};

export default Thuoc;
