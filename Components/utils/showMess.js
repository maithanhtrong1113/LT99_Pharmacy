import { useRouter } from "next/router";

const NotShowMess = () => {
  const router = useRouter();
  const fbRoot = document.getElementById("fb-root");
  if (router.pathname.includes("admin")) {
    fbRoot.className = " fb_reset invisible";
  } else {
    fbRoot.className = " fb_reset";
  }
};
export default NotShowMess;
