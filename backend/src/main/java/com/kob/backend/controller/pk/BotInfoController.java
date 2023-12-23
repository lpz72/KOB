package com.kob.backend.controller.pk;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//前后端分离代码，后端传送数据
@RestController //作用:
@RequestMapping("/pk/") //父目录
public class BotInfoController {

    @RequestMapping("getbotinfo/") //子目录
    public Map<String,String> getBotInfo() {
        Map<String,String> bot = new HashMap<>();

        bot.put("name","rice");
        bot.put("rating","2000");

        return bot;

    }
}
