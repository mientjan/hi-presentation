import Stage from "../lib/easelts/display/Stage";
import Touch from "../lib/easelts/ui/Touch";
import ListUtil from "./util/ListUtil";
import ImageSequence from "../lib/easelts/animation/ImageSequence";
import Loader from "./controls/Loader";
import AutoScaleBehavior from "../lib/easelts/behavior/AutoScaleBehavior";
import ScrollingPage from "./page/ScrollingPage";
import KeydownPage from "./page/KeydownPage";

import FollowPointer from "./page/FollowPointer";
import FollowPointer0 from "./page/FollowPointer0";
import FollowPointer1 from "./page/FollowPointer1";
import FollowPointer2 from "./page/FollowPointer2";
import KaleidopussPage from "./page/KaleidopussPage";


class main
{
	stage:Stage;
	
	constructor(){
		this.stage = new Stage(<HTMLBlockElement> document.body, {autoResize:true, autoClear:true});
		this.stage.enableMouseOver(50);
		this.stage.setFps(60);
		this.stage.start();

		Touch.enable(this.stage);


		this.kaleidopussPage();
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


	public followPointer0()
	{
		var page = new FollowPointer0();
		this.stage.addChild(page);
	}


	public followPointer1()
	{
		var page = new FollowPointer1();
		this.stage.addChild(page);
	}


	public followPointer2()
	{
		var page = new FollowPointer2();
		this.stage.addChild(page);
	}

	public kaleidopussPage()
	{
		var page = new KaleidopussPage();
		this.stage.addChild(page);

		page.addBehavior(new AutoScaleBehavior().setAlwaysCover(true));
	}


}

export default main;
