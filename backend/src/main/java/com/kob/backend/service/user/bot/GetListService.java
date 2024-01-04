package com.kob.backend.service.user.bot;

import com.kob.backend.pojo.Bot;

import java.util.List;


public interface GetListService {
    List<Bot> getList(); //返回用户的所有bot，由于用户的id存在token中，所以不用传参数
}
