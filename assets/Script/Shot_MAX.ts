import { _decorator, Component, director, Node } from 'cc';
import { Mj_Prefab } from './Mj_Prefab';
import { Mj_Click } from './Mj_Click';
const { ccclass, property } = _decorator;

@ccclass('Shot_MAX')
export class Shot_MAX extends Component {
    //卡槽上限控制脚本
    Max_Num = 6
    
    @property(Node)
    Unlk_1:Node =null  //导入解锁1
    @property(Node)
    Unlk_2:Node =null  //导入解锁2
    @property(Node)
    Unlk_Max_UI_node=null  //卡槽满游戏失败ui界面
    start() {

    }
    Max(Num){
        if (Num>=this.Max_Num) {
            this.Unlk_Max_UI_node.active=true
        }
        else{
            this.node.getComponent(Mj_Click).on()
        }
    }

    Unlk_AD(){ //分享或广告
        console.log('这里写分享函数')
        this.scheduleOnce(()=>{this.Unlk()
        },0.01)
    }

    Unlk(){ //解锁卡槽上限函数
        if (this.Max_Num==6) { //如果玩家还没有解锁过
            this.Unlk_1.active=false
            this.Max_Num=7
        }
        else if (this.Max_Num==7) {
            this.Unlk_2.active=false
            this.Max_Num=8
        }
    }

    RST(){
        director.loadScene('C1')  //加载切换场景
    }
    update(deltaTime: number) {
        
    }
}


