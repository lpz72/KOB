package com.kob.backend.controller.user;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@Mapper
public class UserController {

    //引入数据库接口时需要加入的注解
    @Autowired
    UserMapper userMapper; //调用数据库的接口，可用于实现增删改查，里面有具体的方法

    @GetMapping("/user/all/") //请求名+Mapping,得到该类型请求的映射
    public List<User> getAll(){
        return userMapper.selectList(null);
    }

    //查看某个用户的信息
    //@PathVariable 的作用是取得{userId}里userId的值
    @GetMapping("/user/{userId}/")
    public User getuser(@PathVariable int userId) {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>(); // QueryWrapper是条件构造器，用于生成where条件
        queryWrapper.eq("id",1);
        return userMapper.selectOne(queryWrapper);
    }

    //增加一个用户
    @GetMapping("/user/adduser/{userId}/{username}/{password}/")
    public String addUser(
            @PathVariable int userId,
            @PathVariable String username,
            @PathVariable String password
    ){
        if (password.length() < 6){
            return "密码太短";
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String s = passwordEncoder.encode(password); //创建一个用户时，密码以密文形式存储
        User user = new User(userId,username,s);
        userMapper.insert(user);
        return "add user successful";
    }

    //删除一个用户
    @GetMapping("/user/delete/{userId}/")
    public String deleteUser(@PathVariable int userId){
        userMapper.deleteById(userId);
        return "delete user successful";

    }
}
