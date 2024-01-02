import { createRouter, createWebHistory } from 'vue-router'
import PkIndexView from '../views/pk/PkIndexView';
import RecordIndexView from '../views/record/RecordIndexView'
import RanklistIndexView from '../views/ranklist/RanklistIndexView';
import NotFound from '../views/error/NotFound';
import UserBotIndexView from '../views/user/bot/UserBotIndexView';
import UserAccountLoginView from '@/views/user/account/UserAccountLoginView'
import UserAccountRegisterView from '@/views/user/account/UserAccountRegisterView'
import store from '@/store';

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/pk/",
    meta:{ //把是否需要授权放到一个域里，根据习惯来
      requestAuth: true,  //requestAuth自己定的变量名，是否需要授权
    }
    //flag: true, 也可这样写，没区别
  },
  {
    path: "/pk/",
    name: "pk_index",
    component: PkIndexView,
    meta:{ 
      requestAuth: true, 
    }
  },
  {
    path: "/record/",
    name: "record_index",
    component: RecordIndexView,
    meta:{ 
      requestAuth: true, 
    }
  },
  {
    path: "/ranklist/",
    name: "ranklist_index",
    component: RanklistIndexView,
    meta:{ 
      requestAuth: true, 
    }
  },
  {
    path: "/user/bot/",
    name: "user_bot_index",
    component: UserBotIndexView,
    meta:{ 
      requestAuth: true, 
    }
  },
  {
    path: "/user/account/register/",
    name: "user_account_register",
    component: UserAccountRegisterView,
    meta:{ 
      requestAuth: false, 
    }
  },
  {
    path: "/user/account/login",
    name: "user_account_login",
    component: UserAccountLoginView,
    meta:{ 
      requestAuth: false, 
    }
  },

  {
    path: "/404/",
    name: "404",
    component: NotFound,
    meta:{ 
      requestAuth: false, 
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: "/404/",
  },
  

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//实现未登录时点击时会跳转到登录页面
router.beforeEach((to,from,next) => { //to表示要到达的目的页面，from表示从哪个页面去，next表示是否需要下步操作
   if (to.meta.requestAuth && !store.state.user.is_login){
    next({name: 'user_account_login'});
   } else {
    next(); //否则，跳转到默认页面,相当于什么也不做
   }

})

export default router
