package com.kob.backend.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.backend.mapper.UserMapper;
import com.kob.backend.pojo.User;
import com.kob.backend.service.impl.utils.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
//修改Spring Security
//实现UserDetailsServiceImpl类，继承自UserDetailsService接口，用来接入数据库信息
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //传进来一个用户名，返回该用户名相关的信息
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username",username);
        User user = userMapper.selectOne(queryWrapper);

        if (user == null){
            throw new RuntimeException("用户不存在");
        }

        //否则，根据用户名返回一个用户的信息，并根据返回的密码与输入的密码判断是否相等，UserDetailsImpl是实现的UserDetails接口
        return new UserDetailsImpl(user);
    }
}
