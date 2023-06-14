import { configure,  } from "vee-validate";
import { localize,  } from "@vee-validate/i18n";

configure({
  generateMessage: localize({
    en: {
      messages: {
        required: "Field is required",
        min: "The name field must be at least 0:{length} characters",
        max: "The name field may not be greater than 0:{length} characters",
        confirmed: "The password should be the same",
        email: 'Please use email',
        lcase: 'Please use lowercase charachters',
        geo: 'Please use gerogian charachters'
      },
    },
    ka: {
      messages: {
        required: "ველის შევსება აუცილებელია",
        min: "სახელი უნდა შეიცავდეს მინიმუმ 0:{length} სიმბოლოს",
        max: "სახელი არ უნდა შეიცავდეს 0:{length} სიმბოლოზე მეტს",
        confirmed: "პაროლი არ ემთხვევა",
        email: 'გამოიყენეთ ელ-ფოსტა',
        lcase: 'გამოიყენე პატარა ასოები',
        geo: 'გამოიყენე ქართული ასოები'
      },
    },
  }),
});
