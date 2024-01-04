package com.kob.backend.service.impl.user.bot;

import com.kob.backend.mapper.BotMapper;
import com.kob.backend.pojo.Bot;
import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import com.kob.backend.service.user.bot.AddService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AddServiceImpl implements AddService {
    @Autowired
    private BotMapper botMapper;

    @Override
    public Map<String, String> add(Map<String, String> data) {
        UsernamePasswordAuthenticationToken authenticationToken =
                (UsernamePasswordAuthenticationToken) SecurityContextHolder.getContext().getAuthentication();

        UserDetailsImpl loginUser = (UserDetailsImpl) authenticationToken.getPrincipal();

        User user = loginUser.getUser();
        //上面几行代码为获取当前的用户

        String title = data.get("title");
        String description = data.get("description");
        String content = data.get("content");

        Map<String,String> map = new HashMap<>();

        if (title == null || title.length() == 0){
            map.put("error_message","标题不能为空");
            return map;
        }

        if (title.length() > 100){
            map.put("eror_message","标题长度不能大于100");
            return map;
        }

        if (description == null || description.length() == 0){
            description = "这个人很懒，什么也没有留下~";
        }

        if (description.length() > 300){
            map.put("error_message","描述长度不能大于300");
            return map;
        }

        if (content == null || content.length() == 0){
            map.put("error_message","代码不能为空");
            return map;
        }

        if(content.length() > 10000){
            map.put("error_message","代码长度不能大于10000");
            return map;
        }

        Date now = new Date(); //获取当前时间
        Bot bot = new Bot(null, user.getId(), title,description,content,1500,now,now);
        botMapper.insert(bot);
        map.put("error_message","success");

        return map;
    }
}
