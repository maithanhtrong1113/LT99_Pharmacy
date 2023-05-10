import React, { useState, useEffect } from "react";
import { Fragment } from "react";
import CardProduct from "./CardProduct";

function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [dsThuoc, setDsThuoc] = useState([]);
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
        setDsThuoc(results.slice(0, 8));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight - now;
      const remainingHours = Math.floor(diff / 1000 / 60 / 60);
      const remainingMinutes = Math.floor((diff / 1000 / 60) % 60);
      const remainingSeconds = Math.floor((diff / 1000) % 60);
      setHours(String(remainingHours).padStart(2, "0"));
      setMinutes(String(remainingMinutes).padStart(2, "0"));
      setSeconds(String(remainingSeconds).padStart(2, "0"));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Fragment>
      <div className="row line-space"></div>
      <div className="row d-flex justify-content p-2 mb-5">
        <h5 className="fw-bold text-blue-pastel col-xl-12">
          Deal khủng không ngờ - giá sốc mỗi giờ
        </h5>
        <div className="col-12 bg-pastel-blue-trans p-2 rounded  shadow ">
          <div className="container-fluid    ">
            {windowWidth > 1000 && (
              <div className="row text-dark d-flex justify-content-between text-white bg-blue-dark p-3 rounded  shadow">
                <div className="d-flex col-8 flex-column  justify-content-center">
                  <h4 className="fw-bold">00:00 - 23:59</h4>
                  <h6 className="fw-bold">Đang diễn ra</h6>
                </div>
                <div className="col-4 d-flex align-items-center px-0 mx-0 justify-content-end">
                  <h5 className="fw-bold">Kết Thúc trong:</h5>
                  <h5 className="fw-bold mx-2 bg-dark p-3 rounded">{hours}</h5>
                  <h5 className="fw-bold mx-2 bg-dark p-3 rounded">
                    {minutes}
                  </h5>
                  <h5 className="fw-bold mx-2 bg-dark p-3 rounded">
                    {seconds}
                  </h5>
                </div>
              </div>
            )}
            {windowWidth < 1000 && (
              <div className="row text-dark d-flex justify-content-between text-white bg-blue-dark rounded  shadow">
                <div className="d-flex col-12 flex-column  justify-content-start px-0">
                  <h4 className="fw-bold">00:00 - 23:59</h4>
                  <h6 className="fw-bold">Đang diễn ra</h6>
                </div>
                <div className="col-12 d-flex align-items-center px-0 mx-0 justify-content-start">
                  <h6 className="fw-bold">Kết Thúc trong:</h6>
                  <h6 className="fw-bold mx-2 bg-dark p-3 rounded">{hours}</h6>
                  <h6 className="fw-bold mx-2 bg-dark p-3 rounded">
                    {minutes}
                  </h6>
                  <h6 className="fw-bold mx-2 bg-dark p-3 rounded">
                    {seconds}
                  </h6>
                </div>
              </div>
            )}
            <div className="row mt-4 d-flex ">
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
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default CountdownTimer;
