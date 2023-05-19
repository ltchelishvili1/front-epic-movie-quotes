<template>
  <div class="popup">
    <h1>{{ $t("createProfile") }}</h1>
    <p>{{ $t("startJourney") }}</p>
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
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const closePopup = () => {
      router.back();
    };

    return {};
  },
};
</script>
