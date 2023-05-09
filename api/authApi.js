import { toast } from "react-toastify";

export const Login = async (data) => {
  const response = await fetch(`http://localhost:8080/QLNT-Server/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: data.username,
      password: data.password,
    }),
  });
  if (response.ok) {
    const res = await response.json();
    return res;
  } else {
    toast.error("Thông tin đăng nhập không hợp lệ", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
      theme: "light",
    });
    return {};
  }
};
