<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark"> <!-- 导航栏背景设为黑色 -->
  <div class="container">
    <!-- 用router-link可以使每次点击跳转时不刷新-->
    <router-link class="navbar-brand" :to="{name: 'pk_index'}">King Of Bots</router-link>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <!-- 如果要用表达式则在前面加上:,:是v-bind:的缩写，这里class加:判断当前是否在这个页面，若在的话则用active高亮 -->
          <router-link :class="route_name == 'pk_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'pk_index'}">对战</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="route_name == 'record_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'record_index'}">对局列表</router-link>
        </li>
        <li class="nav-item">
          <router-link :class="route_name == 'ranklist_index' ? 'nav-link active' : 'nav-link'" :to="{name: 'ranklist_index'}">排行榜</router-link>
        </li>
      </ul>
      <ul class="navbar-nav" v-if="$store.state.user.is_login">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{$store.state.user.username}}
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link class="dropdown-item" :to="{name: 'user_bot_index'}">我的Bot</router-link>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#" @click="logout">退出</a></li>
          </ul>
        </li>
      </ul>
      <ul class="navbar-nav" v-else-if="!$store.state.user.pulling_info">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'user_account_login'}"  role="button" >
            登录
          </router-link >
        </li>
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'user_account_register'}" role="button" >
            注册
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { useStore } from 'vuex';

export default{
    name:"NavBar",
    setup:() => {
        const store = useStore();
        const route = useRoute();
        let route_name = computed(() => route.name); //实时返回当前路由的名字

        //创建退出时事件，并在退出按钮上绑定
        const logout = () => {
          store.dispatch("logout");
        }
        return {
          route_name,
          logout
        }
    }
}

</script>

<style scoped>

</style>