const showMess = (router) => {
  const hasAdminString = router.pathname.includes("admin");
  const fbRoot = document.getElementById("fb-root");

  if (hasAdminString) fbRoot.className = " fb_reset invisible";
  else {
    fbRoot.className = " fb_reset";
  }
};
export default showMess;
