import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { Mj_Prefab } from './Mj_Prefab';
import { MJ_Into } from './Mj_Into';
import { Mj_Click } from './Mj_Click';
const { ccclass, property } = _decorator;

@ccclass('Shot')
export class Shot extends Component {

    Mj_2DList = []  //2D麻将节点列表

    Get_Node(node){
        this.Set_Order(node)  // 先把牌插入到正确的位置
        this.node.getComponent(Mj_Click).off() //关闭监听
        this.Run_Order()      // 再重新排列所有牌
        this.schedule(()=>{this.Clear_OK(this.Run_Clear(node))},0.1)
        
    }

    Clear_OK(x){
        if (x==1) {
           this.node.getComponent(Mj_Click).on() 
        }
        else if(x==2){
            this.node.getComponent(Mj_Click).on() 
        }
        else if(x==3){
            this.node.getComponent(Mj_Click).on() 
        }
    }
    //设置排列顺序
    //1,先获取新麻将的编号
    //2,再遍历当前麻将列表的麻将编号
    //3,对比当前麻将列表内的麻将编号是否和新麻将编号相同
    //4,如果卡槽内有相同的麻将编号,就把新麻将追加到相同麻将编号的后面
    //5,如果没有相同的麻将,就正常追加到麻将列表
    
    //for (let X of 数组)	取数组的值（每张牌节点本身）
    //for(let i in 数组)	取数组的下标（0, 1, 2...）
    //tween(目标节点).to(时长, 目标属性).start()开始播放
     Set_Order(node:Node){  //设置排列顺序
        const list =this.Mj_2DList  //接收麻将列表
        const num=node.getComponent(Mj_Prefab).Num  //获取新麻将的编号
        for (let i = list.length-1; i >=0; i--) {
            if (num==list[i].getComponent(Mj_Prefab).Num) {
                list.splice(i+1,0,node)
                return
            }
            
        }
        list.push(node)
    }

    Run_Order(){  //排列函数
        let Pos_X=-301  //初始X坐标
        for (let X of this.Mj_2DList) {  //遍历麻将列表
           tween(X).to(0.05,{position:new Vec3(Pos_X,0,0)}).start()  //平移动画
            Pos_X+=86;  //坐标自增
        }
    }

    Run_Clear(node:Node){ //消除函数
        if (this.Mj_2DList.length<3) { return 1  }  //如果卡槽没有3个麻将
        let  lie =[]  //创建临时空列表 存放相同麻将节点
        const num =node.getComponent(Mj_Prefab).Num  //获取新麻将编号
        for (let X of this.Mj_2DList) {  //遍历卡槽列表
            if (num==X.getComponent(Mj_Prefab).Num) {
                lie.push(X)

            }
        }
        if (lie.length<3) {return 2 } 
        for (let i = 0; i < 3; i++) {//循环三次
            const x =lie[i] //获取相同麻将节点
            this.node.getComponent(MJ_Into).Mj_Nodepool.put(x)  //回收麻将节点
            this.Mj_2DList=this.Mj_2DList.filter(itme =>itme!==x) //卡槽列表删除
            
        }
        this.Run_Order() //重新排列
        return 3
    }
   
    
}


