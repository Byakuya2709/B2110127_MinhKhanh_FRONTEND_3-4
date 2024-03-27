<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>
    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>
      <ContactList
        v-if="filteredContacts.length > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />

      <p v-else>Không có liên hệ nào.</p>
      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fas fa-redo"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <ContactCard :contact="activeContact" />
        <router-link
          :to="{
            name: 'contact.edit',
            params: { id: activeContact._id },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Hiệu chỉnh</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ContactCard from "../components/ContactCard.vue";
import InputSearch from "../components/InputSearch.vue";
import ContactList from "../components/ContactList.vue";
import ContactService from "../services/contact.service";

export default {
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },
  computed: {
    activeContact() {
      if (
        this.activeIndex < 0 ||
        this.activeIndex >= this.filteredContacts.length
      )
        return null;
      return this.filteredContacts[this.activeIndex];
    },
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((contact) =>
        this.contactString(contact).includes(this.searchText)
      );
    },
  },
  methods: {
    contactString(contact) {
      const { name, email, address, phone } = contact;
      return [name, email, address, phone].join("");
    },
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (err) {
        console.log(err);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    async removeAllContacts() {
      if (confirm("Bạn có muốn xóa tất cả Liên Hệ")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (err) {
          console.log(err);
        }
      }
    },
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>
