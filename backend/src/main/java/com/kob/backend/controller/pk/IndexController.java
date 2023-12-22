package com.kob.backend.controller.pk;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

//当访问一个链接时，这个链接就会去找controller，然后找对应的函数

@Controller
@RequestMapping("/pk/")  //定义映射，父目录，所有的pk都会在这个目录下
public class IndexController {

    @RequestMapping("index/") //pk下的index子目录
    public String index(){
        return "pk/index.html"; //返回的是对应页面的路径，在templates.pk的index.html
    }

}
