import { _decorator, Component, Node } from 'cc';
import { Config } from './Config';
const { ccclass, property } = _decorator;

@ccclass('Get_Data')
export class Get_Data extends Component {

    //写入玩家本地数据 :localStorage.setItem('标题','内容')
    //读取玩家本地数据:localStorage.getItem('标题')

    Name = null
    Group = null    //组数
    Class = null    //类型
    Number = null   //总数
    Time = null

    protected onLoad(): void {
        let Game:any =localStorage.getItem('tudou_Mj')
        if (Game) {
            Game = Config[Game]
            this.Get(Game)
        }
        else{
            localStorage.setItem('tudou_Mj','1')
            Game=Config['1']
            this.Get(Game)
        }
    }
    Get(Game){
        this.Name = Game.Name
        this.Group = Game.Group
        this.Class = Game.Class
        this.Number = Game.Group*3
        this.Time = Game.Time

    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}


