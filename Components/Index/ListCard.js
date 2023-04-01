import React, { Fragment, useEffect, useState } from "react";
import CardProduct from "./CardProduct";

const ListCard = () => {
  const [dsThuoc, setDsThuoc] = useState([]);
  useEffect(() => {
    fetch(
      "http://localhost:8080/QLNT-Server/nhan-vien/thuoc-va-loai-thuoc/danh-sach-thuoc-khong-ke-don?keyword=a"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((results) => {
        setDsThuoc(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Fragment>
      <div className="row my-3 my-1i">
        <div className="col-12">
          <h3 className="fw-bold">Sản phẩm bán chạy</h3>
        </div>
      </div>
      <div className="row my-2">
        {dsThuoc.map((thuoc) => (
          <CardProduct
            images="/images/index/products/product1.jpg"
            price={thuoc.giaBanLe}
            title={thuoc.thuoc.tenThuoc}
            id={thuoc.thuoc.maThuoc}
            donViTinh={thuoc.thuoc.donViTinh}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default ListCard;
