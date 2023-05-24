const xuLyTenKhiQuaDai = (chuoi) => {
  if (chuoi.length > 40) {
    chuoi = chuoi.slice(0, 35) + "...";
  }
  return chuoi;
};
export const xuLyDiaChiKhiQuaDai = (chuoi) => {
  if (chuoi.length > 40) {
    chuoi = chuoi.slice(0, 30) + "...";
  }
  return chuoi;
};
export function chuyenDoiNgayThangNam(chuoiNgay) {
  // Tách năm, tháng và ngày từ chuỗi đầu vào
  var parts = chuoiNgay.split("-");
  var nam = parts[0];
  var thang = parts[1];
  var ngay = parts[2];

  // Tạo chuỗi ngày-tháng-năm mới
  var ngayThangNamMoi = ngay + "-" + thang + "-" + nam;

  return ngayThangNamMoi;
}
export default xuLyTenKhiQuaDai;
