import React, { Fragment } from "react";
import CardProduct from "./CardProduct";

const ListCard = () => {
  return (
    <Fragment>
      <div className="row my-3 my-1i">
        <div className="col-12">
          <h3 className="fw-bold">Sản phẩm bán chạy</h3>
        </div>
      </div>
      <div className="row my-2">
        <CardProduct
          images="images/index/products/product1.jpg"
          price={400000}
          title="Thực phẩm bảo vệ sức khỏe Advanced Formula Mutivitamin "
          id="1"
        />

        <CardProduct
          images="images/index/products/product2.jpg"
          price={300000}
          title="Nước muối sinh lý Natriclorid 0.9% (500ml)"
          id="2"
        />

        <CardProduct
          images="images/index/products/product3.jpg"
          price={200000}
          title="Khẩu trang y tế VN95 Pharmacity (Hộp 5 cái)"
          id="3"
        />

        <CardProduct
          images="images/index/products/product4.jpg"
          price={100000}
          title="Viên ngậm Pharmacity Herbal Lozenges NEW (Hộp 50 viên)"
          id="4"
        />
      </div>
    </Fragment>
  );
};

export default ListCard;
