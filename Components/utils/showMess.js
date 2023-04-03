import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const showMess = () => {
  const router = useRouter();
  const { pathname } = router;
  const [hasAdminString, setHasAmdminString] = useState(false);

  useEffect(() => {
    setHasAmdminString(pathname.includes("admin"));
    const fbRoot = document.getElementById("fb-root");

    if (hasAdminString) fbRoot.classList.add("invisible");
    else {
      fbRoot.className = " ";
    }
  }, [router]);
  return hasAdminString;
};
export default showMess;
