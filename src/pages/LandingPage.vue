<template>
  <div class="bg-dark-bg h-[106.25rem]">
    <router-view></router-view>
    <div>
      <div>
        <landing-page-navigation-bar></landing-page-navigation-bar>
        <landing-page-header></landing-page-header>
      </div>
    </div>

    <landing-page-card
      id="landing-card"
      :paralax="true"
      class="pt-[12.5rem]"
      quote=" “You have to leave somethig
            behind to go forward”"
      movie="Interstellar, 2014"
      background="bg-[url('@/assets/images/InterstellarBackground.jpg')]"
      :bg="InterstellarBackground"
    ></landing-page-card>

    <landing-page-card
      quote=" “I think we’re just gonna have  
      to be secretly in love with earch other
      and leave it that”"
      movie="The Royal Tenenbaums,2001 "
      background="bg-[url('@/assets/images/TheRoyalTenebaumsBackground.jpg')]"
      :bg="TheRoyalTenebaumsBackground"
    ></landing-page-card>

    <landing-page-card
      quote=" “Death Is Just Another Path, One That We All Must Take.”"
      movie="The Lord Of The Rings,2001 "
      background="bg-[url('@/assets/images/LordOfTheRignsBackground.jpg')]"
      :bg="LordOfTheRignsBackground"
    ></landing-page-card>
  </div>
</template>

<script>
import InterstellarBackground from "@/assets/images/InterstellarBackground.jpg";
import TheRoyalTenebaumsBackground from "@/assets/images/TheRoyalTenebaumsBackground.jpg";
import LordOfTheRignsBackground from "@/assets/images/LordOfTheRignsBackground.jpg";
import LandingPageCard from "@/components/landing-page/LandingPageCard.vue";
import LandingPageNavigationBar from "@/components/landing-page/LandingPageNavigationBar.vue";
import LandingPageHeader from "@/components/landing-page/LandingPageHeader.vue";

export default {
  components: {
    LandingPageCard,
    LandingPageNavigationBar,
    LandingPageHeader,
  },
  setup() {
    return {
      InterstellarBackground,
      TheRoyalTenebaumsBackground,
      LordOfTheRignsBackground,
    };
  },
};
</script>
