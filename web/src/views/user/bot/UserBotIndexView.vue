<template>
    <div class="container">
        <div class="row">
            <div class="col-3">
                <div class="card" style="margin-top: 20px;">
                    <div class="card-body">
                        <img :src="$store.state.user.photo" alt="" style="width: 100%;">
                    </div>
                </div>
            </div>
            
            <div class="col-9">
                  <div class="card" style="margin-top: 20px;">
                    <div class="card-header">
                       <span style="font-size: 130%;"> 我的Bot </span> <!--data-bs-toggle="modal" data-bs-target="#add_bot_id" 绑定该按钮,add_bot_id对应于框的id -->
                        <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#add-bot-btn">创建Bot</button>
                        <!-- Modal  点击创建Bot按钮，跳出来模态框-->
                        <div class="modal fade" id="add-bot-btn" tabindex="-1" >
                            <div class="modal-dialog modal-xl"> <!-- modal-xl使框变大-->
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">创建Bot</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body"> <!-- 修改框中给的内容 -->
                                    <div class="mb-3">
                                    <label for="add-bot-title" class="form-label">名称</label>
                                    <input v-model="botadd.title" type="text" class="form-control" id="add-bot-title" placeholder="请输入Bot名称">
                                    </div> <!-- v-model绑定输入 -->
                                    <div class="mb-3">
                                    <label for="add-bot-description" class="form-label">简介</label>
                                    <textarea v-model="botadd.description" class="form-control" id="add-bot-description" rows="3" placeholder="请输入Bot简介"></textarea>
                                    </div>
                                    <div class="mb-3">
                                    <label for="add-bot-code" class="form-label">代码</label>
                                    <!-- <textarea v-model="botadd.content" class="form-control" id="add-bot-code" rows="9" placeholder="请输入Bot代码"></textarea> -->
                                    <VAceEditor
                                        v-model:value="botadd.content"
                                        @init="editorInit"
                                        lang="c_cpp"
                                        theme="textmate"
                                        :options="{fontSize: 18}"
                                        style="height: 300px" />
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <div class="error-message">{{ botadd.error_message }}</div>
                                    <button type="button" class="btn btn-primary" @click="add_bot">创建</button> <!-- 绑定add_bot函数 -->
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>名称</th>
                                <th>创建时间</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="bot in bots" :key="bot.id">
                                <td>{{ bot.title }}</td>
                                <td>{{ bot.createtime }}</td>
                                <td>
                                    <button type="button" class="btn btn-secondary" style="margin-right: 10px;" data-bs-toggle="modal" :data-bs-target="'#update-bot-' + bot.id" >修改</button>
                                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" :data-bs-target="'#remove-bot-'+ bot.id" >删除</button>
                                    <!--跳出修改模态框 -->
                                    <div class="modal fade" :id="'update-bot-' + bot.id" tabindex="-1" >
                                        <div class="modal-dialog modal-xl"> 
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">修改Bot</h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body"> 
                                                <div class="mb-3">
                                                <label for="add-bot-title" class="form-label">名称</label>
                                                <input v-model="bot.title" type="text" class="form-control" id="add-bot-title" placeholder="请输入Bot名称">
                                                </div> 
                                                <div class="mb-3">
                                                <label for="add-bot-description" class="form-label">简介</label>
                                                <textarea v-model="bot.description" class="form-control" id="add-bot-description" rows="3" placeholder="请输入Bot简介"></textarea>
                                                </div>
                                                <div class="mb-3">
                                                <label for="add-bot-code" class="form-label">代码</label>
                                                <!-- <textarea v-model="bot.content" class="form-control" id="add-bot-code" rows="9" placeholder="请输入Bot代码"></textarea> -->
                                                <VAceEditor
                                                    v-model:value="bot.content"
                                                    @init="editorInit"
                                                    lang="c_cpp"
                                                    theme="textmate"
                                                    :options="{fontSize: 18}"
                                                    style="height: 300px" />
                                                </div>
                                            </div>
                                            <div class="modal-footer">
                                                <div class="error-message">{{ bot.error_message }}</div>
                                                <button type="button" class="btn btn-primary" @click="update_bot(bot)">保存修改</button> <!-- 绑定add_bot函数 -->
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <!-- 跳出确认删除 -->
                                    <div class="modal fade" :id="'remove-bot-' + bot.id" tabindex="-1" >
                                        <div class="modal-dialog modal-dialog-centered"> <!-- modal-dialog-centered使框出现在屏幕中央-->
                                            <div class="modal-content">
                                                <!-- <div class="modal-header">
                                                    <h1 class="modal-title-remove fs-5" style="text-align: center;">你确定删除吗？</h1>
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div> -->
                                                <div class="notice fs-5">
                                                    你确定删除吗？
                                                </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-primary" style="margin: auto;" @click="remove_bot(bot)">删除</button>
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="margin: auto;">取消</button>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                  </div> 
            </div>
            
        </div>
    </div>
