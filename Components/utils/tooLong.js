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
export default xuLyTenKhiQuaDai;
