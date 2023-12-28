//设置障碍物，画障碍物在GameMap.js中实现
import { AcGameObject } from "./AcGameObject";

//继承AcGameObject类
export class Wall extends AcGameObject{

    //传过来三个参数，坐标以及地图
    constructor(r,c,gamemap){
        //继承基类，必须调用父类的构造函数
        super();
        //先创建的先update，先画出来，因为继承的基类，先执行super()，构造一个父类，所以会先画出背景，
        //然后后面再执行墙的创建，执行update，会覆盖之前创建的

        this.r = r;
        this.c = c;
        this.gamemap = gamemap;
        this.color = "#B37226";

    }


    update(){
        this.render();
    }

    render(){
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;

        ctx.fillStyle = this.color;
        ctx.fillRect(this.c * L,this.r * L,L,L);
    }
}