import React, { Fragment } from "react";

import Product from "./Product";

const ListProduct = () => {
  return (
    <Fragment>
      <div className="row my-3 my-1i">
        <div className="col-12">
          <h3 className="fw-bold">Danh mục sản phẩm</h3>
        </div>
      </div>
      <div className="row my-3 d-flex  my-1i">
        <div className="col-lg-2 col-4">
          <Product images="images/index/duocPham.jpg" tenDanhMuc="Dược phẩm" />
        </div>
        <div className="col-lg-2 col-4">
          <Product
            images="images/index/Cham_soc_suc_khoe.jpg"
            tenDanhMuc="Chăm sóc sức khỏe"
          />
        </div>
        <div className="col-lg-2 col-4">
          <Product
            images="images/index/Cham_soc_ca_nhan.jpg"
            tenDanhMuc="Chăm sóc cá nhân"
          />
        </div>
        <div className="col-lg-2 col-4">
          <Product
            images="images/index/ThucPhamChucNang.jpg"
            tenDanhMuc="Thực Phẩm Chức Năng"
          />
        </div>
        <div className="col-lg-2 col-4">
          <Product
            images="images/index/Cham_soc_suc_khoe.jpg"
            tenDanhMuc="Chăm sóc sức khỏe"
          />
        </div>
        <div className="col-lg-2 col-4">
          <Product
            images="images/index/Cham_soc_suc_khoe.jpg"
            tenDanhMuc="Chăm sóc sức khỏe"
          />
        </div>
      </div>
      <div className=" row line-space"></div>
    </Fragment>
  );
};

export default ListProduct;
