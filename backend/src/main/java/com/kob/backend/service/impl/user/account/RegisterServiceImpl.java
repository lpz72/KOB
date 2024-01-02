package com.kob.backend.service.impl.user.account;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.user.account.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegisterServiceImpl implements RegisterService {
    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Map<String, String> register(String username, String password, String confirmedPassword) {
        Map<String,String> map = new HashMap<>();

        if (username == null){
            map.put("error_message","用户名不能为空");
            return map;
        }

        if (password == null || confirmedPassword == null) {
            map.put("error_message","密码不能为空");
            return map;
        }

        username = username.trim();
        if(username.length() == 0){
            map.put("error_message","用户名不能为空");
            return map;
        }

        if (password.length() == 0 || confirmedPassword.length() == 0){
            map.put("error_message","密码不能为空");
            return map;
        }

        if (username.length() > 100){
            map.put("error_message","用户名长度不能大于100");
            return map;
        }

        if (password.length() > 100 || confirmedPassword.length() > 100) {
            map.put("error_message","密码长度不能大于100");
            return map;
        }

        if (!password.equals(confirmedPassword)){
            map.put("error_message","两次密码不一致");
            return map;
        }

        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        List<User> list = userMapper.selectList(queryWrapper);
        if (!list.isEmpty()){
            map.put("error_message","用户名已存在");
            return map;
        }

        String encodedPassword = passwordEncoder.encode(password); //对密码进行加密
        String photo = "https://cdn.acwing.com/media/user/profile/photo/139053_lg_6f98970e73.jpg";
        //因为已经设置id为自动增加，所以这里id直接设置为null即可
        User user = new User(null,username,encodedPassword,photo);
        userMapper.insert(user);

        map.put("error_message","success");
        return map;

    }
}
