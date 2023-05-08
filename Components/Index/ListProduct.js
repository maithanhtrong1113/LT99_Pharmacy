import React, { Fragment, useEffect } from "react";

import Product from "./Product";
import { useState } from "react";
import { getAllLoaiThuocKhach } from "@/api/loaiThuocApi";

const ListProduct = () => {
  const [loaiThuoc, setLoaiThuoc] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    const data = await getAllLoaiThuocKhach();
    setLoaiThuoc(data);
  }
  const danhMuc = [];
  for (let i = 1; i <= loaiThuoc.length; i++) {
    danhMuc.push(
      <div className="col-lg-2 col-4 py-3">
        <Product
          images={`images/index/${i}.jpg`}
          tenDanhMuc={loaiThuoc[i - 1].tenLoai}
          maLoai={`/listProduct/${loaiThuoc[i - 1].maLoai}`}
        />
      </div>
    );
  }
  return (
    <Fragment>
      <div className="row my-3 my-1i">
        <div className="col-12">
          <h3 className="fw-bold text-blue-pastel">Danh mục sản phẩm</h3>
        </div>
      </div>
      <div className="my-3 d-flex  my-1i row scrolbarCustomDanhMuc fw-bold">
        {danhMuc}
      </div>
      <div className="row line-space"></div>
    </Fragment>
  );
};

export default ListProduct;
