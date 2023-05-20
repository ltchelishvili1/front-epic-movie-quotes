import { createI18n } from "vue-i18n";

const messages = {
  en: {
    createProfile: "Create an account",
    startJourney: "Start you journey here",
    name: "Name",
    namePlaceholder: "At least 3 & max.15 lower case characters",
    email: "Email",
    emailPlaceholder: "Enter your email",
    password: "Password",
    passwordPlaceholder: "At least 8 & max.15 lower case characters",
    confirmPassword: "Confirm password",
    confirmPasswordPlaceholder: "Confirm password",
  },
  ka: {
    createProfile: "პროფილის შექმნა",
    startJourney: "დაიწყე შენი მოგზაურობა!",
    name: "სახელი",
    namePlaceholder: "მინიმუმ 3 მაქსიმუმ 15 ასო",
    email: "ელ-ფოსტა",
    emailPlaceholder: "შეიყვანე ელ-ფოსტა",
    password: "პაროლი",
    passwordPlaceholder: "მინიმუმ 8 მაქსიმუმ 15 ასო",
    confirmPassword: "დაადასტურე პაროლი",
    confirmPasswordPlaceholder: "დაადასტურე პაროლი",
  },
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
});

export default i18n;
