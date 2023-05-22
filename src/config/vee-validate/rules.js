import { defineRule } from "vee-validate";
import { confirmed ,required,min,max} from "@vee-validate/rules";

defineRule("confirmed", confirmed);

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);

defineRule("email", (value) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (!value || !regex.test(value)) {
    return "შეიყვანეთ ელ-ფოსტა";
  }

  return true;
});
