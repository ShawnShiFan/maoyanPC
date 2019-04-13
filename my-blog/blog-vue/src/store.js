import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //分页信息
    pagination: { page: 1, rows: 10, type: "", value: "" },
    //首页展示的博客
    showBlogs: { data: [], collectColors: [], likeColors: [] },
    //登录对话框
    loginDialogOn: false,
    //注册对话框
    registerDialogOn: false,
    //写博客和修改博客对话框
    writeDialogOn: false,
    //当前用户
    curUser: {},
    //用户选择分类的文章
    chooseTypeArticles: [],
    //用户选择分类名称
    chooseType:"food",
    //用户选择查看的博客信息
    showArticle: {},
    //用户选择是否为修改博客
    isEditBlog: false,
    //用户选择修改的博客
    editBlog: {
      title: "",
      updateTime: "",
      image: "",
      author: "",
      content: "",
      type: "",
      collectUsers: [],
      likeUsers: []
    },
    //博客表格
    blogsList: [],
    //博客表格分类
    typeOfList: ""
  },
  mutations: {
    setPagination(state, payload) {
      state.pagination = payload;
    },
    setShowBlogs(state, data) {
      state.showBlogs = data;
    },
    setLoginDialogOn(state) {
      state.loginDialogOn = !state.loginDialogOn;
    },
    setRegisterDialogOn(state) {
      state.registerDialogOn = !state.registerDialogOn;
    },
    setWriteDialogOn(state) {
      state.writeDialogOn = !state.writeDialogOn;
    },
    setCurUser(state, data) {
      state.curUser = data;
    },
    setChooseTypeArticles(state, data) {
      state.chooseTypeArticles = data;
    },
    setChooseType(state,data){
      state.chooseType = data
    },
    setShowArticle(state, data) {
      state.showArticle = data;
    },
    setIsEditBlog(state, bool) {
      state.isEditBlog = bool;
    },
    setEditBlog(state, data) {
      state.editBlog = data;
    },
    setBlogsList(state, data) {
      state.blogsList = data;
    },
    setTypeOfList(state, type) {
      state.typeOfList = type;
    }
  },
  actions: {
    setShowBlogs({ commit, state }) {
      axios({
        method: "get",
        url: "/articles",
        params: {
          page: state.pagination.page,
          rows: state.pagination.rows,
          type: state.pagination.type,
          value: state.pagination.value
        }
      }).then(res => {
        let data = res.data.rows;
        let collectColors = [];
        for (let i = 0; i < data.length; i++) {
          let color = "";
          for (let j = 0; j < data[i].collectUsers.length; j++) {
            if (data[i].collectUsers[j] == state.curUser._id) {
              color = "orange";
              break;
            }
          }
          collectColors.push(color);
        }
        let likeColors = [];
        for (let i = 0; i < data.length; i++) {
          let color = "";
          for (let j = 0; j < data[i].likeUsers.length; j++) {
            if (data[i].likeUsers[j] == state.curUser._id) {
              color = "orange";
              break;
            }
          }
          likeColors.push(color);
        }
        commit("setShowBlogs", {
          data: res.data.rows,
          collectColors: collectColors,
          likeColors: likeColors
        });
      });
    },
    setCurUser({ commit }) {
      axios({
        method: "get",
        url: "/users/getSession"
      }).then(res => {
        commit("setCurUser", res.data);
      });
    },
    setChooseTypeArticles({ commit,state }) {
      axios({
        method: "get",
        url: "/articles",
        params: { type: "type", value: state.chooseType }
      }).then(res => {
        commit("setChooseTypeArticles", res.data);
      });
    },
    //清空用户选择类型的文章
    clearChooseTypeArticles({ commit }) {
      commit("setChooseTypeArticles", []);
    },
    setShowArticle({ commit }, payload = {}) {
      let id = payload.id;
      axios({
        method: "get",
        url: "/articles/" + id
      }).then(res => {
        commit("setShowArticle", res.data);
      });
    },
    setEditBlog({ commit }, payload = {}) {
      let id = payload.id;
      axios({
        method: "get",
        url: "/articles/" + id
      }).then(res => {
        commit("setEditBlog", res.data);
      });
    },
    setBlogsList({ commit, state }, payload = {}) {
      let type = payload.type;
      commit("setTypeOfList", type);
      switch (type) {
        case "mine":
          getList("author");
          break;
        case "collect":
          getList("collectUsers");
          break;
        case "like":
          getList("likeUsers");
      }
      function getList(type) {
        axios({
          method: "get",
          url: "/articles",
          params: { type: type, value: state.curUser._id }
        }).then(res => {
          commit("setBlogsList", res.data);
        });
      }
    }
  }
});
