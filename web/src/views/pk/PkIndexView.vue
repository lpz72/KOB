<!-- 调用关系PkIndexView -> PlayGround.vue(背景) -> GameMap.vue(生成对象)
     -> GameMap.js(实时计算地图尺寸，将地图画出) ->(继承) AcGameObject.js  -->

<template>
    <PlayGround v-if="$store.state.pk.status === 'playing'" />
    <MatchGround v-if="$store.state.pk.status === 'matching'"/>
</template>

<script>
import PlayGround from '@/components/PlayGround.vue';
import { onMounted,onUnmounted } from 'vue';
import { useStore } from 'vuex';
import MatchGround from '@/components/MatchGround.vue';

export default{
    components:{
        PlayGround,
        MatchGround,
    },

    setup:() => {
        const store = useStore();
        //字符串中有${}表达式操作时，需要用`，不能用单引号
        const socketUrl = `ws://localhost:3000/websocket/${store.state.user.token}/`; //jwt验证
        let socket = null;
       
        store.commit("updateOpponent",{
            username: "我的对手",
            photo: "https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png"
        });

        //挂载组件时，即处于打开页面时
        onMounted(() => {
            socket = new WebSocket(socketUrl);
            //连接成功时
            socket.onopen = () => {
                console.log("connected!");
                store.commit("updateSocket",socket);
            }

            //收到消息时
            socket.onmessage = msg => {
                const data = JSON.parse(msg.data);
                if (data.event === "start matching"){ //匹配成功 
                store.commit("updateOpponent",{
                    username: data.opponent_username,
                    photo: data.opponent_photo,
                });

                setTimeout(() => {
                    store.commit("updateStatus","playing");
                },2000);
                store.commit("updateGamemap",data.gamemap);
            }
            }
            //连接关闭时
            socket.onclose = () => {
                console.log("disconnected!");
            }

        });

        //卸载组件时关闭连接，否则会有冗余连接，即旧链接不能关闭
        onUnmounted(() => {
            socket.close();
            store.commit("updateStatus","matching");
        })
    }
}

</script>

<style scoped>

</style>