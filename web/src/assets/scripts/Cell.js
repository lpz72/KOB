//地图上的格子
export class Cell{
    constructor(r,c){
        this.r = r;
        this.c = c;
        //canva(画布)的坐标与数组的坐标不一致，画布横着是x，竖着是y，需进行转换，得到的是格子左上角坐标
        //+0.5得到格子的中心坐标
        this.x = c + 0.5;
        this.y = r + 0.5;
    }
}