</template>

<script>
import { ref,reactive } from 'vue';
import { useStore } from 'vuex';
import $ from 'jquery'
import { Modal } from 'bootstrap/dist/js/bootstrap';
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';

import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/mode-c_cpp'

export default{

    components:{
        VAceEditor
    },

    setup:() => {
        ace.config.set(
            "basePath", 
            "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/");
        const store = useStore();
        let bots = ref([]);

        //新建的bot,绑定变量一般用ref,绑定对象用reactive
        const botadd = reactive({
             title: "",
             description: "",
             content: "",
             error_message: "",
        });

        //刷新bot列表
        const refresh_bot = () => {
            $.ajax({
                url: "http://localhost:3000/user/bot/getlist/",
                type: "get",
                headers:{
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp){
                    bots.value = resp;
                }
            });
        }

        refresh_bot(); //执行该函数

        //创建一个bot
        const add_bot = () => {
            $.ajax({
                url: "http://localhost:3000/user/bot/add/",
                type: "post",
                data:{
                    title: botadd.title,
                    description: botadd.description,
                    content: botadd.content,
                },
                headers:{
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp){
                    if (resp.error_message === "success"){
                        botadd.title = "";
                        botadd.description = "";
                        botadd.content = "";
                        Modal.getInstance("#add-bot-btn").hide(); //清空框中的内容并且关闭框
                        refresh_bot(); //刷新bot列表
                    } else {
                        botadd.error_message = resp.error_message;
                    }

                }
            });
        }

        //删除一个bot
        const remove_bot = (bot) => {
            $.ajax({
                url: "http://localhost:3000/user/bot/remove/",
                type: "post",
                data:{
                    bot_id: bot.id,
                },
                headers:{
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp){
                    //console.log();
                    if (resp.error_message === "success"){
                        Modal.getInstance("#remove-bot-" + bot.id).hide();
                        refresh_bot();
                    }
                }
            });
        }

        //更新一个bot
        const update_bot = (bot) => {
            botadd.error_message = "",
            $.ajax({
                url: "http://localhost:3000/user/bot/update/",
                type: "post",
                data:{
                    bot_id: bot.id,
                    title: bot.title,
                    description: bot.description,
                    content: bot.content,
                },
                headers:{
                    Authorization: "Bearer " + store.state.user.token,
                },
                success(resp){
                    if (resp.error_message === "success"){
                        Modal.getInstance('#update-bot-' + bot.id).hide();
                        refresh_bot();
                    } else {
                        bot.error_message = resp.error_message;
                    }
                }
            });

        }

        return {
            bots,
            botadd,
            add_bot,
            remove_bot,
            update_bot,
        }

    }
}

</script>

<style scoped>
.error-message{
    color: red;
}
.notice{
    color: red;
    text-align: center;
    font-size: 25;
}

</style>