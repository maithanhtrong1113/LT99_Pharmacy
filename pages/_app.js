import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import { Provider, useSelector } from "react-redux";
import store from "../store/store";

import { persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import Head from "next/head";
export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <Head>
        <title>LT99 Pharmacy</title>
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  );
}
