<template>
  <c-form-control pb="4">
    <c-form-label>{{ label }}</c-form-label>
    <c-flex
      wrap="wrap"
      is-inline
      border="1px solid"
      borderColor="gray.200"
      rounded="md"
      pb="1"
      pr="1"
    >
      <c-tag ml="1" mt="1" v-for="(item, index) in value" :key="index">
        <c-tag-label>{{ item }}</c-tag-label>
        <c-tag-close-button ml="2" @click="removeOption(index)" type="button" />
      </c-tag>
      <c-input
        min-w="5rem"
        px="2"
        class="text-input"
        flex="1"
        v-model="inputVal"
        @keypress.enter="addOption"
        @keypress.44="addOption"
      />
    </c-flex>
    <c-form-error-message>{{ error }}</c-form-error-message>
    <c-form-helper-text v-if="helper">{{ helper }}</c-form-helper-text>
  </c-form-control>
</template>

<style scoped>
.text-input {
  border: none !important;
}
.text-input:focus {
  border: none !important;
  outline: none;
  box-shadow: none;
}
</style>

<script>
import {
  CTag,
  CFormControl,
  CFormErrorMessage,
  CFormHelperText,
  CInput,
  // CButton,
  // CStack,
  CFormLabel,
  CTagCloseButton,
  CTagLabel,
  CFlex,
} from "@chakra-ui/vue";

export default {
  name: "OptionsInput",
  data: function () {
    return {
      error: false,
      inputVal: "",
      options: [],
    };
  },
  props: {
    label: String,
    helper: String,
    value: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    CTag,
    CFormControl,
    CFormErrorMessage,
    CFormHelperText,
    CInput,
    // CButton,
    // CStack,
    CFormLabel,
    CTagCloseButton,
    CTagLabel,
    CFlex,
  },
  methods: {
    addOption: function (e) {
      e.preventDefault();
      if (this.inputVal === "") return;
      const options = [...this.value, this.inputVal];
      this.inputVal = "";
      this.$emit("input", options);
      return options;
    },
    removeOption: function (index) {
      const options = [...this.value];
      options.splice(index, 1);
      this.$emit("input", options);
      return options;
    },
  },
};
</script>
