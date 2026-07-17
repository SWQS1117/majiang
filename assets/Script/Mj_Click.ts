import { _decorator, BoxCollider, Camera, Component, EventTouch, geometry, Input, input, Node, PhysicsSystem, RigidBody, Vec3 } from 'cc';
import { Mj_Prefab } from './Mj_Prefab';
import { Shot } from './Shot';
const { ccclass, property } = _decorator;

@ccclass('Mj_Click')
export class Mj_Click extends Component {
    //触摸检测和碰撞检测

    // 触摸结束监听类型:Input.EventType.ToUCH_END
    // 射线检测流程:(原理:创建射线、检测射线击中的碰撞体、获取碰撞体信息)
    // 创建射线对象:Ray =new geometry.Ray()
    // 获取相机组件 Camera
    // 发射射线:相机组件.screenPointToRay(触摸的x坐标，触摸的y坐标，射线对象)
    // 发射射线说明:3D相机节点位置是射线起始点，方向是触摸位置的3D空间方向(无限穿透)
    // 检测射线上最近的碰撞体:PhysicsSystem.instance.raycastClosest(需要检测的射线)
    // 返回 true 表示射线击中了碰撞体
    // 碰撞体信息: PhysicsSystem.instance.raycastclosestResult
    // 返回 false表示射线没有检测到碰撞体
    // 获取被击中到的碰撞组件/节点:碰撞体信息.collider/碰撞体信息.collider.node

    // 3D节点转2D节点:

    // 关闭39节点刚体和碰撞组件:组件.enabled=false
    // 节点添加3D渲染转2D渲染组件:UIMeshRenderer
    // 修改节点所属层为2D:节点.layer=Layers.Enum.UI_2D
    // 3D坐标转2D本地坐标(根据父节点):相机组件.convertToUINode(3D坐标,2D父节点)
    // 设置2D节点：2D坐标、父节点、缩放、旋转

    Ray=new geometry.Ray()  //创建射线

    @property(Camera)
    c:Camera=null;

    @property(Node)
    Mj_2D:Node=null;




    //麻将触摸脚本
    on(){
        input.on(Input.EventType.TOUCH_END,this.TOUCH_END,this)

    }
    off(){ 
        input.off(Input.EventType.TOUCH_END,this.TOUCH_END,this)
    }

    TOUCH_END(e:EventTouch){
         this.c.screenPointToRay(e.getLocationX(),e.getLocationY(),this.Ray)  //发射射线
         if (PhysicsSystem.instance.raycastClosest(this.Ray)) { //检测射线上的最近的碰撞
            const node:Node=PhysicsSystem.instance.raycastClosestResult.collider.node;  
            if (node.name=='MJ_Prefab') { //如果碰撞体节点是麻将
                this.Mj_3Dto2D(node)

            }


         }
    }

    Mj_3Dto2D(node:Node){
        node.getComponent(RigidBody).enabled=false;
        node.getComponent(BoxCollider).enabled=false;
        node.getComponent(Mj_Prefab).UI_3Dto2D();
        let Pos_3D=node.getWorldPosition();   //麻将当前的3D世界坐标
        let Pos_2D=this.c.convertToUINode(Pos_3D,this.Mj_2D)  //转成在UI父节点下的2D坐标

        node.setParent(this.Mj_2D) //先设置父节点
        node.setPosition(Pos_2D) //再设置2D麻将坐标
        node.setScale(102,102,102) //设置缩放
        node.eulerAngles=new Vec3(90,0,0) //设置旋转

        this.node.getComponent(Shot).Get_Node(node) //传入节点到卡槽

    }
    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_END,this.TOUCH_END,this)
    }
    start() {

    }

    update(deltaTime: number) {

    }
}

