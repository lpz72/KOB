//这里所有的代码都会在用户的浏览器中执行

//写html
<template>
  <NavBar />
  <router-view />
  <!--<router-view/>会根据路由地址进行跳转，如果有两个<router-view/>，则会跳转两次，即重复 -->
</template>

//写脚本以及js代码
<script>
//从后端取出这两个的数据
//import $ from "jquery";
import NavBar from "./components/NavBar.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

//vue里写js的固定格式
export default {
  name: "App", //自己定义的名字
  //属性setup是所有函数的接口

  components: {
    NavBar,
  },
  setup: () => {
    


    // //注册
    // $.ajax({
    //   url: "http://localhost:3000/user/account/register/",
    //   type: "post",
    //   data:{
    //     username: "lpz3",
    //     password: "lpz3",
    //     confirmedPassword: "lpz3",
    //   },
    //   success(resp) {
    //     console.log(resp);
    //   },
    //   error(resp) {
    //     console.log(resp);
    //   }
    // });

  },
};
</script>

//写CSS
<style>
body {
  background-image: url("@/assets/images/background.png"); /*背景图片*/
  background-size: cover; /*背景图片全覆盖*/
}
</style>
