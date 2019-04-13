<template>
  <div>
    <v-list dense>
      <template v-for="item in items">
        <v-layout v-if="item.heading" :key="item.heading" row align-center>
          <v-flex xs6>
            <v-subheader v-if="item.heading">{{ item.heading }}</v-subheader>
          </v-flex>
          <v-flex xs6 class="text-xs-center">
            <a href="#!" class="body-2 black--text">EDIT</a>
          </v-flex>
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.text }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile v-for="(child, i) in item.children" :key="i">
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title class="choose" @click="handleClick(child.event)">{{ child.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :key="item.text">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="choose" @click="handleClick(item.event)">{{ item.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      items: [
        { icon: "home", text: "主页", event: "home" },
        {
          icon: "keyboard_arrow_up",
          "icon-alt": "keyboard_arrow_down",
          text: "个人中心",
          model: true,
          children: [
            { text: "我的收藏", event: "collect" },
            { text: "我的喜欢", event: "like" },
            { text: "我的博客", event: "mine" }
          ]
        },
        { icon: "edit", text: "写博客", event: "write" },
        {
          icon: "settings",
          "icon-alt": "settings",
          text: "设置",
          model: false,
          children: [
            { text: "登录", event: "login" },
            { text: "注册", event: "register" },
            { text: "注销", event: "logOff" }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapState([
      "loginDialogOn",
      "registerDialogOn",
      "writeDialogOn",
      "curUser",
      "pagination"
    ])
  },
  methods: {
    handleClick(data) {
      switch (data) {
        case "login":
          if (this.curUser.name) {
            alert("您已登录！");
          } else {
            this.setLoginDialogOn();
          }
          break;
        case "register":
          this.setRegisterDialogOn();
          break;
        case "write":
          this.write();
          break;
        case "home":
          this.$router.push("/");
          break;
        case "logOff":
          if (!this.curUser.name) {
            alert("您未登录！");
          } else {
            axios({
              method: "get",
              url: "/users/removeSession"
            }).then(() => {
              this.setCurUser();
              this.setShowBlogs();
              this.$router.push("/");
            });
          }
          break;
        default:
          if (this.curUser.name) {
            this.setBlogsList({ type: data });
            this.$router.push("/blogsList");
          } else {
            this.setLoginDialogOn();
          }
      }
    },
    write() {
      if (this.curUser.name) {
        this.setWriteDialogOn();
        this.setIsEditBlog(false);
      } else {
        this.setLoginDialogOn();
      }
    },
    ...mapMutations([
      "setLoginDialogOn",
      "setRegisterDialogOn",
      "setWriteDialogOn",
      "setShowBlogs"
    ]),
    ...mapMutations(["setIsEditBlog"]),
    ...mapActions(["setCurUser", "setBlogsList"])
  }
};
</script>

<style scoped>
.choose {
  cursor: pointer;
}
</style>