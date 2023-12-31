//蛇
import { AcGameObject } from "./AcGameObject";
import { Cell } from "./Cell";

export class Snake extends AcGameObject{
    constructor(info,gamemap){
        super();

        this.id = info.id;
        this.color = info.color;
        this.gamemap = gamemap;

        this.cells = [new Cell(info.r,info.c)]; //存放蛇的身体，cell[0]存放蛇头
        this.next_cell = null;
        this.speed = 5; //蛇每秒钟移动5个格子
        this.direction = -1; //-1表示没有指令,0,1,2,3表示上右下左
        this.status = "idle"; //idle表示静止,move表示正在移动,die表示死亡

        this.dr = [-1,0,1,0]; //四个方向行的偏移量
        this.dc = [0,1,0,-1]; //四个方向列的偏移量

        this.step = 0; //回合数
        this.eps = 1e-2; //允许的误差

        this.eye_direction = 0;
        if (this.id == 1) this.eye_direction = 2; //左下角的蛇眼睛初始朝上，右上角的蛇初始朝下

        //这里眼睛就定在与圆心和水平线夹角45度的方向上
        this.eye_dx = [ // 蛇眼睛不同方向相对于圆心的x的偏移量，[左眼，右眼]
            [-1,1,],
            [1,1],
            [1,-1],
            [-1,-1]
        ];

        this.eye_dy = [ // 蛇眼睛不同方向相对于圆心的x的偏移量，[左眼，右眼]
            [-1,-1],
            [-1,1],
            [1,1],
            [1,-1]
        ];

    }

    start(){

    }

    set_direction(d){
        this.direction = d;

    }

    check_tail_increasing(){ //检测当前回合蛇的长度是否需要增加
        if(this.step <= 10) return true; //前10步，每步增加1
        if (this.step % 3 == 1) return true; //后面每三步增加1

        return false;

    }

     //让蛇的状态变为走下一步
    next_step(){
        const d = this.direction;
        this.next_cell = new Cell(this.cells[0].r + this.dr[d],this.cells[0].c + this.dc[d]);
        this.eye_direction = d; //更新蛇头方向
        this.direction = -1; //清空操作
        this.status = "move";
        this.step ++; //回合数加1

    
        const k = this.cells.length;
        for (let i = k; i > 0; i -- ) {
            this.cells[i] = JSON.parse(JSON.stringify(this.cells[i - 1]));
        }

        if (!this.gamemap.check_valid(this.next_cell)){ //下一步撞了，蛇直接去世
            this.status = "die";
        }

    }

    update_move(){
        //计算偏移量,方便下面计算真实移动距离，利用cos = dx / distance,sin = dy / distance
        const dx = this.next_cell.x - this.cells[0].x;
        const dy = this.next_cell.y - this.cells[0].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        //判断是否走到目标点
        if (distance < this.eps){
            this.cells[0] = this.next_cell; //添加一个新蛇头
            this.next_cell = null;
            this.status = "idle"; //走完了，停下来

            if (!this.check_tail_increasing()){ //蛇不变长，将原先的最后一个球弹出，实现蛇尾向前移动
                this.cells.pop();
            }
        }
        else {
            const move_distance = this.speed * this.timedelta / 1000; //每两帧之间移动的距离
            this.cells[0].x += move_distance * dx / distance;
            this.cells[0].y += move_distance * dy / distance;

            if (!this.check_tail_increasing()){
                const k = this.cells.length;
                const tail = this.cells[k - 1],tail_target = this.cells[k - 2];
                const tail_dx = tail.x - tail_target.x;
                const tail_dy = tail.y - tail_target.y;
                tail.dx += move_distance * tail_dx / distance; //得到目标点坐标
                this.dy += move_distance * tail_dy / distance
            }
        }

        //timedelta是两帧之间的时间间隔，单位是ms，转换成s
        //由于是每帧都在刷新蛇的位置，所以是速度乘上帧间间隔
       // this.cells[0].x += this.speed * this.timedelta / 1000;
    }

    update() { //每一帧都会执行
        //console.log(this.status);
        if (this.status === "move"){
             this.update_move();
        }
        this.render();
    }

    render(){

        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = this.color; //该蛇的颜色

        if (this.status === "die"){
            ctx.fillStyle = "white"; //蛇死亡则变成白色
        }

        //画蛇的身体
        for (const cell of this.cells){
            //画圆弧
            ctx.beginPath();
            ctx.arc(cell.x * L,cell.y * L,L / 2 * 0.8,0,Math.PI * 2);
            //前两个是圆的中点坐标，由于存时是按照数组的坐标存储的，
            //所以还需乘上每个单元格的长度才是真实的坐标
            //第三个参数是圆的半径
            //第四个参数是开始角度，第五参数是结束角度(2pai)
            ctx.fill(); //填充颜色
        }

        //用长方形填充蛇，使蛇更饱满
        for (let i = 1;i < this.cells.length;i ++){
            const a = this.cells[i - 1],b = this.cells[i];
            //两点重合时不需要填充
            if (Math.abs(a.x - b.x) < this.eps && Math.abs(a.y - b.y) < this.eps){
                 continue;
            }
             //竖直方向时
            if (Math.abs(a.x - b.x) < this.eps){
                //四个参数：前两个是坐标，后面是长和宽
                ctx.fillRect((a.x - 0.5 + 0.1) * L,Math.min(a.y,b.y) * L,L * 0.8,Math.abs(a.y - b.y) * L);
            } else { //水平方向时
                ctx.fillRect(Math.min(a.x,b.x) * L,(a.y - 0.5 + 0.1) * L,Math.abs(a.x - b.x) * L, L * 0.8);
            }
        }

        //画蛇眼睛
        ctx.fillStyle = "black";
        for (let i = 0;i < 2;i ++){
            const eye_x = (this.cells[0].x + this.eye_dx[this.eye_direction][i] * 0.15) * L;
            const eye_y = (this.cells[0].y + this.eye_dy[this.eye_direction][i] * 0.15) * L;
            ctx.beginPath();
            ctx.arc(eye_x,eye_y,L * 0.05,0,Math.PI * 2);
            ctx.fill(); 
        }

    }
}