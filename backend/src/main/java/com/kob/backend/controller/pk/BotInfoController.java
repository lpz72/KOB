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
    public List<Map<String,String>> getBotInfo() {
        List<Map<String,String>> list = new ArrayList<>();
        Map<String,String> bot1 = new HashMap<>();
        Map<String,String> bot2 = new HashMap<>();

        bot1.put("rice","100");
        bot1.put("bot","200");

        bot2.put("lpz","1000");
        bot2.put("lpz2","2000");

        list.add(bot1);
        list.add(bot2);
        return list;

    }
}
