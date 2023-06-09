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


export const authUser =async (userStore) => {
  if (userStore.authenticated === null ) {
    try {
      const response = await axios.get("user");
      userStore.authenticated = true;
      userStore.setUser(response.data.user);
    } catch (err) {
      userStore.authenticated = false;
    }
  }
}



