<template>
  <v-layout row justify-center>
    <v-dialog v-model="registerDialogOn" persistent max-width="500px" dark>
      <v-card>
        <v-img
          class="white--text"
          src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1554202492584&di=20e911de67d7aa3f38a212ca7794bad9&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-01-16%2F5a5db7a92e5ec.png"
          aspect-ratio="2"
        >
          <v-card-title>
            <span class="headline">注册</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-flex>
                  <v-text-field
                    v-model="phone"
                    :counter="11"
                    :rules="phoneRules"
                    label="手机号"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field v-model="code" :rules="codeRules" counter="6" label="验证码" required></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    v-model="password"
                    type="password"
                    :rules="passwordRules"
                    label="密码"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex>
                  <v-text-field
                    v-model="comfirm"
                    type="password"
                    :rules="comfirmRules"
                    label="确认密码"
                    required
                  ></v-text-field>
                </v-flex>
              </v-form>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="submit">注册</v-btn>
            <v-btn flat @click="cancel">取消</v-btn>
          </v-card-actions>
        </v-img>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      valid: true,
      phone: "",
      isExist: false,
      phoneRules: [
        v => !!v || "手机号不能为空",
        v => /^1\d{10}$/.test(v) || "请输入正确的手机号"
      ],
      code: "",
      codeRules: [
        v => !!v || "验证码不能为空",
        v => /^.{6}$/.test(v) || "请输入正确的验证码"
      ],
      password: "",
      passwordRules: [
        v => !!v || "密码不能为空",
        v => /^.{6,16}$/.test(v) || "密码格式不正确"
      ],
      comfirm: "",
      comfirmRules: [v => !!v || "确认密码不能为空"]
    };
  },
  computed: {
    ...mapState(["registerDialogOn"])
  },
  watch: {
    phone(val) {
      if (/^1\d{10}$/.test(val)) {
        axios({
          method: "get",
          url: "/users",
          params: {
            phone: val
          }
        }).then(res => {
          this.isExist = !res.data.status;
          this.updatePhone();
        });
      }
    },
    comfirm() {
      const rule = v => v === this.password || "两次密码不一致";
      this.comfirmRules.push(rule);
    },
    password() {
      this.updatePassword();
    }
  },
  created() {
    this.phoneRules.push(v => !this.isExist || "该手机号已存在");
  },
  methods: {
    ...mapMutations(["setRegisterDialogOn"]),
    updatePhone() {
      this.$refs.form.inputs[0].validate();
    },
    updatePassword() {
      this.$refs.form.inputs[3].validate();
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        axios({
          method: "post",
          url: "/users",
          data: {
            phone: this.phone,
            pwd: this.password
          }
        }).then(() => {
          this.$refs.form.reset();
          this.setRegisterDialogOn();
          this.$router.push("/");
        });
      }
    },
    cancel() {
      this.$refs.form.reset();
      this.setRegisterDialogOn();
    }
  }
};
</script>