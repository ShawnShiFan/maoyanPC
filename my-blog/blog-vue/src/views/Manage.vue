<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer v-model="drawer" clipped fixed app>
      <Navigation></Navigation>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-btn icon large @click.stop="drawer = !drawer">
        <v-icon large>face</v-icon>
      </v-btn>
      <v-toolbar-title>BLOG SYSTEM</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex  class="hidden-sm-and-down" md2>
        <v-select label="搜索类型" :items="typeItems"  v-model="pagination.type"></v-select>
      </v-flex>
      <v-flex class="hidden-sm-and-down" md4>
        <v-text-field
          required
          placeholder="请输入您要搜索的内容"
          :rules="searchValueRules"
          append-icon="search"
          v-model="pagination.value"
        ></v-text-field>
      </v-flex>
      <v-flex class="hidden-sm-and-down" md2>
        <h4 class="font-weight-light ml-4">{{curUser.name?"欢迎您,"+curUser.name+"!":"您还未登录！"}}</h4>
      </v-flex>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-md style=" position: relative">
        <v-layout row wrap>
          <v-flex xs12 sm12>
            <router-view></router-view>
          </v-flex>
          <v-navigation-drawer right fixed app v-model="types" dark>
            <ShowTypes></ShowTypes>
          </v-navigation-drawer>
          <v-btn color="black" dark fixed bottom right fab @click.stop="types = !types">
            <v-icon>{{typeIcon}}</v-icon>
          </v-btn>
        </v-layout>
      </v-container>
    </v-content>
    <LoginDialog></LoginDialog>
    <RegisterDialog></RegisterDialog>
    <WriteDialog></WriteDialog>
  </v-app>
</template>

<script>
import ShowTypes from "../components/ShowTypes.vue";
import Navigation from "../components/Navigation.vue";
import LoginDialog from "../components/LoginDialog.vue";
import RegisterDialog from "../components/RegisterDialog.vue";
import WriteDialog from "../components/WriteDialog.vue";
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    typeItems: ["title","updateTime","content"],
    drawer: true,
    types: true,
    typeIcon: "close",
    searchValueRules: []
  }),
  watch: {
    types(val) {
      this.typeIcon = val ? "close" : "add";
    },
    "pagination.value"(val) {
      this.setShowBlogs();
      if (val) {
        this.$router.push("/");
      }
    },
    "pagination.type"() {
      this.pagination.value = "";
    }
  },
  props: {
    source: String
  },
  computed: {
    ...mapState(["curUser", "pagination"])
  },
  methods: {
    ...mapActions(["setCurUser", "setShowBlogs"])
  },
  created() {
    this.setCurUser();
    this.searchValueRules.push(
      v => !!this.pagination.type || !v || "请先选择搜索类型"
    );
  },
  components: {
    ShowTypes,
    Navigation,
    LoginDialog,
    RegisterDialog,
    WriteDialog
  }
};
</script>