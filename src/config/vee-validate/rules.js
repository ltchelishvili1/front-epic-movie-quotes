import { defineRule } from "vee-validate";
import { confirmed ,required,min,max, email} from "@vee-validate/rules";

defineRule("confirmed", confirmed);

defineRule("required", required);
defineRule("min", min);
defineRule("max", max);
defineRule("confirmed", confirmed);
defineRule('email', email)
