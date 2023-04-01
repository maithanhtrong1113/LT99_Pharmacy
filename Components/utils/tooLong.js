const xuLyTenKhiQuaDai = (chuoi) => {
  if (chuoi.length > 40) {
    chuoi = chuoi.slice(0, 40) + "...";
  }
  return chuoi;
};
export default xuLyTenKhiQuaDai;
