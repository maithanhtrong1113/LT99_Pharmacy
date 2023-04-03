import { Html, Head, Main, NextScript } from "next/document";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Document() {
  const router = useRouter();
  const { pathname } = router;
  const [hasAdminString, setHasAdminString] = useState(false);
  useEffect(() => {
    setHasAdminString(pathname.includes("admin"));
  });
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/x-icon" href="/images/logo.png"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="fb-root" className={hasAdminString ? "invisible" : " "}></div>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.fbAsyncInit = function() {
        FB.init({
          xfbml            : true,
          version          : 'v16.0'
        });
      };
           (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
            `,
          }}
        />

        <div
          className="fb-customerchat"
          attribution="biz_inbox"
          page_id="110305482000429"
        ></div>
      </body>
    </Html>
  );
}
