//这里所有的代码都会在用户的浏览器中执行

//写html
<template>
  <NavBar/>
  <router-view/>  <!--<router-view/>会根据路由地址进行跳转，如果有两个<router-view/>，则会跳转两次，即重复 -->
</template>

//写脚本以及js代码
<script>
//从后端取出这两个的数据
import $ from 'jquery';
import { ref } from 'vue';
import NavBar from './components/NavBar.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

//vue里写js的固定格式
export default {
  name: "App", //自己定义的名字
  //属性setup是所有函数的接口

  components:{
    NavBar,
},
  setup: () => {
    let bot_name = ref("");
    let bot_rating = ref("");

    //获取数据
    $.ajax({
      url: "http://127.0.0.1:3000/pk/getbotinfo/",
      type: "get",
      success: resp => {
        bot_name.value = resp.name;
        bot_rating.value = resp.rating;
      }
    });

    return{
      bot_name,bot_rating
    }
  }
}
</script>

//写CSS
<style>

body{
  background-image: url("@/assets/background.png");/*背景图片*/
  background-size: cover; /*背景图片全覆盖*/
}
</style>
