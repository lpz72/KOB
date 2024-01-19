<template>
    <div class="matchground">
        <div class="row">
            <div class="col-6">
                <div class="user-photo">
                   <img :src="$store.state.user.photo" alt="">
                </div>
                <div class="user-username">
                    {{ $store.state.user.username }}
                </div>
            </div>
            <div class="col-6">
                <div class="user-photo">
                   <img :src="$store.state.pk.opponent_photo" alt="">
                </div>
                <div class="user-username">
                    {{ $store.state.pk.opponent_username }}
                </div>
            </div>
            <div class="col-12" style="text-align: center;padding-top: 15vh;">
                <button @click="click_match_btn" type="button" class="btn btn-warning btn = lg">{{ match_btn_info }}</button>
            </div>
        </div>
    </div>
</template>

<script>

import { ref } from 'vue';
import { useStore } from 'vuex';

export default{
        setup: () => {
            const store = useStore();

            let match_btn_info = ref("开始匹配");
            //定义鼠标点击按钮事件
            const click_match_btn = () => {
                if (match_btn_info.value === "开始匹配"){
                    match_btn_info.value = "取消";
                    //从前端向后端发消息，后端的onMessage接受到消息
                    store.state.pk.socket.send(JSON.stringify({
                        event: "start-matching",
                    
                    }));
                } else {
                    match_btn_info.value = "开始匹配",
                    store.state.pk.socket.send(JSON.stringify({
                        event: "stop-matching",
                    
                    }));
                }
            }

            return {
                match_btn_info,
                click_match_btn,
            }
        }

    }

</script>

<style scoped>

div.matchground{
    width: 60vw; /* 浏览器宽度的60%  */
    height: 70vh; /* 屏幕宽度的70% */
    /*background: lightblue; /* 背景颜色 */
    margin: 40px auto; /* 距离上方40px，auto是左右居中 */
    background-color: rgba(50, 50, 50, 0.5);
}

.user-photo{
    text-align: center;
    padding-top: 10vh;
}

.user-photo > img{
    border-radius: 50%; /* 圆形图片 */
    width: 20vh;
}

.user-username{
    text-align: center;
    font-size: 24px;
    font-weight: 600;
    color: white;
    padding: 2vh;
}

</style>