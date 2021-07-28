<template>
  <c-box
    w="100vw"
    h="100vh"
    bg="gray.100"
    display="flex"
    justifyContent="center"
    alignItems="center"
  >
    <c-box
      bg="white"
      borderRadius="0.5rem"
      border="1px"
      borderColor="gray.300"
      padding="2rem"
      w="350px"
    >
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <c-heading size="lg" align="center" mb="6">LOGIN</c-heading>
          <c-stack>
            <c-box>
              <text-input
                name="email"
                label="Email"
                v-model="form.email"
                rules="required|email"
              />
            </c-box>
            <c-box>
              <text-input
                name="password"
                label="Password"
                v-model="form.password"
                rules="required"
                type="password"
              />
            </c-box>
            <c-button :is-loading="loading" type="submit" w="100%"
              >Login</c-button
            >
          </c-stack>
        </form>
      </ValidationObserver>
    </c-box>
  </c-box>
</template>

<script>
import { mapActions } from "vuex";
import { CBox, CButton, CHeading, CStack } from "@chakra-ui/vue";
import TextInput from "@/components/Atoms/TextInput";

export default {
  name: "Login",
  components: {
    CBox,
    CButton,
    CHeading,
    CStack,
    TextInput,
  },
  data: function () {
    return {
      form: {
        email: "",
        password: "",
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    onSubmit: async function () {
      try {
        this.loading = true;
        await this.login(this.form);
        this.loading = false;
        this.$router.push("/list-form");
      } catch (error) {
        this.loading = false;
        this.$toast({
          title: "Error!",
          description: error.message,
          status: "error",
          duration: 5000,
        });
      }
    },
  },
};
</script>
