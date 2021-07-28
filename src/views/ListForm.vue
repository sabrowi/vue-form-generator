<template>
  <layout>
    <c-box mb="4" d="flex" justifyContent="space-between" alignItems="center">
      <c-heading size="lg"> List Form </c-heading>
      <c-button @click="newForm" bg="blue.600" color="white">Add New</c-button>
    </c-box>
    <c-stack v-if="list.length">
      <c-box
        p="4"
        bg="white"
        rounded="lg"
        boxShadow="sm"
        justifyContent="space-between"
        alignItems="center"
        d="flex"
        v-for="item in list"
        :key="item.id"
      >
        <span>{{ item.title }}</span>
        <c-stack is-inline>
          <c-icon-button
            @click="editForm(item.id)"
            aria-label="Edit"
            title="Edit"
            icon="edit"
          />
          <c-icon-button
            @click="openDialog(item.id)"
            aria-label="Delete"
            title="Delete"
            icon="trash"
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
    <c-alert-dialog
      :is-open="isOpen"
      :least-destructive-ref="$refs.cancelRef"
      :on-close="closeDialog"
    >
      <c-alert-dialog-overlay />
      <c-alert-dialog-content>
        <c-alert-dialog-header font-size="lg" font-weight="bold">
          Delete Form
        </c-alert-dialog-header>
        <c-alert-dialog-body>
          Are you sure? You can't undo this action afterwards.
        </c-alert-dialog-body>
        <c-alert-dialog-footer>
          <c-button ref="cancelRef" @click="closeDialog"> Cancel </c-button>
          <c-button
            :isLoading="loadingDelete"
            variantColor="red"
            @click="deleteForm"
            ml="3"
          >
            Delete
          </c-button>
        </c-alert-dialog-footer>
      </c-alert-dialog-content>
    </c-alert-dialog>
  </layout>
</template>

<script>
import {
  CStack,
  CBox,
  CHeading,
  CIconButton,
  CIcon,
  CText,
  CSpinner,
  CFlex,
  CAlertDialog,
  CAlertDialogHeader,
  CAlertDialogBody,
  CAlertDialogFooter,
  CAlertDialogOverlay,
  CAlertDialogContent,
} from "@chakra-ui/vue";
import Layout from "@/components/Templates/Layout";
import firebase from "../plugins/firebase";

const db = firebase.firestore();

export default {
  name: "ListForm",
  components: {
    CStack,
    CBox,
    CHeading,
    CIconButton,
    Layout,
    CIcon,
    CText,
    CSpinner,
    CFlex,
    CAlertDialog,
    CAlertDialogHeader,
    CAlertDialogBody,
    CAlertDialogFooter,
    CAlertDialogOverlay,
    CAlertDialogContent,
  },
  data: function () {
    return {
      list: [],
      loading: false,
      loadingDelete: false,
      isOpen: false,
      activeId: null,
    };
  },
  methods: {
    newForm: function () {
      this.$router.push("/list-form/new");
    },
    editForm: function (id) {
      this.$router.push(`/list-form/${id}`);
    },
    closeDialog: function () {
      this.isOpen = false;
      this.activeId = null;
    },
    openDialog: function (id) {
      this.isOpen = true;
      this.activeId = id;
    },
    deleteForm: async function () {
      try {
        this.loadingDelete = true;
        const formsRef = db.collection("forms").doc(this.activeId);
        await formsRef.delete();
        this.activeId = null;
        this.loadingDelete = false;
        this.closeDialog();
        this.$toast({
          title: "Success",
          description: "Form has been deleted.",
          status: "success",
          duration: 5000,
        });
        await this.listForm();
      } catch (error) {
        this.loadingDelete = false;
        this.activeId = null;
        this.$toast({
          title: "Error!",
          description: error.message,
          status: "error",
          duration: 5000,
        });
      }
    },
    listForm: async function () {
      this.loading = true;
      const formsRef = db.collection("forms");
      const snapshots = await formsRef.get();
      const data = [];
      snapshots.forEach((doc) => {
        const { title } = doc.data();
        data.push({
          id: doc.id,
          title,
        });
      });
      this.list = data;
      this.loading = false;
    },
  },
  mounted: async function () {
    await this.listForm();
  },
};
</script>
