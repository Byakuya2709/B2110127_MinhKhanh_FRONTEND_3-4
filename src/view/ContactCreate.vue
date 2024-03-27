<template>
    <div class="page">
      <h4>Thêm mới Liên hệ</h4>
      <ContactForm :contact="contact" @submit:contact="createContact" />
      <p v-if="message">{{ message }}</p>
    </div>
  </template>
  
  <script>
import ContactForm from "../components/ContactForm.vue";
  import ContactService from "../services/contact.service";
  
  export default {
    components: {
      ContactForm,
    },
    data() {
      return {
        contact: {
          name: "",
          email: "",
          address: "",
          phone: "",
          favorite: false,
        },
        message: "",
      };
    },
    methods: {
      async createContact(data) {
        try {
          await ContactService.create(data);
          this.message = "Liên hệ được tạo mới thành công.";
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
  </script>
  