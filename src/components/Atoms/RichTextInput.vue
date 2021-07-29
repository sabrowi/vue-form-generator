<template>
  <ValidationProvider tag="div" :name="name" :rules="rules" v-slot="{ errors }">
    <c-form-control :is-invalid="errors.length > 0">
      <c-form-label>{{ label }}</c-form-label>
      <quill-editor
        ref="myQuillEditor"
        v-model="content"
        :options="editorOption"
      />
      <c-form-helper-text v-show="helperText">{{
        helperText
      }}</c-form-helper-text>
      <c-form-error-message>{{ errors[0] }}</c-form-error-message>
    </c-form-control>
  </ValidationProvider>
</template>

<style global>
.ql-editor {
  min-height: 100px;
}
</style>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

import {
  CFormControl,
  CFormLabel,
  CFormErrorMessage,
  CFormHelperText,
} from "@chakra-ui/vue";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline"],
    ["link"],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "bullet" }],
    [{ align: [] }],
  ],
};

export default {
  name: "RichTextInput",
  data() {
    return {
      // content: "<h2>I am Example</h2>",
      editorOption: {
        // Some Quill options...
        modules: modules,
        placeholder: this.placeholder,
      },
    };
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
  components: {
    quillEditor,
    CFormControl,
    CFormLabel,
    CFormErrorMessage,
    CFormHelperText,
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    content: {
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
