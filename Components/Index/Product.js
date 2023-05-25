import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";

const Product = (props) => {
  return (
    <Fragment>
      <div className="productHover my-2 w-100">
        <Link
          href={props.maLoai}
          className="d-flex flex-column justify-content-between align-items-center text-decoration-none bg-list pt-3"
        >
          <Image
            src={props.images}
            className="img-fluid sizeImageProduct "
            width={100}
            height={50}
          />
          <p className="text-dark text-center ">{props.tenDanhMuc}</p>
        </Link>
      </div>
    </Fragment>
  );
};

export default Product;
