import Link from "next/link";
import { Fragment } from "react";

const ContentLichSuDonHang = () => {
  return (
    <Fragment>
      <div className="container-fluid my-10">
        <div className="row">
          <div className="col-xl-12 col-lg-12">
            <nav aria-label="breadcrumb ">
              <ol className="breadcrumb ">
                <li className="breadcrumb-item">
                  <Link href="/" className="text-muted text-decoration-none">
                    Trang chủ
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link
                    href="/donHang"
                    className="text-info text-decoration-none"
                  >
                    Đơn hàng của bạn
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ContentLichSuDonHang;
