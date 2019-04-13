<template>
  <v-layout row>
    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content class="mr-5">
              <v-list-tile-title @click="chooseType(item.type)">{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-list-tile v-for="(subItem,index) in chooseTypeArticles" :key="subItem.title">
          <v-list-tile-content>
            <v-list-tile-title
              class="articleTitle"
              @click="showCurBlog(subItem._id)"
            >{{ index+1 + '.' +subItem.title }}</v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-icon>{{ subItem.action }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-layout>
</template>
<script>
import axios from "axios";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      items: [
        {
          action: "local_activity",
          title: "游戏类",
          type: "game"
        },
        {
          action: "restaurant",
          title: "美食类",
          type: "food",
          active: true
        },
        {
          action: "school",
          title: "教育类",
          type: "education"
        },
        {
          action: "directions_run",
          title: "家庭类",
          type: "family"
        },
        {
          action: "healing",
          title: "健康类",
          type: "health"
        },
        {
          action: "content_cut",
          title: "办公类",
          type: "office"
        },
        {
          action: "local_offer",
          title: "促销类",
          type: "promotions"
        }
      ]
    };
  },
  created() {
    this.setChooseTypeArticles({ value: "food" });
  },
  computed: {
    ...mapState(["chooseTypeArticles"])
  },
  methods: {
    ...mapActions([
      "setChooseTypeArticles",
      "clearChooseTypeArticles",
      "setShowArticle"
    ]),
    ...mapMutations(["setChooseType"]),
    chooseType(data) {
      this.setChooseType(data)
      this.clearChooseTypeArticles();
      this.setChooseTypeArticles();
    },
    showCurBlog(id) {
      this.setShowArticle({ id: id });
      this.$router.push("/showBlogContent");
    }
  }
};
</script>
<style scoped>
.articleTitle {
  cursor: pointer;
}
</style>
