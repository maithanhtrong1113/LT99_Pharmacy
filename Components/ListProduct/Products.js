import Link from "next/link";
import React, { Fragment, use, useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import CardProduct from "../Index/CardProduct";
import { getAllLoaiThuocKhach } from "@/api/loaiThuocApi";
import { useRouter } from "next/router";
import { getAllThuocTheoLoai } from "@/api/thuocApi";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
const Products = (props) => {
  const [dsThuoc, setDsThuoc] = useState([]);
  const [slected, setSelected] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const router = useRouter();
  const { id } = router.query;

  const [loaiThuoc, setLoaiThuoc] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotal] = useState(0);
  const getItems = (data, page) => {
    const start = (page - 1) * 8;
    const end = start + 8;
    return data.slice(start, end);
  };
  async function fetchDanhSachThuoc() {
    const data = await getAllThuocTheoLoai(id);
    // setPage(1);
    setTotal(Math.ceil(data.length / 8));
    setDsThuoc(getItems(data, page));
  }
  const buttons = [];
  for (let i = 1; i <= totalPage; i++) {
    buttons.push(
      <div className="col-1">
        <button
          className={`btn bg-blue-dark rounded-circle w-50 btn-page-hover p-1 ${
            page === i ? "bg-blue-darkActive" : ""
          } `}
          key={i}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      </div>
    );
  }
  useEffect(() => {
    fetchDanhSachThuoc();
    fetchData();
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [id, page]);
  useEffect(() => {
    setPage(1);
  }, [id]);
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
      <li className="nav-item my-2 liList bg-pastel-blue-trans rounded ">
        <Link
          className="text-dark nav-link d-flex justify-content-between align-items-center px-2 fw-bold bg-pastel-blue-trans rounded "
          href={`/listProduct/${loaiThuoc[i - 1].maLoai}`}
        >
          {loaiThuoc[i - 1].tenLoai}
        </Link>
      </li>
    );

    danhMucs.push(
      <option value={loaiThuoc[i - 1].maLoai}>
        {loaiThuoc[i - 1].tenLoai}
      </option>
    );
  }
  useEffect(() => {}, [slected]);
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
          <div className="col-xl-9 col-lg-9 rounded shadow bg-pastel-blue-trans">
            <div className="container-fluid">
              <div className="row my-2">
                <span className="text-dark my-3 ">Lọc sản phẩm:</span>
                <div className="col-xl-12 col-lg-12 d-flex justify-content-between">
                  <div className="dropdown">
                    <button
                      className="btn btn-primary dropdown-toggle"
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
                      className="btn btn-dark dropdown-toggle text-white"
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
                  {dsThuoc.map((thuoc, index) => (
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
              )}
              {sorted && (
                <div className="row">
                  {dsThuocLoc.map((thuoc) => (
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
              )}
              {totalPage > 1 && !sorted && (
                <div className="row d-flex justify-content-center align-items-center my-2">
                  <div className="col-1">
                    <button
                      className="btn bg-blue-dark btn-page-hover"
                      onClick={() => {
                        setPage(page === 1 ? page : page - 1);
                      }}
                    >
                      <AiOutlineDoubleLeft className="text-white" />
                    </button>
                  </div>
                  {buttons}
                  <div className="col-1">
                    <button
                      className="btn bg-blue-dark btn-page-hover"
                      onClick={() => {
                        setPage(page === totalPage ? page : page + 1);
                      }}
                    >
                      <AiOutlineDoubleRight className="text-white" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {windowWidth < 1000 && (
        <div className="row mt-3">
          <div className="col-xl-3 col-lg-3 my-3">
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
          <div className="col-12 ">
            <div className="container bg-pastel-blue-trans py-2">
              <div className="row d-flex justify-content-between mt-2 ">
                <div className="col-6">
                  <div className="dropdown">
                    <button
                      className="btn btn-primary dropdown-toggle btn-sm"
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
                          onClick={() => setSorted(false)}
                        >
                          Tất cả
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => LocTheoDk(0, 200000)}
                        >
                          0 - 200.000
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => LocTheoDk(200000, 500000)}
                        >
                          200.000 - 500.000
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => LocTheoDk(500000, 1000000)}
                        >
                          500.000 - 1.000.000
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className=" col-6 dropdown">
                  <button
                    className="btn btn-dark dropdown-toggle btn-sm"
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
                      <button className="dropdown-item" onClick={sortGiam}>
                        Giá giảm dần
                      </button>
                    </li>

                    <li>
                      <button className="dropdown-item" onClick={sortTang}>
                        Giá tăng dần
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              {!sorted && (
                <div className="row">
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
              )}
              {sorted && (
                <div className="row">
                  {dsThuocLoc.length === 0 && (
                    <span>Không tìm thấy sản phẩm nào</span>
                  )}
                  {dsThuocLoc.map((thuoc, index) => (
                    <CardProduct
                      images={`/images/product/${thuoc.thuoc.maThuoc}.jpg`}
                      price={thuoc.giaBanLe}
                      title={thuoc.thuoc.tenThuoc}
                      id={thuoc.thuoc.maThuoc}
                      donViTinh={thuoc.thuoc.donViTinh}
                      inventory={thuoc.thuoc.inventory}
                    />
                  ))}
                </div>
              )}
              {dsThuoc.length === 0 && <span>Không tìm thấy sản phẩm nào</span>}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Products;
