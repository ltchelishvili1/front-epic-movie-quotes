<template>
  <div
    class="fixed top-0 left-0 w-[100vw] h-[100vh] backdrop-blur-[3px] bg-[rgba(0,0,0,0.24)] z-50"
  >
    <div
      class="py-[53px] w-[600px] px-[120px] flex flex-col items-center justify-center fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-[#222030]"
    >
      <h1 class="text-white font-medium text-[32px]">
        {{ $t("createProfile") }}
      </h1>
      <p class="text-[#6C757D] pb-[23px]">{{ $t("startJourney") }}</p>

      <base-input
        :title="$t('name')"
        name="username"
        :placeholder="$t('namePlaceholder')"
      ></base-input>

      <base-input
        :title="$t('email')"
        name="email"
        :placeholder="$t('emailPlaceholder')"
        type="email"
      ></base-input>

      <base-input
        :title="$t('password')"
        name="password"
        :placeholder="$t('passwordPlaceholder')"
      ></base-input>
      <base-input
        :title="$t('confirmPassword')"
        name="confirm_password"
        :placeholder="$t('confirmPasswordPlaceholder')"
      ></base-input>

      <div class="locale-changer">
        <select v-model="$i18n.locale">
          <option
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            :value="locale"
          >
            {{ locale }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import BaseInput from "@/components/UI/inputs/BaseInput.vue";

export default {
  components: { BaseInput },
  setup() {
    const router = useRouter();

    const closePopup = () => {
      router.back();
    };

    return {};
  },
};
</script>
