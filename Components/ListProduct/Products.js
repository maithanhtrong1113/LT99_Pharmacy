import Link from "next/link";
import React, { Fragment, use, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import CardProduct from "../Index/CardProduct";
import { getAllLoaiThuocKhach } from "@/api/loaiThuocApi";
const Products = () => {
  const [dsThuoc, setDsThuoc] = useState([]);
  const [slected, setSelected] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    fetchData();
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
        setDsThuoc(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  const [loaiThuoc, setLoaiThuoc] = useState([]);
  async function fetchData() {
    const data = await getAllLoaiThuocKhach();
    setLoaiThuoc(data);
  }
  const danhMucs = [];
  const danhMuc = [];
  const sortTang = () => {
    const arr = [...dsThuoc];
    arr.sort((a, b) => a.giaBanLe - b.giaBanLe);
    setDsThuoc(arr);
  };
  const sortGiam = () => {
    const arr = [...dsThuoc];
    arr.sort((a, b) => b.giaBanLe - a.giaBanLe);
    setDsThuoc(arr);
  };
  const [sorted, setSorted] = useState(false);
  const [dsThuocLoc, setDsThuocLoc] = useState([]);
  const LocTheoDk = (giaMin, giaMax) => {
    setSorted(true);
    setDsThuocLoc(
      dsThuoc.filter((product) => {
        const price = product.giaBanLe;
        return price >= giaMin && price <= giaMax;
      })
    );
    console.log(dsThuoc);
  };
  for (let i = 1; i <= loaiThuoc.length; i++) {
    if (i === 0) {
      setSelected(loaiThuoc[i - 1].maLoaiThuoc);
    }
    danhMuc.push(
      <li className="nav-item my-2 liList">
        <Link
          className="nav-link d-flex justify-content-between align-items-center px-2"
          href="/"
        >
          {loaiThuoc[i - 1].tenLoai}
          <FaAngleDown />
        </Link>
      </li>
    );
    danhMucs.push(
      <option value={loaiThuoc[i - 1].maLoaiThuoc}>
        {loaiThuoc[i - 1].tenLoai}
      </option>
    );
  }
  return (
    <Fragment>
      {windowWidth > 1000 && (
        <div className="row mt-3">
          <div className="col-xl-3 col-lg-3">
            <h4 className="fw-bold ms-1">Danh mục</h4>
            <nav className="navbar bg-white border rounded shadow">
              <div className="container-fluid ">
                <ul className="navbar-nav w-100 ">{danhMuc}</ul>
              </div>
            </nav>
          </div>
          <div className="col-xl-9 col-lg-9">
            <div className="container-fluid">
              <div className="row my-2">
                <span className="text-muted">Lọc:</span>
                <div className="col-xl-12 col-lg-12 d-flex justify-content-between">
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
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() => setSorted(false)}
                        >
                          Tất cả
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() => LocTheoDk(0, 200000)}
                        >
                          0 - 200.000
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() => LocTheoDk(200000, 500000)}
                        >
                          200.000 - 500.000
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={() => LocTheoDk(500000, 1000000)}
                        >
                          500.000 - 1.000.000
                        </button>
                      </li>
                    </ul>
                  </div>
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
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={sortGiam}
                        >
                          Giá giảm dần
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={sortTang}
                        >
                          Giá tăng dần
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {!sorted && (
                <div className="row">
                  {dsThuoc.map((thuoc) => (
                    <CardProduct
                      images="/images/index/products/product1.jpg"
                      price={thuoc.giaBanLe}
                      title={thuoc.thuoc.tenThuoc}
                      id={thuoc.thuoc.maThuoc}
                      donViTinh={thuoc.thuoc.donViTinh}
                      inventory={thuoc.thuoc.inventory}
                    />
                  ))}
                </div>
              )}
              {sorted && (
                <div className="row">
                  {dsThuocLoc.map((thuoc) => (
                    <CardProduct
                      images="/images/index/products/product1.jpg"
                      price={thuoc.giaBanLe}
                      title={thuoc.thuoc.tenThuoc}
                      id={thuoc.thuoc.maThuoc}
                      donViTinh={thuoc.thuoc.donViTinh}
                      inventory={thuoc.thuoc.inventory}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {windowWidth < 1000 && (
        <div className="row mt-3">
          <div className="col-xl-3 col-lg-3">
            <h4 className="fw-bold ms-1">Danh mục</h4>

            <nav className="navbar bg-white border rounded shadow">
              <div className="container-fluid ">
                <div className="ms-1 row w-75">
                  <select
                    className="form-select form-control "
                    onChange={(e) => {
                      setSelected(e.target.value);
                    }}
                  >
                    {danhMucs}
                  </select>
                </div>
              </div>
            </nav>
          </div>
          <div className="col-12">
            <div className="container bg-light">
              <div className="row d-flex justify-content-between mt-2">
                <div className="col-6 ">
                  <div className="dropdown">
                    <button
                      className="btn btn-info dropdown-toggle btn-sm"
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
                <div className=" col-6 dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle btn-sm"
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

              <div className="row">
                {dsThuoc.map((thuoc) => (
                  <CardProduct
                    images="/images/index/products/product1.jpg"
                    price={thuoc.giaBanLe}
                    title={thuoc.thuoc.tenThuoc}
                    id={thuoc.thuoc.maThuoc}
                    donViTinh={thuoc.thuoc.donViTinh}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Products;
