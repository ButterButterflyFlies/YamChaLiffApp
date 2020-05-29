import Vue from 'vue'
import Router from 'vue-router'
// import AddItem from "../components/UpdateOrderComponents/UpdateOrderPage.vue";
import UpdateOrder from "../components/UpdateOrder.vue";
import Menu from "../components/Menu.vue";

Vue.use(Router)
export default new Router({
  mode: "history",
  routes: [
    {
      path: "/product",
      name: "product",
      component: UpdateOrder
    },
    {
      path: "/menu",
      name: "menu",
      component: Menu
    }
  ]
});