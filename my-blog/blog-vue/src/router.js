import Vue from "vue";
import Router from "vue-router";
import Manage from "./views/Manage.vue";
import Home from "./views/Home.vue";
import Test from "./views/Test.vue";
import ShowBlogContent from "./views/ShowBlogContent.vue";
import BlogsList from "./views/BlogsList.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/test",
      name: "test",
      component: Test
    },
    {
      path: "/",
      name: "manage",
      component: Manage,
      children: [
        {
          path: "",
          name: "home",
          component: Home
        },
        {
          path: "/showBlogContent",
          name: "showBlogContent",
          component: ShowBlogContent
        },
        {
          path: "/blogsList",
          name: "blogsList",
          component: BlogsList
        }
      ]
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
});
