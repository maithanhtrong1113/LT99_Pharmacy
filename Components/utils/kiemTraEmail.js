export function kiemTraEmail(chuoi) {
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(chuoi);
}
