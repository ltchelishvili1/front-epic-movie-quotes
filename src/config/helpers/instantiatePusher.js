import Echo from "laravel-echo";
import Pusher from "pusher-js";
import axios from "@/config/axios/index";
import {useUserStore} from '@/stores/user/index'

export default function instantiatePusher() {

const userStore =useUserStore()

  Pusher.Runtime.createXHR = function () {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    return xhr;
  };

  window.Pusher = Pusher;
  window.Echo = new Echo({
    authEndpoint: `${import.meta.env.VITE_API_BASE_URL}broadcasting/auth`,
    broadcaster: "pusher",
    key: import.meta.env.VITE_PUSHER_KEY,
    forceTLS: true,
    cluster: ["eu"],
    authorizer: (channel) => {
      return {
        authorize: (socketId, callback) => {
          axios
          .post('broadcasting/auth',
              {
                socket_id: socketId,
                channel_name: `private-feedback-${userStore.getUser.id}`,
              }
            )
            .then((response) => {
              callback(false, response.data);
            })
            .catch((error) => {
              callback(true, error);
            });
        },
      };
    },
  });

  return true;
}
