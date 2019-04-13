<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-img :src="showArticle.image" aspect-ratio="2.75"></v-img>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-5">{{showArticle.title}}</h3>
            <div>{{showArticle.content}}</div>
            <p class="mt-5 font-weight-thin font-italic">发布时间：{{showArticle.updateTime}}</p>
            <v-tooltip left>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <p class="font-weight-thin font-italic">作者：{{author.name}}</p>
                </span>
              </template>
              <span>电话：{{author.phone}}</span>
            </v-tooltip>
          </div>
        </v-card-title>
        <v-card-actions></v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      author: {}
    };
  },
  computed: {
    ...mapState(["showArticle"])
  },
  watch: {
    showArticle(val) {
      axios({
        method: "get",
        url: "/users/" + val.author
      }).then(res => {
        this.author = res.data;
      });
    }
  }
};
</script>

<style scoped>
</style>