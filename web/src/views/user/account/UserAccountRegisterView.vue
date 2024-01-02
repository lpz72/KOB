<template>
    <ContenField>
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="register"> <!-- form，加入表单 -->
                    <div class="mb-3">
                        <label for="username" class="form-label">用户名</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="请输入用户名">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">密码</label>
                        <input v-model="password" type="password" class="form-control" id="password" placeholder="请输入密码">
                    </div>
                    <div class="mb-3">
                        <label for="confirmedPassword" class="form-label">确认密码</label>
                        <input v-model="confirmedPassword" type="password" class="form-control" id="confirmedPassword" placeholder="请再次输入密码">
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
import $ from 'jquery';
import { ref } from 'vue';
import router from '@/router';

export default{
    components:{
        ContenField,
    },

    setup:() => {

        let username = ref('');
        let password = ref('');
        let confirmedPassword = ref('');
        let error_message = ref('');

        //由于注册并没有修改state的值，所以不用放到user.js中
        const register = () => {
            $.ajax ({
                url: "http://localhost:3000/user/account/register/",
                type: "post",
                data:{
                    username: username.value,
                    password: password.value,
                    confirmedPassword: confirmedPassword.value,
                },
                success(resp){
                    console.log(resp);
                    if(resp.error_message === "success"){
                        
                        router.push({name: "user_account_login"}); //注册成功则跳转到登录页面

                    } else {
                        error_message.value = resp.error_message;
                    }
                }
            });

        }

        return {
                username,
                password,
                confirmedPassword,
                error_message,
                register,
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