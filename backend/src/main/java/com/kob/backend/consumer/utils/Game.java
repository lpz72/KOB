package com.kob.backend.consumer.utils;

import java.util.Random;

public class Game {
    private Integer rows;
    private Integer cols;
    private Integer inner_walls_count;
    private int[][] g;
    private static int dx[] = {-1,0,1,0},dy[] = {0,1,0,-1};

    public Game(Integer rows,Integer cols,Integer inner_walls_count){
        this.rows = rows;
        this.cols = cols;
        this.inner_walls_count = inner_walls_count;
        this.g = new int[rows][cols];
    }

    public int[][] getG(){
        return g;
    }

    private boolean check_connectivity(int sx,int sy,int tx,int ty){
        if(sx == tx && sy == ty) return true;
        g[sx][sy] = 1;

        for (int i = 0;i < 4;i ++){
            int x = sx + dx[i],y = sy + dy[i];
            if(x >= 0 && x < rows && y >= 0 && y < cols && g[x][y] == 0){
                if (check_connectivity(x,y,tx,ty)){
                    g[sx][sy] = 0;
                    return true;
                }
            }
        }

        g[sx][sy] = 0;
        return false;
    }

    //画地图
    private boolean draw(){
        for (int i = 0;i < rows;i ++){
            for (int j = 0;j < cols;j ++){
                g[i][j] = 0;
            }
        }

        for (int i = 0;i < cols;i ++) g[0][i] = g[rows - 1][i] = 1;
        for (int i = 0;i < rows;i ++) g[i][0] = g[i][cols - 1] = 1;

        Random random = new Random();
        for (int i = 0;i < inner_walls_count / 2;i ++){
            for  (int j = 0;j < 1000;j ++){
                int r = random.nextInt(rows);
                int c = random.nextInt(cols);

                if (g[r][c] == 1 || g[rows - 1 - r][cols - 1 - c] == 1) continue;
                if (r == rows - 2 && c == 1 || r == 1 && c == cols - 2) continue;

                g[r][c] = g[rows - 1 - r][cols - 1 - c] = 1;
                break;
            }
        }

        return check_connectivity(rows - 2,1,1,cols - 2);

    }

    public void createMap(){
        for (int i = 0;i < 1000;i ++){
            if (draw()) break;
        }
    }
}
