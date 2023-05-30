import React, { Fragment, useEffect, useState } from "react";
import CardProduct from "./CardProduct";
import Image from "next/image";
import { motion } from "framer-motion";

const ListCard = () => {
  const animateImgeBot = {
    off: { y: 150, opacity: 0 },
    on: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 3,
        type: "spring",
        bounce: 0.3,
      },
    },
  };
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
        setDsThuoc(results.slice(0, 4));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Fragment>
      <motion.div
        className="row  bg-pastel-blue-trans pt-5 my-3 position-relative  "
        initial={"off"}
        whileInView={"on"}
        viewport={{ once: true }}
        variants={animateImgeBot}
      >
        <Image
          src="/images/ho.png"
          className="imageHot position-absolute z-index "
          width={300}
          height={50}
        />
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
      </motion.div>
    </Fragment>
  );
};

export default ListCard;
