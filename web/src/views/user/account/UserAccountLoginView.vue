<template>
    <ContenField v-if="!$store.state.user.pulling_info"> <!-- 没有正在拉取数据时，显示 -->
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="login"> <!-- form，加入表单 -->
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                    </div>
                    <div class="error_message"> {{ error_message }} </div>
                    <button type="submit" class="btn btn-primary">提交</button>
                </form>
            </div>
        </div>
    </ContenField>
</template>

<script>
import ContenField from '@/components/ContenField.vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import router from '@/router'; 

export default{
    components:{
        ContenField,
    },
    setup:() => {
        
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let error_message = ref('');

        //当刷新后还需在UserAccountLoginView中判断，获取localStorage中的token，判断是否存在，存在的话则
        //更新用户的token，调用user.js的getInfo函数，成功则跳转到加页面
        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token){
            store.commit("updateToken",jwt_token);
            //从云端获取用户信息更新用户，以该身份继续访问页面
            store.dispatch("getInfo",{
                success(){ //回调函数
                    router.push({name: "home"}); 
                    //获取用户信息成功后，则从getInfo回调success函数，跳转到家页面
                    store.commit("updatePuiilingInfo",false);
                },
                error(){ //失败时
                    store.commit("updatePuiilingInfo",false);
                }
            })
        }
        else { //token过期时
            store.commit("updatePuiilingInfo",false);
        }


        const login = () =>{
            error_message.value = "";
            store.dispatch("login",{
            username: username.value,
            password: password.value,
            success(){ //登录成功后，返回用户信息进行更新
                store.dispatch("getInfo",{
                    success() {
                    router.push({name: 'home'});//登录成功后跳转到主页面
                    //console.log(store.state.user);
                    } 
                })
                
            },
            error(){
               error_message.value = "用户名或密码错误";
            },

        });
        }

        return {
            username,
            password,
            error_message,
            login,
        }
        

    }
}

</script>

<style scoped>

button{
    width: 100%;
}

.error_message{
    color: red;
}

</style>