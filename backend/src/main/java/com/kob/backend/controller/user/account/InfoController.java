package com.kob.backend.controller.user.account;

import com.kob.backend.service.user.account.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class InfoController {

    @Autowired
    private InfoService infoService; //引入的是接口，而不是已经实现的类，通过接口调用实现的函数

    //得到信息一般是用get，修改、删除、添加一般是post
    @GetMapping("/user/account/info/")
    public Map<String,String> getInfo(){
        return infoService.getInfo();
    }
}
