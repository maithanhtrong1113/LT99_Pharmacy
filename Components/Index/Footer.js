import Link from "next/link";
import React from "react";
import { Container } from "reactstrap";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import Image from "next/image";
import bg from "../../public/images/footer-back.jpg";
const Footer = () => {
  return (
    <Container fluid className="bg-gray">
      <div className="row">
        <div className=" col-lg-4 col-6 my-3">
          <div className="fw-bold h-60 d-flex align-item-center">
            <Image
              src="/images/logo.png"
              className="img-fluid rounded float-left me-4 h-auto"
              width={65}
              height={100}
              alt="anh"
            />
            Về LT99
          </div>

          <hr />
          <p>
            Tại LT99, mỗi dược sỹ luôn tận tâm phục vụ và được đào tạo để hoàn
            thành xuất sắc những sứ mệnh được giao.
          </p>
          <p>
            <Link href="/" className="text-primary ">
              Tìm hiểu thêm
            </Link>
          </p>
          <p>
            <Link
              href="/"
              className="text-primary fw-bold text-decoration-none"
            >
              Trở thành nhà cung cấp
            </Link>
          </p>
          <p>
            Hỗ trợ đơn hàng doanh nghiệp:
            <br />
          </p>
          <p className="text-dark fs-12">LT99pharmacy@gmail.com</p>
        </div>
        <div className="col-lg-4  col-6 my-3 my-1i">
          <p className="fw-bold h-60 d-flex align-items-center ">
            Liên kết hữu ích
          </p>
          <hr />
          <p>
            <Link href="/" className="fw-bold text-dark  text-decoration-none">
              Câu hỏi thường gặp
            </Link>
          </p>
          <p>
            <Link href="/" className="fw-bold text-dark  text-decoration-none">
              Tìm cửa hàng gần bạn
            </Link>
          </p>
          <p>
            <Link href="/" className="fw-bold text-dark  text-decoration-none">
              Chính sách giao hàng
            </Link>
          </p>
          <p>
            <Link href="/" className="fw-bold text-dark  text-decoration-none">
              Phương thức thanh toán
            </Link>
          </p>
          <p>
            <Link href="/" className="fw-bold text-dark  text-decoration-none">
              Chính sách đổi trả
            </Link>
          </p>
          <p>
            <Link href="/" className="fw-bold text-dark  text-decoration-none">
              Chính sách bảo mật
            </Link>
          </p>
          <p>
            <Link href="/" className="fw-bold text-dark  text-decoration-none">
              Thể lệ chương trình Thẻ thành viên
            </Link>
          </p>
        </div>
        <div className="col-lg-4 col-12  my-3 my-1i">
          <p className="fw-bold h-600 d-flex align-items-center">
            Theo dõi chúng tôi trên
          </p>
          <hr />
          <p>
            <BsFacebook className="colorFb me-4" />
            <Link
              href="https://www.facebook.com/"
              className="text-decoration-none text-dark fw-bold"
            >
              Facebook
            </Link>
          </p>
          <p>
            <BsYoutube className="colorYoutube me-4" />
            <Link
              href="https://www.youtube.com/"
              className="text-decoration-none text-dark fw-bold"
            >
              Youtube
            </Link>
          </p>
          <p>
            <Image
              src="/images/zalo.svg"
              className="image-fluid w-5 me-4"
              width={100}
              height={30}
              alt="anh"
            />
            <Link
              href="https://zalo.me/pc"
              className="text-decoration-none text-dark fw-bold"
            >
              Zalo
            </Link>
          </p>
        </div>
      </div>
      <div className="row  ">
        <hr className="text-dark " />

        <div className="col-12 ">
          <p className="fw-bold text-dark text-center">
            © Copyright 2023 lt-99-pharmacy.vercel.app. All rights reserved.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
