import Stage from "../lib/easelts/display/Stage";
import ListUtil from "./util/ListUtil";
import ImageSequence from "../lib/easelts/animation/ImageSequence";
import Loader from "./controls/Loader";
import AutoScaleBehavior from "../lib/easelts/behavior/AutoScaleBehavior";

class main
{
	stage:Stage;
	
	constructor(){
		this.stage = new Stage(<HTMLBlockElement> document.body, {autoResize:true, autoClear:true});
		this.stage.start();
	}
}

export default main;
