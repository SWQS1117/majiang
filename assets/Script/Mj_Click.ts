import { _decorator, Camera, Component, EventTouch, geometry, Input, input, Node, PhysicsSystem } from 'cc';
import { Mj_Prefab } from './Mj_Prefab';
const { ccclass, property } = _decorator;

@ccclass('Mj_Click')
export class Mj_Click extends Component {

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

    Ray=new geometry.Ray()  //创建射线

    @property(Camera)
    c:Camera=null;





    //麻将触摸脚本
    on(){
        input.on(Input.EventType.TOUCH_END,this.TOUCH_END,this)

    }
    off(){
        input.off(Input.EventType.TOUCH_END,this.TOUCH_END,this)
    }

    TOUCH_END(e:EventTouch){
         this.c.screenPointToRay(e.getLocationX(),e.getLocationY(),this.Ray)  //发射射线
         if (PhysicsSystem.instance.raycastClosest(this.Ray)) {
            const node:Node=PhysicsSystem.instance.raycastClosestResult.collider.node;
            if (node.name=='MJ_Prefab') {
                console.log(node.getComponent(Mj_Prefab).Num)

            }


         }
    }
    protected onDestroy(): void {
        input.off(Input.EventType.TOUCH_END,this.TOUCH_END,this)
    }
    start() {

    }

    update(deltaTime: number) {

    }
}

