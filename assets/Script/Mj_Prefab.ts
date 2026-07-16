import { _decorator, Component, Layers, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Mj_Prefab')
export class Mj_Prefab extends Component {

    Num=null;

    Ran_Node(Num){
        this.Num=String(Num);
        this.node.getChildByName(this.Num).active=true;
    }

    UI_3Dto2D(){ //将该节点所属层修改为2D
        this.node.getChildByName(this.Num).layer=Layers.Enum.UI_2D;
    }

    UI_2Dto3D(){ //将该节点所属层修改为2D
        this.node.getChildByName(this.Num).layer=Layers.Enum.UI_3D;
    }
    start() {

    }

    update(deltaTime: number) {
        
    }
}


