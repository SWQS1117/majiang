import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Mj_Prefab')
export class Mj_Prefab extends Component {

    Num=null;

    Ran_Node(Num){
        this.Num=String(Num);
        this.node.getChildByName(this.Num).active=true;
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}


