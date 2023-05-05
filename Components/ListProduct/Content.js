import Link from "next/link";
import React, { Fragment } from "react";
import { Container } from "reactstrap";
import Products from "./Products";

const Content = () => {
  return (
    <Fragment>
      <Container fluid className="my-10">
        <div className="row  d-flex pt-2 ">
          <div className="col-lg-12">
            <nav aria-label="breadcrumb ">
              <ol className="breadcrumb ">
                <li className="breadcrumb-item">
                  <Link href="/" className="text-muted text-decoration-none ">
                    Trang chủ
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/" className="text-info text-decoration-none">
                    Dược phẩm
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <Products />
      </Container>
    </Fragment>
  );
};

export default Content;
