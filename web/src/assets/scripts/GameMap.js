import  { AcGameObject } from "./AcGameObject";
import { Snake } from "./Snake";
import { Wall } from "./Wall";

export class GameMap extends AcGameObject{
    //传两个参数,ctx：画布，parent:画布的父元素，可以动态改变画布的大小
    constructor(ctx,parent,store){
        super(); //执行基类的构造函数

        this.ctx = ctx;
        this.parent = parent;
        this.L = 0; //地图中每个小方格的长度

        this.rows = 13;
        this.cols = 14;
        this.store = store;
        this.walls = []; //障碍物数组
        this.inner_walls_count = 20; //定义内部障碍物的数量

        this.snakes = [
            new Snake({id: 0,color: "#4876EC",r: this.rows - 2, c: 1},this),
            new Snake({id: 1,color: "#F94848",r: 1,c: this.cols - 2},this),
        ];
    }

    //判断左下角与右上角是否联通
    // check_connectivity(g,sx,sy,tx,ty){

    //     if (sx == tx && sy == ty) return true;
    //     g[sx][sy] = true;

    //     let dx = [-1,1,0,0],dy = [0,0,1,-1];

    //     for (let i = 0;i < 4;i ++){
    //         let x = sx + dx[i],y = sy + dy[i];
    //         if (!g[x][y] && this.check_connectivity(g,x,y,tx,ty))
    //          return true;
    //     }

    //     return false;

    // }

    // create_walls() {
    //     const g = [];
    //     for (let r = 0;r < this.rows;r ++){
    //         g[r] = [];
    //         for (let c = 0;c < this.cols;c ++)
    //             g[r][c] = false;
    //     }

    //     //给四周加上墙
    //     for (let r = 0;r < this.rows;r ++) g[r][0] = g[r][this.cols - 1] = true;
    //     for (let c = 0;c < this.cols;c ++) g[0][c] = g[this.rows - 1][c] = true;

    //     //随机生成障碍物,以对角线为轴，对称填充
    //     for (let i = 0;i < this.inner_walls_count / 2;i ++){
    //         //在1000次内总能找到一个没有障碍物的方格
    //         for (let j = 0;j < 1000;j ++){
    //             //random会生成[0,1)内的随机数，乘以行数取整即可生成this.rows-1内的任意一行
    //             let r = parseInt(Math.random() * this.rows);
    //             let c = parseInt(Math.random() * this.cols);

    //             if(g[r][c] || g[this.rows - 1 - r][this.cols - 1 - c]) continue;

    //             //左下角和右上角作为双方蛇的出生地，不能被填充障碍物
    //             if(r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2) continue;

    //             g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
    //             break;
    //         }
    //     }

    //     const copy_g = JSON.parse(JSON.stringify(g)); //复制并重新生成一个全新数组
    //     if (!this.check_connectivity(copy_g,this.rows - 2,1,1,this.cols - 2)) return false;

    //     for (let r = 0;r < this.rows;r ++)
    //         for (let c = 0;c < this.cols;c ++){
    //             if (g[r][c]){
    //                 this.walls.push(new Wall(r,c,this));
    //             }
    //         }

    //     return true;
    // }

    create_walls() {
       const g = this.store.state.pk.gamemap;


        for (let r = 0;r < this.rows;r ++)
            for (let c = 0;c < this.cols;c ++){
                if (g[r][c]){
                    this.walls.push(new Wall(r,c,this));
                }
            }

        return true;
    }
    //监听键盘输入
    add_listening_events() {
        //令canvas聚焦
        this.ctx.canvas.focus();

        const [snake0,snake1] = this.snakes;
        this.ctx.canvas.addEventListener('keydown', e => {
            if (e.key === 'w') snake0.set_direction(0);
            else if (e.key === 'd') snake0.set_direction(1);
            else if (e.key ==='s') snake0.set_direction(2);
            else if (e.key === 'a') snake0.set_direction(3);
            else if (e.key === 'ArrowUp') snake1.set_direction(0);
            else if (e.key ==='ArrowRight') snake1.set_direction(1);
            else if (e.key === 'ArrowDown') snake1.set_direction(2);
            else if (e.key === 'ArrowLeft') snake1.set_direction(3);
        });
    }

    start() {
        //只有生成的地图联通才可以,否则，一直生成，直到联通，1000次大概率可以联通
        // for (let i = 0;i < 1000;i ++){
        //     if (this.create_walls())
        //       break;
        // }

        this.create_walls();

        this.add_listening_events();
    }

    //求每个小方格的长宽，parent是div，即背景画布,canvas的父元素
    update_size(){
        //fillRect画的是整像素，parseInt取整像素，不然相邻方格之间会有白缝(浮点数造成的)
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        //求正方形地图
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;


    }

    check_ready(){
        // 判断两条蛇是否都已经准备好了下一回合
        for (const snake of this.snakes){
            //js中判断不相等需要两个等号，相等需要三个等号
            if (snake.status !== "idle") return false; //不是静止
            if (snake.direction === -1) return false; //静止但没有收到指令
        }

        return true;
    }


    next_step() {
        //让两条蛇进入下一回合
        for (const snake of this.snakes){
            snake.next_step(); //调用的是Snake.js中的next_step
        }
    }

    //检测目标位置是否合法：没有撞到蛇尾和障碍物
    check_valid(cell){

        for (let wall of this.walls){
            if (wall.r === cell.r && wall.c === cell.c)
                return false;
        }

        for (let snake of this.snakes){
            let k = snake.cells.length;
            if (!snake.check_tail_increasing()){ //当蛇尾会前进时，蛇尾不需要判断
                k --;
            }

            for (let i = 0;i < k;i ++)
             if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
              return false;
        }

        return true;
    }


    update() {
        this.update_size();
        //当两条蛇准备好了
        if (this.check_ready()){
            this.next_step();
        }
        this.render();
    }



    //渲染，即把当前的游戏对象画到地图上
    render() {
        //奇数格涂浅色，偶数格涂深色，打开qq截图，ctrl+shift+c可以吸取颜色
        const color_even = "#AAD751",color_odd = "#A2D149";
        for (let r = 0;r < this.rows;r ++)
            for (let c = 0;c < this.cols;c ++){
                if ((r + c) % 2 == 0){
                    this.ctx.fillStyle = color_odd; //填充颜色
                }
                else {
                    this.ctx.fillStyle = color_even;
                }
                //canvas向下是y轴，向右是x轴，将方格画出来
                this.ctx.fillRect(c * this.L,r * this.L,this.L,this.L);
            }
        
    }
}
