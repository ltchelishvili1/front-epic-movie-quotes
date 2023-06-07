import axios from "@/config/axios/index";

export const handleGoogleAuth = async () => {
  try {
    const response = await axios.get("/auth/google");
    await axios.get("sanctum/csrf-cookie");
    window.location.replace(response.data);
  } catch (error) {
    errorMessage.value = "Something went wrong, try again later!";
  }
};
