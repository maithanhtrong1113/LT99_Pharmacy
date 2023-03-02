import Link from "next/link";
import React, { Fragment } from "react";
import { FaAngleDown } from "react-icons/fa";
import CardProduct from "../Index/CardProduct";
const Products = () => {
  return (
    <Fragment>
      <div className="row mt-3">
        <div className="col-xl-3 col-lg-3">
          <h4 className="fw-bold ms-1">Danh mục</h4>
          <nav className="navbar bg-white border rounded shadow">
            <div className="container-fluid ">
              <ul className="navbar-nav w-100 ">
                <li className="nav-item my-2 liList">
                  <Link
                    className="nav-link d-flex justify-content-between align-items-center px-2"
                    href="/"
                  >
                    Dược phẩm
                    <FaAngleDown />
                  </Link>
                </li>

                <li className="nav-item my-2 liList ">
                  <Link
                    className="nav-link d-flex justify-content-between align-items-center px-2"
                    href="/"
                  >
                    Chăm sóc sức khỏe
                    <FaAngleDown />
                  </Link>
                </li>
                <li className="nav-item my-2 liList ">
                  <Link
                    className="nav-link d-flex justify-content-between align-items-center px-2"
                    href="/"
                  >
                    Chăm sóc cá nhân
                    <FaAngleDown />
                  </Link>
                </li>
                <li className="nav-item my-2 liList ">
                  <Link
                    className="nav-link d-flex justify-content-between align-items-center px-2"
                    href="/"
                  >
                    Thực phẩm chức năng
                    <FaAngleDown />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="col-xl-9 col-lg-9">
          <div className="container-fluid">
            <div className="row my-2">
              <div className="col-xl-12 col-lg-12">
                {" "}
                <div className="dropdown">
                  <button
                    className="btn btn-info dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Giá
                  </button>
                  <ul
                    className="dropdown-menu shadow"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <button className="dropdown-item">0 - 200.000</button>
                    </li>

                    <li>
                      <button className="dropdown-item">
                        200.000 - 1.000.000
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item">
                        1.000.000 - 3.000.000
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row my-2 ">
              <div className="col-xl-12 col-lg-12 d-flex justify-content-between">
                <p className="text-muted">Lọc:</p>
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sắp xếp
                  </button>
                  <ul
                    className="dropdown-menu shadow"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <button className="dropdown-item">Giá giảm dần</button>
                    </li>

                    <li>
                      <button className="dropdown-item">Giá tăng dần</button>
                    </li>
                    <li>
                      <button className="dropdown-item">Mới nhất</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <CardProduct
                images="images/index/products/product1.jpg"
                price="310000"
                title="Thực phẩm bảo vệ sức khỏe"
              />
              <CardProduct
                images="images/index/products/product1.jpg"
                price="310000"
                title="Thực phẩm bảo vệ sức khỏe"
              />
              <CardProduct
                images="images/index/products/product1.jpg"
                price="310000"
                title="Thực phẩm bảo vệ sức khỏe"
              />
              <CardProduct
                images="images/index/products/product1.jpg"
                price="310000"
                title="Thực phẩm bảo vệ sức khỏe"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Products;
