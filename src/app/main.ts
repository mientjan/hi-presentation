import Stage from "../lib/easelts/display/Stage";
import Touch from "../lib/easelts/ui/Touch";
import ListUtil from "./util/ListUtil";
import ImageSequence from "../lib/easelts/animation/ImageSequence";
import Loader from "./controls/Loader";
import AutoScaleBehavior from "../lib/easelts/behavior/AutoScaleBehavior";
import ScrollingPage from "./page/ScrollingPage";
import KeydownPage from "./page/KeydownPage";
import FollowPointer from "./page/FollowPointer";

class main
{
	stage:Stage;
	
	constructor(){
		this.stage = new Stage(<HTMLBlockElement> document.body, {autoResize:true, autoClear:false});
		this.stage.enableMouseOver(50);
		this.stage.setFps(60);
		this.stage.start();
		Touch.enable(this.stage);


		this.followPointer();
	}

	public scrollPage()
	{
		var page = new ScrollingPage();
		this.stage.addChild(page);
	}

	public keyDown()
	{
		var page = new KeydownPage();
		this.stage.addChild(page);
	}

	public followPointer()
	{
		var page = new FollowPointer();
		this.stage.addChild(page);
	}
}

export default main;
