package com.kob.backend.consumer;

import com.alibaba.fastjson2.JSONObject;
import com.kob.backend.consumer.utils.Game;
import com.kob.backend.consumer.utils.JwtAuthentication;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.web.method.annotation.CsrfTokenArgumentResolver;
import org.springframework.stereotype.Component;

import javax.websocket.*;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.CopyOnWriteArraySet;

@Component
@ServerEndpoint("/websocket/{token}")  // 注意不要以'/'结尾
public class WebSocketServer {

    //线程安全的map，存用户对应的链接
    final private static ConcurrentMap<Integer,WebSocketServer> users = new ConcurrentHashMap<>();
    //线程安全的set，定义匹配池
    final private static CopyOnWriteArraySet<User> matchpool = new CopyOnWriteArraySet<>();
    private Session session = null;
    private User user;
    private static UserMapper userMapper;

    //WebSocketServer不是springboot的组件且不是单例模式，注入方式不同
    //单例模式：一个类同一时间只能有一个实例
    @Autowired
    public void setUserMapper(UserMapper userMapper){
        WebSocketServer.userMapper = userMapper;
    }

    @OnOpen  // 建立连接
    public void onOpen(Session session, @PathParam("token") String token) throws IOException {
        //WebSocketServer client  = new WebSocketServer();建立连接就是new一个该类
        this.session = session;
        System.out.println("connected!");
        Integer userId = JwtAuthentication.getUserId(token); //jwt验证
        this.user = userMapper.selectById(userId);

       if (user != null){
           users.put(userId,this);
       } else { //如果用户不存在，则关闭连接
           this.session.close();
       }

        System.out.println(users);

        //users.put(userId,this);
        //System.out.println(user);


    }

    @OnClose  // 关闭链接
    public void onClose() {
        System.out.println("disconnected!");
        if (users != null){
            users.remove(this.user.getId());
            matchpool.remove(this.user);
        }

    }

    private void startMatching() throws IOException {
        System.out.println("start-matching!");
        matchpool.add(this.user);

        while (matchpool.size() >= 2){
            Iterator<User> it = matchpool.iterator();
            User a = it.next(),b = it.next();
            matchpool.remove(a);
            matchpool.remove(b);

            //创建地图
            Game game = new Game(13,14,20);
            game.createMap(); //初始化地图

            //将对手信息返回到前端
            JSONObject respA = new JSONObject();
            respA.put("event","start matching");
            respA.put("opponent_username",b.getUsername());
            respA.put("opponent_photo",b.getPhoto());
            respA.put("gamemap",game.getG()); //存入地图
            users.get(a.getId()).sendMessage(respA.toJSONString()); //得到该用户的链接，并向前端发送信息
            //前端的socket.onmessage会收到信息

            JSONObject respB = new JSONObject();
            respB.put("event","start matching");
            respB.put("opponent_username",a.getUsername());
            respB.put("opponent_photo",a.getPhoto());
            respB.put("gamemap",game.getG());
            users.get(b.getId()).sendMessage(respB.toJSONString());
        }


    }

    private void stopMatching(){
        System.out.println("stop matching");
        matchpool.remove(this.user);

    }


    @OnMessage  // 从Client接收消息,前端向后端发送信息
    public void onMessage(String message, Session session) throws IOException { //当做路由，判断当时是哪个事件
        System.out.println("success!");
        JSONObject data = JSONObject.parseObject(message);
        String event = data.getString("event");
        if ("start-matching".equals(event)){
            startMatching();
        } else if ("stop-matching".equals(event)){
            stopMatching();
        }

    }

    @OnError
    public void onError(Session session, Throwable error) {
        error.printStackTrace();
    }

    //后端向前端发送信息
    public void sendMessage(String message) throws IOException {
        synchronized (this.session){
            this.session.getBasicRemote().sendText(message);
        }

    }
}