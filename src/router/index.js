import { createWebHistory, createRouter } from "vue-router";
import ContactBook from "../view/ContactBook.vue";
const routes = [
  {
    path: "/",
    name: "contactbook",
    component: ContactBook,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("../view/NotFound.vue"),
  },
  {
    path: "/new",
    name: "contact.add",
    component: () => import("../view/ContactCreate.vue"),
  },
  {
    path: "/contacts/:id",
    name: "contact.edit",
    component: () => import("../view/ContactEdit.vue"),
    props: true
  },

];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
