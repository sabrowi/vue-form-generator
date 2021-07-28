<template>
  <c-box w="100%" minH="100vh" position="relative" pb="6">
    <c-box
      d="flex"
      justifyContent="space-between"
      alignItems="center"
      p="3"
      bg="cyan.800"
      v-if="!withoutHeader"
    >
      <c-heading size="lg" color="white">Administrator Panel</c-heading>
      <!-- <c-button>Logout</c-button> -->
      <c-icon-button
        @click="logout"
        aria-label="Sign Out"
        title="Sign Out"
        icon="sign-out-alt"
      />
    </c-box>

    <c-box maxW="960px" margin="auto" py="10">
      <slot></slot>
    </c-box>
    <c-box align="center" p="4" position="absolute" w="full" bottom="0">
      <c-text>
        &copy; 2021 <c-text as="span" mx="2">🥷</c-text>
        <c-link href="https://sabrowi.com/" is-external>
          sabrowi.com</c-link
        ></c-text
      >
    </c-box>
  </c-box>
</template>

<script>
import { CBox, CIconButton, CLink, CText } from "@chakra-ui/vue";
import { mapActions } from "vuex";

export default {
  name: "Layout",
  props: {
    withoutHeader: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    CBox,
    CIconButton,
    CLink,
    CText,
  },
  methods: {
    ...mapActions("auth", ["logout"]),
  },
};
</script>
