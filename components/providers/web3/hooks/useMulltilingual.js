import { useContext } from "react";
import { LanguageContext } from "@context/multilingualContent";
import { translations } from "@context/translations.js";

export default function MultiLingualContent({ contentID }) {
  const { language } = useContext(LanguageContext);

  return translations[language][contentID];
}
