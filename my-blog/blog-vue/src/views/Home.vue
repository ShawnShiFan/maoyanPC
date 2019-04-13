<template>
  <v-layout>
    <v-flex>
      <v-card v-for="(item,index) in showBlogs.data" v-bind:key="item._id" class="mb-4">
        <v-img :src="item.image" aspect-ratio="2"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-2">
              {{item.title}}
              <span
                class="font-weight-thin font-italic body-2"
              >{{item.author === curUser._id?"/我的文章":""}}</span>
            </h3>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                @click="toggleCollect(item._id,index)"
                v-if="item.author !== curUser._id"
              >
                <v-icon :color="showBlogs.collectColors[index]">stars</v-icon>
              </v-btn>
            </template>
            <span>{{showBlogs.collectColors[index]?"取消收藏":"收藏"}}</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                @click="toggleLike(item._id,index)"
                v-if="item.author !== curUser._id"
                class="ml-3"
              >
                <v-icon :color="showBlogs.likeColors[index]">favorite</v-icon>
              </v-btn>
            </template>
            <span>{{showBlogs.likeColors[index]?"取消喜欢":"喜欢"}}</span>
          </v-tooltip>
          <v-tooltip left>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                icon
                @click="updateBlog(item._id)"
                v-if="item.author === curUser._id"
              >
                <v-icon>edit</v-icon>
              </v-btn>
            </template>
            <span>修改</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-btn flat @click="showCurBlog(item._id)">
            查看全文
            <v-icon>keyboard_arrow_down</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  name: "showBlogs",
  computed: {
    ...mapState(["showBlogs", "curUser"])
  },
  created() {
    this.setShowBlogs();
  },
  methods: {
    ...mapMutations([
      "setLoginDialogOn",
      "setIsEditBlog",
      "setWriteDialogOn",
      "setTypeOfList"
    ]),
    ...mapActions(["setShowBlogs", "setShowArticle", "setEditBlog"]),
    showCurBlog(id) {
      this.setShowArticle({ id: id });
      this.$router.push("/showBlogContent");
    },
    toggleCollect(id, index) {
      if (this.curUser._id) {
        let oldUsers = this.showBlogs.data[index].collectUsers;
        let newUsers = [];
        if (this.showBlogs.collectColors[index] === "orange") {
          oldUsers.forEach(element => {
            if (element !== this.curUser._id) {
              newUsers.push(element);
            }
          });
        } else {
          oldUsers.push(this.curUser._id);
          newUsers = oldUsers;
        }
        axios({
          method: "post",
          url: "/articles/" + id,
          data: {
            collectUsers: newUsers,
            likeUsers: this.showBlogs.data[index].likeUsers
          }
        }).then(res => {
          this.setShowBlogs();
        });
      } else {
        this.setLoginDialogOn();
      }
    },
    toggleLike(id, index) {
      if (this.curUser._id) {
        let oldUsers = this.showBlogs.data[index].likeUsers;
        let newUsers = [];
        if (this.showBlogs.likeColors[index] === "orange") {
          oldUsers.forEach(element => {
            if (element !== this.curUser._id) {
              newUsers.push(element);
            }
          });
        } else {
          oldUsers.push(this.curUser._id);
          newUsers = oldUsers;
        }
        axios({
          method: "post",
          url: "/articles/" + id,
          data: {
            collectUsers: this.showBlogs.data[index].collectUsers,
            likeUsers: newUsers
          }
        }).then(res => {
          this.setShowBlogs();
        });
      }
    },
    updateBlog(id) {
      this.setTypeOfList("");
      this.setIsEditBlog(true);
      this.setWriteDialogOn();
      this.setEditBlog({ id: id });
    }
  }
};
</script>

<style scoped>
.content {
  height: 70px;
  overflow: hidden;
}
</style>