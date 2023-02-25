// ES6 module syntax
import LocalizedStrings from "react-native-localization";

export let strings = new LocalizedStrings({
  "en-US": {
    how: "How do you want your egg today?",
    boiledEgg: "Boiled egg",
    softBoiledEgg: "Soft-boiled egg",
    choice: "How to choose the egg",
  },
  en: {
    camera: "Camera",
    history: "History",
    settings: "Settings",
  },
  ru: {
    camera: "Камера",
    history: "История",
    settings: "Настройки",
  },
  kz: {
    camera: "Камера",
    history: "Тарих",
    settings: "Реттеулер",
  },
});
