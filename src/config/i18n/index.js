import { createI18n } from "vue-i18n";

const messages = {
  en: {
    create_profile: "Create an account",
    start_journey: "Start you journey here",
    name: "Name",
    name_placeholder: "At least 3 & max.15 lower case characters",
    email: "Email",
    email_placeholder: "Enter your email",
    password: "Password",
    password_placeholder: "At least 8 & max.15 lower case characters",
    confirm_password: "Confirm password",
    confirm_password_placeholder: "Confirm password",
    remember_me: 'Rememeber me',
    // landing
    movie_quotes: "Movie Quotes",
    sign_up: "Sign Up",
    log_in: "Log In",
    get_started: "Get Started",
    sign_up_with_google: "Sign Up With Google",
    find_any_quote: "Find any quote in",
    from_million_movies: "millions of movie lines",
    log_out: "Log out",
    already_have_an_account: 'Already have an account?',
    not_have_an_account: 'Do not have an account?'

  },
  ka: {
    create_profile: "პროფილის შექმნა",
    start_journey: "დაიწყე შენი მოგზაურობა!",
    name: "სახელი",
    name_placeholder: "სახელი",
    email: "ელ-ფოსტა",
    email_placeholder: "ელ-ფოსტის მისამართი",
    password: "პაროლი",
    password_placeholder: "პაროლი",
    confirm_password: "დაადასტურე პაროლი",
    confirm_password_placeholder: "პაროლი",
    remember_me: 'დამახსოვრება',
    // landing
    movie_quotes: "ფრაზები ფილმებიდან",
    sign_up: "რეგისტრაცია",
    log_in: "შესვლა",
    get_started: "დაწყება",
    sign_up_with_google: "ავტორიზაცია გუგლით",
    find_any_quote: "იპოვე ნებისმიერი ფრაზა",
    from_million_movies: "უამრავი ფილმიდან",
    log_out: "გასვლა",
    already_have_an_account: 'უკვე გაქვს ანგარიში?',
    not_have_an_account: 'უკვე გაქვს ანგარიში?',
  },
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy: false,
  messages,
});

export default i18n;
