import { BaseLayout } from "@components/ui/layout";
import { Web3Provider } from "@components/provider";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </Web3Provider>
  );
}

export default MyApp;
