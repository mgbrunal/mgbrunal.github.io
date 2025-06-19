import enFile from "./en.json";
import esFile from "./es.json";

export type InternationalizationFile = {
  click: string;
  index: {
    position: string;
    basic: {
      languages: string;
      english: string;
      englishSub: string;
      spanish: string;
      spanishSub: string;
      location: string;
    };
    experience: {
      years: string;
      since: string;
      description: string;
    };
    skills: {
      title: string;
    };
  };
};

const getLanguageFile = (lang: "es" | "en") =>
  (lang === "es" ? esFile : enFile) as InternationalizationFile;

export default getLanguageFile;
