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
    remember_me: "Rememeber me",
    // landing
    movie_quotes: "Movie Quotes",
    sign_up: "Sign Up",
    log_in: "Log In",
    get_started: "Get Started",
    sign_up_with_google: "Sign Up With Google",
    find_any_quote: "Find any quote in",
    from_million_movies: "millions of movie lines",
    log_out: "Log out",
    already_have_an_account: "Already have an account?",
    not_have_an_account: "Do not have an account?",
    forgot_password: "Forgot Password?",
    login_to_profile: 'Log in to your account',
    welcome_back: 'Welcome back! Please enter your details.',
    // reset-password-request-modal
    enter_email:
      "Enter the email and we’ll send an email with instructions to reset your password",
    send_insturctions: "Send instructions",
    back_to_login: "Back to log in",
    //update-password-modal
    create_new_password: "Create new password",
    password_must_be_different:
      "Your new password must be different from previous used passwords",
    reset_password: "Reset Password",
    // UpdatePasswordSuccessModal
    success: "Success!",
    password_changed_successfully: "Your Password changed successfully",
    //AccountActivatedModal
    thank_you: "Thank you!",
    activated: "Your account has been activated.",
    go_to_news_feed: "  Go to my news feed",
    // EmailSendModal
    check_you_email: "  Check your email",
    go_to_email: " Go to my email",
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
    remember_me: "დამახსოვრება",
    login_to_profile: 'პროფილში შესვლა',
    welcome_back: "გთხოვთ შეიყვანოთ თქვენი დეტალები.",
    // landing
    movie_quotes: "ფრაზები ფილმებიდან",
    sign_up: "რეგისტრაცია",
    log_in: "შესვლა",
    get_started: "დაწყება",
    sign_up_with_google: "ავტორიზაცია გუგლით",
    find_any_quote: "იპოვე ნებისმიერი ფრაზა",
    from_million_movies: "უამრავი ფილმიდან",
    log_out: "გასვლა",
    already_have_an_account: "უკვე გაქვს ანგარიში?",
    not_have_an_account: "უკვე გაქვს ანგარიში?",
    forgot_password: "დაგავიწყდა ",
    // reset-password-request-modal
    enter_email: "შეიყვანე ელ-ფოსტა და გამოგიგზავნით ინსტრუქციებს",
    send_insturctions: "ინსტრუქციების მიღება",
    back_to_login: "ლოგინის გვერდზე დაბრუნება",
    //update-password-modal
    create_new_password: "შეიყვანე ახალი პაროლი",
    password_must_be_different:
      "ახალი პაროლი განსხვავებული უნდა იყოს აქამდე გამოყენებული პაროლებისგან",
    reset_password: "პაროლის შეცვლა",
    // UpdatePasswordSuccessModal
    success: "გილოცავ!",
    password_changed_successfully: "პაროლი წარმატებით შეიცვალა",
    //AccountActivatedModal
    thank_you: "მადლობა!",
    activated: "ექაუნთი გააქტიურებულია.",
    go_to_news_feed: "გადასვლა მთავარზე",
    // EmailSendModal
    check_you_email: "შეამოწმე მეილი",
    go_to_email: " გადასვლა მეილზე",
  },
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy: false,
  messages,
});

export default i18n;
