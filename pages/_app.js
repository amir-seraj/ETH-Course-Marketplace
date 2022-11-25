import "@styles/globals.css";
import { LanguageContext } from "context/multilingualContent";
import { useState } from "react";

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const [language, setLanguage] = useState("english");
  const Layout = Component.Layout ?? Noop;

  function toggleLanguage() {
    setLanguage((language) => (language === "english" ? "arabic" : "english"));
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LanguageContext.Provider>
  );
}

export default MyApp;
