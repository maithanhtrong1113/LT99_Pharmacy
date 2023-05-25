import React, { Fragment, useEffect } from "react";

import Product from "./Product";
import { useState } from "react";
import { getAllLoaiThuocKhach } from "@/api/loaiThuocApi";
import Link from "next/link";
import Image from "next/image";

const ListProduct = () => {
  const [loaiThuoc, setLoaiThuoc] = useState([]);
  const [length, setLength] = useState(0);
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
        <div className="productHover my-2 w-100">
          <Link
            href={`/listProduct/${loaiThuoc[i - 1].maLoai}`}
            className="d-flex flex-column justify-content-between align-items-center text-decoration-none bg-list pt-3"
          >
            <Image
              src={`/images/index/${i}.jpg`}
              className="img-fluid sizeImageProduct "
              width={100}
              height={50}
            />
            <p className="text-dark text-center ">{loaiThuoc[i - 1].tenLoai}</p>
          </Link>
        </div>
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
