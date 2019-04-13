<template>
  <v-layout row justify-center>
    <v-dialog v-model="writeDialogOn" persistent max-width="500px" dark>
      <v-card>
        <v-card-title>
          <v-icon large>book</v-icon>
          <span class="title font-weight-light">编写文章</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-flex>
                <v-text-field
                  :counter="10"
                  label="标题"
                  required
                  v-model="editBlog.title"
                  :rules="[v => !!/^.{1,10}$/.test(v) || '标题为1-10位']"
                ></v-text-field>
              </v-flex>
              <v-flex>
                <v-select
                  label="选择主题图片"
                  :items="images"
                  required
                  :rules="[v=> !!v || '请选择主题图片']"
                  v-model="editBlog.image"
                ></v-select>
              </v-flex>
              <v-flex>
                <v-select
                  label="分类"
                  :items="types"
                  required
                  v-model="editBlog.type"
                  :rules="[v=> !!v || '请选择分类']"
                ></v-select>
              </v-flex>
              <v-flex>
                <v-textarea
                  label="内容"
                  required
                  v-model="editBlog.content"
                  :rules="[v=> !!v || '内容不能为空']"
                ></v-textarea>
              </v-flex>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#fff" flat @click="submit" v-if="!isEditBlog">发布</v-btn>
          <v-btn color="#fff" flat @click="submit" v-if="isEditBlog">修改</v-btn>
          <v-btn color="#fff" flat @click="cancel">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      valid: true,
      images: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554137465286&di=52778495ffc8e5df3167d007e6a7cdb7&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201512%2F16%2F20151216204556_LPjh4.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554137529524&di=7d18b6f5df9d61c9ac92fbd23834f16f&imgtype=0&src=http%3A%2F%2Fi2.hdslb.com%2Fbfs%2Farchive%2F44582bdac12c9b6274193948c9cb868ad0c76b2d.png",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554137568824&di=efe31ded524aa283b1c71a7399fe117b&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201604%2F06%2F20160406132712_aRrQn.jpeg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554137617419&di=7e8d6453590ae54adb0285550ddc9a7e&imgtype=0&src=http%3A%2F%2Fphotocdn.sohu.com%2F20150211%2FImg408922943.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554137734465&di=9aab8c7e01805c306abb17608d0f0e2d&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201507%2F05%2F20150705123144_EX83r.jpeg"
      ],
      types: [
        "game",
        "food",
        "education",
        "family",
        "health",
        "office",
        "promotions"
      ]
    };
  },
  computed: {
    ...mapState([
      "writeDialogOn",
      "curUser",
      "isEditBlog",
      "editBlog",
      "typeOfList"
    ])
  },
  methods: {
    ...mapMutations(["setWriteDialogOn"]),
    ...mapActions(["setShowBlogs", "setBlogsList", "setChooseTypeArticles"]),
    submit() {
      if (this.$refs.form.validate()) {
        let time = new Date().toLocaleDateString();
        this.setWriteDialogOn();
        let method = "";
        let url = "";
        if (this.isEditBlog) {
          method = "put";
          url = "/articles/" + this.editBlog._id;
        } else {
          method = "post";
          url = "/articles";
        }
        axios({
          method: method,
          url: url,
          data: {
            ...this.editBlog,
            updateTime: time,
            author: this.curUser._id
          }
        }).then(() => {
          this.$refs.form.reset();
          if (this.typeOfList === "mine") {
            this.setBlogsList({ type: "mine" });
          } else {
            this.setShowBlogs();
          }
          this.setChooseTypeArticles();
        });
      }
    },
    cancel() {
      this.$refs.form.reset();
      this.setWriteDialogOn();
    }
  }
};
</script>