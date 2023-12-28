const AC_GAME_OBJECTS = [];

//实现基类,export出去
export class AcGameObject{
    constructor(){
        AC_GAME_OBJECTS.push(this);
        this.timedelta = 0; //这一帧执行的时刻与上一帧执行的时刻的时间间隔
        this.has_called_start = false; //记录start有没有没执行过
    }


    //只执行一次，即第一帧时执行
    start(){

    }

    //每一帧执行一次，第一帧除外
    update() {
        
    }

    //删除之前执行
    on_destroy() {

    }

    //从AC_GAME_OBJECTS中删除一个对象
    //
    destroy() {

        this.on_destroy();

        for (let i in AC_GAME_OBJECTS){
            const obj = AC_GAME_OBJECTS[i];
            if (obj == this){
                AC_GAME_OBJECTS.splice(i);
                break;
            }
        }
        
    }
}

let last_timestamp; //上一次执行的时刻
//该函数一秒内执行60次
const step = timestamp => {

    //in是去下标，of是取值
    for (let obj of AC_GAME_OBJECTS){
        //判断start是否执行过
        if(!obj.has_called_start){
            obj.has_called_start = true;
            obj.start();
        }
        else {
            
            obj.timedelta = timestamp - last_timestamp;
            obj.update(); 
                
        }
    }
    
    last_timestamp = timestamp;
    requestAnimationFrame(step) //以此实现在每一帧时都会执行step函数
}

//在下一帧时会执行step函数
requestAnimationFrame(step)
//最终的结果是AcGameObject里的对象第一帧时都会执行start函数，后面的每一帧都会执行undate
