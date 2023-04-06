export function kiemTraSoDienThoai(soDienThoai) {
  const re = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/; // Biểu thức chính quy để kiểm tra số điện thoại
  return re.test(soDienThoai);
}
