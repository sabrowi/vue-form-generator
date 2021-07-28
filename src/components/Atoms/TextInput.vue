<template>
  <ValidationProvider tag="div" :name="name" :rules="rules" v-slot="{ errors }">
    <c-form-control :is-invalid="errors.length > 0">
      <c-form-label>{{ label }}</c-form-label>
      <c-input v-model="inputVal" :type="type" :placeholder="placeholder" />
      <c-form-helper-text v-show="helperText">{{
        helperText
      }}</c-form-helper-text>
      <c-form-error-message>{{ errors[0] }}</c-form-error-message>
    </c-form-control>
  </ValidationProvider>
</template>

<script>
import {
  CInput,
  CFormControl,
  CFormLabel,
  CFormErrorMessage,
  CFormHelperText,
} from "@chakra-ui/vue";
export default {
  name: "TextInput",
  components: {
    CInput,
    CFormControl,
    CFormLabel,
    CFormErrorMessage,
    CFormHelperText,
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    rules: String,
    label: String,
    type: String,
    value: String,
    placeholder: String,
    helperText: String,
  },
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
};
</script>
