import { _decorator, Component, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Shot')
export class Shot extends Component {

    Mj_2DList = []  //2D麻将节点

    Get_Node(node){
        this.Mj_2DList.push(node)
        this.Run_Order()
    }

    //for (let X of 数组)	取数组的值（每张牌节点本身）
    //for(let i in 数组)	取数组的下标（0, 1, 2...）
  
    //tween(目标节点).to(时长, 目标属性).start()开始播放

    Run_Order(){  //排列函数
        let Pos_X=-301  //初始X坐标
        for (let X of this.Mj_2DList) {  //遍历麻将列表
           tween(X).to(0.05,{position:new Vec3(Pos_X,0,0)}).start()  //平移动画
            Pos_X+=86;  //坐标自增
        }
    }
    
}


