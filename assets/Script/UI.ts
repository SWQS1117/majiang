import { _decorator, Component, director, Label, Node } from 'cc';
import { Get_Data } from './Get_Data';
import { Mj_Click } from './Mj_Click';
const { ccclass, property } = _decorator;

@ccclass('UI')
export class UI extends Component {
    @property(Label)
    Name_Label:Label = null
    @property(Label)
    Number_Label:Label = null
    @property(Label)
    Time_Label:Label = null

    @property(Node)
    Win_Node: Node = null

    Name = null
    Number = null
    Time = null

    start() {

    }
    Init(){
        this.Name=this.node.getComponent(Get_Data).Name
        this.Number=this.node.getComponent(Get_Data).Number
        this.Time=this.node.getComponent(Get_Data).Time
        this.Name_Label.string=this.Name
        this.Number_Label.string='剩余数量：'+this.Number
        this.Time_Label.string=this.Time
    }

    Up_Number(){
        this.Number-=3
        this.Number_Label.string='剩余数量：'+this.Number
        if (this.Number>0) {
            this.node.getComponent(Mj_Click).on()
        }
        else{
            this.Win()
        }
    }

    Win(){   //过关
        this.Win_Node.active= true
    }

    Next_Game(){
        let Game:any=localStorage.getItem('tudou_Mj')  //读取本地关数
        Game = Number(Game)+1   //Game转成数字再加1
        localStorage.setItem('tudou_Mj',String(Game))
        director.loadScene('C1')
    }


}


