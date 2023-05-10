import React, { Fragment, useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import Image from "next/image";

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
      <div className="row my-2 bg-pastel-blue-trans pt-5 mt-3 position-relative">
        <Image
          src="/images/ho.png"
          className="imageHot position-absolute z-index "
          width={300}
          height={50}
        />
        {dsThuoc.map((thuoc) => (
          <CardProduct
            images={`/images/product/${thuoc.thuoc.maThuoc}.jpg`}
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
