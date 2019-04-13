<template>
  <v-card>
    <h3
      class="title ml-4 pt-3 font-weight-regular font-italic"
    >{{typeOfList==='mine'?"我的博客":typeOfList==='like'?"我的喜欢":"我的收藏"}}</h3>
    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 v-for="(item,index) in blogsList" v-bind:key="item._id">
          <v-card color="blue-grey darken-2" class="white--text">
            <v-img :src="item.image" aspect-ratio="5">
              <v-card-title primary-title>
                <p class="title">{{index+1+"."}}{{item.title}}</p>
              </v-card-title>
              <v-card-actions v-if="typeOfList === 'mine'">
                <v-btn flat dark @click="updateBlog(item._id)">修改</v-btn>
                <v-btn flat dark @click="deleteBlog(item._id)">删除</v-btn>
              </v-card-actions>
              <v-card-actions v-else-if="typeOfList === 'collect'">
                <v-btn flat dark @click="cancelCollect(item)">取消收藏</v-btn>
              </v-card-actions>
              <v-card-actions v-else>
                <v-btn flat dark @click="cancelLike(item)">取消喜欢</v-btn>
              </v-card-actions>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["blogsList", "typeOfList", "curUser"])
  },
  methods: {
    ...mapMutations(["setIsEditBlog", "setWriteDialogOn"]),
    ...mapActions([
      "setShowBlogs",
      "setShowArticle",
      "setEditBlog",
      "setBlogsList"
    ]),
    updateBlog(id) {
      this.setIsEditBlog(true);
      this.setWriteDialogOn();
      this.setEditBlog({ id: id });
    },
    deleteBlog(id) {
      axios({
        method: "delete",
        url: "/articles/" + id
      }).then(res => {
        alert("删除成功");
        this.setBlogsList({ type: "mine" });
      });
    },
    cancelCollect(item) {
      let oldUsers = item.collectUsers;
      let newUsers = [];
      oldUsers.forEach(element => {
        if (element !== this.curUser._id) {
          newUsers.push(element);
        }
      });
      axios({
        method: "post",
        url: "/articles/" + item._id,
        data: {
          collectUsers: newUsers,
          likeUsers: item.likeUsers
        }
      }).then(res => {
        this.setBlogsList({ type: "collect" });
      });
    },
    cancelLike(item) {
      let oldUsers = item.likeUsers;
      let newUsers = [];
      oldUsers.forEach(element => {
        if (element !== this.curUser._id) {
          newUsers.push(element);
        }
      });
      axios({
        method: "post",
        url: "/articles/" + item._id,
        data: {
          collectUsers: item.collectUsers,
          likeUsers: newUsers
        }
      }).then(res => {
        this.setBlogsList({ type: "like" });
      });
    }
  }
};
</script>

<style scoped>
</style>