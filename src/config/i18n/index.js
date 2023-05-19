import { createI18n } from "vue-i18n";

const messages = {
  en: {
    createProfile: "Create Profile",
    startJourney: "Start you journey here",
  },
  ka: {
    createProfile: "პროფილის შექმნა",
    startJourney: "დაიწყე შენი მოგზაურობა!",
  },
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
