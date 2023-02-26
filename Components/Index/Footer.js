import Link from "next/link";
import React from "react";
import { Container } from "reactstrap";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import Image from "next/image";
const Footer = () => {
  return (
    <Container fluid className="bg-gray">
      <div className="row">
        <div className="col-4 my-3">
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
          <p className="">
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
            Hỗ trợ đơn hàng doanh nghiệp:{" "}
            <Link href="/" className="text-primary  text-decoration-none">
              LT99pharmacy@gmail.com
            </Link>
          </p>
        </div>
        <div className="col-4 my-3">
          <p className="fw-bold h-60 ">Liên kết hữu ích</p>
          <hr />
          <p>
            <Link href="/" className="fw-bold text-muted text-decoration-none">
              Câu hỏi thường gặp
            </Link>
          </p>
          <p>
            <Link href="/" className="fw-bold text-muted text-decoration-none">
              Tìm cửa hàng gần bạn
            </Link>
          </p>
          <p>
            <Link href="/" className="fw-bold text-muted text-decoration-none">
              Chính sách giao hàng
            </Link>
          </p>
          <p>
            <Link href="/" className="fw-bold text-muted text-decoration-none">
              Phương thức thanh toán
            </Link>
          </p>
          <p>
            <Link href="/" className="fw-bold text-muted text-decoration-none">
              Chính sách đổi trả
            </Link>
          </p>
          <p>
            <Link href="/" className="fw-bold text-muted text-decoration-none">
              Chính sách bảo mật
            </Link>
          </p>
          <p>
            <Link href="/" className="fw-bold text-muted text-decoration-none">
              Thể lệ chương trình Thẻ thành viên
            </Link>
          </p>
        </div>
        <div className="col-4 my-3">
          <p className="fw-bold h-60 ">Theo dõi chúng tôi trên</p>
          <hr />
          <p>
            <BsFacebook className="colorFb me-4" />
            <Link
              href="https://www.facebook.com/"
              className="text-decoration-none text-dark"
            >
              Facebook
            </Link>
          </p>
          <p>
            <BsYoutube className="colorYoutube me-4" />
            <Link
              href="https://www.youtube.com/"
              className="text-decoration-none text-dark"
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
              className="text-decoration-none text-dark"
            >
              Zalo
            </Link>
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <hr />
        </div>
        <div className="col-12">
          <p className="fw-bold text-muted text-center">
            © Copyright 2023 LT99pharmacy.com. All rights reserved.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
