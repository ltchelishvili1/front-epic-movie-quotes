import { createI18n } from "vue-i18n";

const messages = {
  en: {
    required: "Field is required",
    min: "The name field must be at least 0:{length} characters",
    max: "The name field may not be greater than 0:{length} characters",
    confirmed: "The password should be the same",
    email: "Please use email",
    create_profile: "Create an account",
    start_journey: "Start you journey here",
    name: "Name",
    name_placeholder: "At least 3 & max.15 lower case characters",
    email_or_username_placeholder: "Please use Email or Username",
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
    login_to_profile: "Log in to your account",
    welcome_back: "Welcome back! Please enter your details.",
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
    check_your_email: "  Check your email",
    go_to_email: " Go to my email",
    //UpdateProfilePage
    my_profile: "My Profile",
    upload_new_photo: " Upload new photo",
    edit: "Edit",
    cancel: "Cancel",
    save_changes: "Save Changes",
    edit_profile: "Edit your profile",
    news_feed: "News feed",
    list_of_movies: "List of movies",
    new_username: "New username",
    should_contain: "should contain",
    username: "Username",
    mail: "Email",
    new_password: "New Password",
    new_email: "New Email",
    add_movie: "Add movie",
    my_list_of_movies: "My list of movies",
    search: "search",
    add_quote: "Add quote",
    edit_movie: "Edit movie",
    edit_quote: "Edit quote",
    view_quote: "View quote",
    delete_quote: "Delete quote",
    choose_file: "Choose file",
    drag_and_drop_image: "Drag & drop your image here",
    movie_description: "Movie description",
    quotes_total: "Quotes total",
    director: "Director",
    genres: "Genres",
    total: "Total",
    movie: "Movie",
    write_new_quote: "Write new quote",
    search_by: "Search",
    choose_movie: "Choose movie",
    write_a_comment: "Write a comment",
    log_in_with_google: "Log in with Google",
    show_more: "Show More",
    show_less: "Show Less",
    go_to_my_email: "Go to my email",
    please_check_your_email:
      "Please check your email and follow the instructions to activate your account,",
    commented_to_your_movie_quote: "commented on your quote",
    reacted_to_your_quote: "liked your quote",
    new: "new",
    seconds_ago: "seconds ago",
    minutes_ago: "minutes ago",
    days_ago: "days ago",
    hours_ago: "hours ago",
    months_ago: "months_ago",
    years_ago: "years_ago",
    send: "send",
    are_you_sure_to_make_changes: "Are you sure to make changes?",
    confirm: "confirm",
    changes_updated_sucessfully: "Changes updated successfuly",
    recover_instructions_sent: 'We have sent a password recover instructions to your email,',
    shall_not_pass: 'Shall not pass',
    do_not_have_permission: 'Do not have permission',
    return_home: 'Return home'
  },
  ka: {
    email: "გამოიყენეთ ელ-ფოსტა",
    required: "ველის შევსება აუცილებელია",
    min: "სახელი უნდა შეიცავდეს მინიმუმ 0:{length} სიმბოლოს",
    max: "სახელი არ უნდა შეიცავდეს 0:{length} სიმბოლოზე მეტს",
    confirmed: "პაროლი არ ემთხვევა",
    create_profile: "პროფილის შექმნა",
    start_journey: "დაიწყე შენი მოგზაურობა!",
    name: "სახელი",
    name_placeholder: "სახელი",
    email_or_username_placeholder: "მომხმარებლის სახელი ან ელ-ფოსტა",
    email_placeholder: "ელ-ფოსტის მისამართი",
    password: "პაროლი",
    password_placeholder: "პაროლი",
    confirm_password: "დაადასტურე პაროლი",
    confirm_password_placeholder: "პაროლი",
    remember_me: "დამახსოვრება",
    login_to_profile: "პროფილში შესვლა",
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
    check_your_email: "შეამოწმე მეილი",
    go_to_email: " გადასვლა მეილზე",
    //Updateprofile
    my_profile: "პროფილი",
    upload_new_photo: "ატვირთე ფოტო",
    edit: "შეცვლა",
    cancel: "გაუქმება",
    save_changes: "შენახვა",
    edit_profile: "პროფილის რედაქტირება",
    news_feed: "ნიუს ფიდი",
    list_of_movies: "ჩემი ფილმები",
    new_username: "ახალი მომხმარებელი",
    should_contain: "უნდა შეიცავდეს",
    username: "სახელი",
    mail: "ელ-ფოსტა",
    new_password: "ახალი პაროლი",
    new_email: "ახალი ელ-ფოსტა",
    add_movie: "ფილმის დამატება",
    my_list_of_movies: "ჩემი ფილმები",
    search: "ძებნა",
    add_quote: "დაამატე ფრაზა",
    edit_movie: "ფილმის შეცვლა",
    edit_quote: "ფრაზის შეცვლა",
    view_quote: "ფრაზის ნახვა",
    delete_quote: "ფრაზის წაშლა",
    choose_file: "ფაილის არჩევა",
    drag_and_drop_image: "ჩააგდე ფოტო აქ",
    movie_description: "ფილმის აღწერა",
    quotes_total: "სულ ფრაზები",
    director: "რეჟისორი",
    genres: "ჟანრები",
    total: "სულ",
    movie: "ფილმი",
    write_new_quote: "ახალი ფრაზა",
    search_by: "ძებნა",
    choose_movie: "ფილმის არჩევა",
    write_a_comment: "კომენტარის დაწერა",
    log_in_with_google: "ავტორიზაცია გუგლით",
    show_more: "მეტის ნახვა",
    show_less: "დახურვა",
    go_to_my_email: "მეილზე გადასვლა",
    please_check_your_email: "შეამოწმეთ მეილი და მიყევეით ინსტრუქციებს",
    commented_to_your_movie_quote: "დააკომენტარა თქვენს ფრაზაზე",
    reacted_to_your_quote: "მოიწონა თქენი ფრაზა",
    new: "ახალი",
    seconds_ao: "წამის წინ",
    minutes_ago: "წუთის წინ",
    days_ago: "დღის წინ",
    hours_ago: "საათის წინ",
    months_ago: "თვის წინ",
    years_ago: "წლის წინ",
    send: "გაგზავნა",
    are_you_sure_to_make_changes: "დარწმუნებული ხარ რომ გინდა შეცვლა?",
    confirm: "დადასტურება",
    changes_updated_sucessfully: "წარმატებით შეიცვალა",
    recover_instructions_sent: 'პაროლის აღდგენის ინსტრუქცია გაიგზავნა ელ-ფოსტაზე',
    shall_not_pass: 'შესვლა აკრძალულია',
    do_not_have_permission: 'არ გაქვთ ამ გვერდის გამოყენების უფლება',
    return_home: 'დაბრუნება'

  },
};

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  legacy: false,
  messages,
});

export default i18n;
