//这里所有的代码都会在用户的浏览器中执行

//写html
<template>
  <div>
    <div>Bot昵称：{{ bot_name }}</div>
    <div>Bot战力：{{ bot_rating }}</div>
  </div>
  <router-view/><router-view/>
</template>

//дjs
<script>
//从后端取出这两个的数据
import $ from 'jquery';
import { ref } from 'vue';


//vue里写js的固定格式
export default {
  name: "App", //自己定义的名字
  //属性setup是所有函数的接口
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
