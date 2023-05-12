import React, { Fragment, useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import Image from "next/image";
import { getAllThuocTheoLoai } from "@/api/thuocApi";

const ListCard1 = () => {
  const [dsThuoc, setDsThuoc] = useState([]);
  async function fetchDanhSachThuoc() {
    const data = await getAllThuocTheoLoai(2);
    setDsThuoc(data.slice(0, 4));
  }
  useEffect(() => {
    fetchDanhSachThuoc();
  }, []);
  return (
    <Fragment>
      <div className="row line-space"></div>
      <div className="row my-2 bg-pastel-blue-trans pt-5 mt-3 position-relative ">
        <Image
          src="/images/hot.png"
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

export default ListCard1;
