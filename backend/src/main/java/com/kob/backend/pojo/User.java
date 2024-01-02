package com.kob.backend.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data //可以自动生成一些机械化的函数
@NoArgsConstructor //无参构造函数
@AllArgsConstructor //有参构造函数
public class User {

    @TableId(type = IdType.AUTO) //id实现自增
    private Integer id;
    private String username;
    private String password;
    private String photo;

}
