import DefaultLayout from "../components/layout/default-layout";
import "../styles/globals/index.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
};

export default MyApp;
