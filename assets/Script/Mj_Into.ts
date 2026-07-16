import { _decorator, Component, instantiate, math, Node, NodePool, Prefab, RigidBody, Vec3 } from 'cc';
import { Mj_Prefab } from './Mj_Prefab';
import { Mj_Click } from './Mj_Click';

const { ccclass, property } = _decorator;

@ccclass('MJ_Into')
export class MJ_Into extends Component {
    //麻将初始化脚本

    //节点池：NodePool  
    //用于管理节点的缓存池，避免反复创建/销毁节点。节约游戏性能
    //创建节点池；节点池=new NodePool()
    //回收节点池： 节点池.put(要回收的节点)
    //获取节点池： 节点池.get() 从节点池获取1个节点


    @property(Prefab) //麻将预制体
    Mj_Prefab:Prefab=null;

    Mj_Nodepool:NodePool=null; //节点池对象

    Mj_Ran=[] //随机麻将编号列表

    start() {  //执行初始化函数
        this.Run_Into();
    }

    Run_Into() {  //初始化函数
        let Number = 90; //生成麻将总数
        let Group = 30; //生成麻将的组数
        let Class = 42; //生成麻将类型数量
        this.Run_ran(Group,Class); // 去随机麻将编号到列表
        this.Run_Pool(Number);  //初始化麻将池
        this.Run_Send(this.Mj_Ran);  //初始化麻将发牌
    }
    Run_ran(Group,Class){ //去随机麻将将编号到列表
        for (let x = 0; x < Group; x++) {  //循环组数 
            let B =Math.floor(Math.random()*Class)+1;     //随机麻将编号  Math.floor(...)向下取整，去掉小数部分  Math.random() * Class把小数放大到 [0, Class) 范围
            for (let d = 0; d <3; d++) {  // 循环三次  （三消麻将）
                this.Mj_Ran.push(B);

            }
        }

    }

    Run_Pool(Number){  //初始化麻将节点池
        this.Mj_Nodepool=new NodePool(); //创建节点池
        for (let index = 0; index < Number; index++) {   //循环Number次（和生成数量保持一致）
            let Node=instantiate(this.Mj_Prefab)    //克隆麻将池节点
            this.Mj_Nodepool.put(Node);            //将克隆节点放在节点池
        }

    }

    Run_Send(Ran){ //发牌函数
       let Speed=6;                      //发牌速度初始值
       let Rad=0;                      //发牌弧度初始值
       let H=0;                         //发牌高度初始值
       let R=0.5;                         //发牌半径初始值
       let Step=20;                      //发牌角度间隔初始值
       for (let i = Ran.length-1; i > 0; i--) {
            const j=Math.floor(Math.random()*(i+1));
            [Ran[i],Ran[j]]= [Ran[j],Ran[i]]
        
       } 

       const Send =()=>{   //循环执行每部函数
            const number =Ran.pop()   //取出1个随机编号并从列表删除 
            
            if (!number) {   //如果随机列表空了
                this.unschedule(Send);  //停止循环函数
                this.node.getComponent(Mj_Click)?.on();  //发牌停止可以点击
                return;  
            }


            const node:Node=this.Mj_Nodepool.get()  //从节点池取出一个节点
            node.setParent(this.node);
            node.getComponent(Mj_Prefab).Ran_Node(number);
            let X=Math.cos(Rad)*R  //X坐标（计算弧度和半径）
            let Z=Math.sin(Rad)*R  //Z坐标（计算弧度和半径）
            let Y=1 + H++ / 80    //Y坐标（计算高度，值越小麻将高度越高
            node.setPosition(X,Y,Z) //设置节点位置
            let body =node.getComponent(RigidBody);  //获取麻将父节点刚体组件
            body.setLinearVelocity(new Vec3(X*Speed,0,Z*Speed)) //设置刚体线性速度
            Rad +=(Step*Math.PI)/180  // 弧度自增
       }
       this.schedule(Send,0.01)

    }

     protected onDestroy(): void {
        this.Mj_Nodepool.clear() // 清除节点池
        this.Mj_Nodepool=null;      //清空重新复制

    }
    update(deltaTime: number) {
        
    }
   
}


