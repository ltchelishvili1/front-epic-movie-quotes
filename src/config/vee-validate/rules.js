import { defineRule } from "vee-validate";
import { confirmed, required, min, max, email } from "@vee-validate/rules";

defineRule("confirmed", confirmed);

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);
defineRule("email", email);

defineRule("lcase", (value) => {
  if (!value || !value.length) {
    return true;
  }

  if (/^[a-z0-9 ]+$/i.test(value)) {
    return true;
  } else {
    return false;
  }
  
});

defineRule("geo", (value) => {
  if (!value || !value.length) {
    return true;
  }
  if (/^[0-9ა-ჰ.,!?\s]*$/gi.test(value)) {
    return true;
  } else {
    return false;
  }
});

