import React, { Fragment, useEffect, useState } from "react";
import CardProduct from "./CardProduct";

const ListCard = () => {
  const [dsThuoc, setDsThuoc] = useState([]);
  useEffect(() => {
    fetch(
      "http://localhost:8080/QLNT-Server/khach-hang/xem-thuoc/danh-sach-thuoc"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((results) => {
        results = results.filter((thuoc) => thuoc.thuoc.soLuong > 0);
        setDsThuoc(results.slice(0, 4));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Fragment>
      <div className="row my-3 my-1i">
        <div className="col-12">
          <h3 className="fw-bold text-blue-pastel">Sản phẩm bán chạy</h3>
        </div>
      </div>
      <div className="row my-2">
        {dsThuoc.map((thuoc, index) => (
          <CardProduct
            images={`/images/product/${index + 1}.jpg`}
            price={thuoc.giaBanLe}
            title={thuoc.thuoc.tenThuoc}
            id={thuoc.thuoc.maThuoc}
            donViTinh={thuoc.thuoc.donViTinh}
            inventory={thuoc.thuoc.soLuong}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default ListCard;
