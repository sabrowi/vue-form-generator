<template>
  <layout withoutHeader>
    <c-box
      mb="4"
      v-show="!activeForm"
      d="flex"
      justifyContent="center"
      alignItems="center"
    >
      <c-heading size="xl"> List Form </c-heading>
    </c-box>
    <c-box
      mb="4"
      v-show="activeForm"
      d="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <c-heading size="lg"> Show Form </c-heading>
      <c-button @click="backToList" bg="red.500" color="white">Back</c-button>
    </c-box>
    <c-stack v-if="list.length && !activeForm">
      <c-box
        p="4"
        bg="white"
        rounded="lg"
        boxShadow="sm"
        justifyContent="space-between"
        alignItems="center"
        d="flex"
        v-for="(item, index) in list"
        :key="item.id"
      >
        <span>{{ item.title }}</span>
        <c-stack is-inline>
          <c-icon-button
            @click="openForm(index)"
            aria-label="View"
            title="View"
            icon="eye"
          />
        </c-stack>
      </c-box>
    </c-stack>
    <c-stack
      v-show="!list.length && !loading"
      align="center"
      h="250px"
      justifyContent="center"
    >
      <c-icon size="32px" name="folder-open" color="gray.400" />
      <c-text color="gray.400">Empty data...</c-text>
    </c-stack>
    <c-flex v-show="loading" align="center" justify="center" h="250px">
      <c-spinner color="cyan.700" size="32px" />
    </c-flex>
    <form-preview v-if="activeForm" :form="activeForm" />
  </layout>
</template>

<script>
import { CStack, CBox, CIconButton, CHeading } from "@chakra-ui/vue";
import Layout from "@/components/Templates/Layout";
import firebase from "../plugins/firebase";
import FormPreview from "@/components/Organisms/FormPreview";

const db = firebase.firestore();

export default {
  name: "Home",
  data: function () {
    return {
      list: [],
      activeForm: null,
      loading: false,
    };
  },
  components: {
    CStack,
    CBox,
    CIconButton,
    CHeading,
    Layout,
    FormPreview,
  },
  methods: {
    listForm: async function () {
      this.loading = true;
      const formsRef = db.collection("forms");
      const snapshots = await formsRef.get();
      const data = [];
      snapshots.forEach((doc) => {
        // const { title } = doc.data();
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      this.list = data;
      this.loading = false;
    },
    openForm: async function (index) {
      this.activeForm = this.list[index];
    },
    backToList: function () {
      this.activeForm = null;
      this.listForm();
    },
  },
  mounted: async function () {
    await this.listForm();
  },
};
</script>
