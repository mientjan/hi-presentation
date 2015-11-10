import Stage from "../../lib/easelts/display/Stage";

import AutoScaleBehavior from "../../lib/easelts/behavior/AutoScaleBehavior";
import DisplayObject from "../../lib/easelts/display/DisplayObject";
import Point from "../../lib/easelts/geom/Point";
import Container from "../../lib/easelts/display/Container";
import MouseEvent from "lib/easelts/event/MouseEvent";
import ListUtil from "../util/ListUtil";
import ImageSequence from "../../lib/easelts/animation/ImageSequence";
import Loader from "../controls/Loader";
import ButtonBehavior from "../../lib/easelts/behavior/ButtonBehavior";
import RectangleColor from "../../lib/easelts/component/RectangleColor";
import MathUtil from "../../lib/easelts/util/MathUtil";
import SpriteSheet from "../../lib/easelts/display/SpriteSheet";
import * as Functional from "../../lib/createts/util/Functional";
import Bitmap from "../../lib/easelts/display/Bitmap";
import HttpRequest from "../../lib/createts/util/HttpRequest";

class KaleidopussPage extends Container<DisplayObject>
{
	bg:ImageSequence = new ImageSequence(SpriteSheet.createFromString(ListUtil.createList(0, 499, (index) =>
	{
		return 'data/sequence/piday/image/sequence/' + ListUtil.padLeft('' + index, 4, '0') + '.png'
	}), 1280, 720), 24, 1280, 720);

	maskContainer:Container<any> = new Container('100%','100%').setRenderIsolation(true);
	loader:Loader = new Loader('50%', '50%');

	_mask = new RectangleColor('#000', 1280, 720);

	flashLite:ImageSequence = new ImageSequence(SpriteSheet.createFromString(ListUtil.createList(0, 96, (index) =>
	{
		return 'data/sequence/piday/image/preloader/preloader_' + ListUtil.padLeft('' + index, 2, '0') + '.png'
	}), 200, 200), 24, 200, 200);

	flashLite1:RectangleColor = new RectangleColor('#000', 100, 100);

	constructor()
	{
		super(1280, 720, '50%', '50%', '50%', '50%');

		this._mask.alpha = .5;

		this.hitArea = new RectangleColor('#000', '100%', '100%');
		this.hitArea.visible = false;
		this.addChild(this.hitArea);

		this.addChild(this.bg);
		this.addChild(this.maskContainer);
		this.maskContainer.addChild(this._mask);
		this.maskContainer.addChild(this.flashLite);
		this.addChild(this.loader);

		HttpRequest.waitForLoadable([this.bg, this.flashLite], this.loader.setProgress.bind(this.loader)).then(() => {
			this.loader.visible = false;
			this.bg.play(-1);
			this.flashLite.play(-1);
		});

		this.flashLite.setGeomTransform(200, 200, '50%', '50%', '50%', '50%');
		//this.flashLite.compositeOperation = ImageSequence.COMPOSITE_OPERATION_DESTINATION_IN;
		this.flashLite.compositeOperation = ImageSequence.COMPOSITE_OPERATION_DESTINATION_OUT;
		//this.flashLite1.compositeOperation = ImageSequence.COMPOSITE_OPERATION_SOURCE_ATOP;

		this.enableMouseInteraction();

	}

	public draw(ctx, ignore)
	{

		if(super.draw(ctx, ignore))
		{
			return true;
		}

	}

	public setStage(stage)
	{
		super.setStage(stage);
		stage.addEventListener('stagemousemove', (e:MouseEvent) =>
		{
			if(e.nativeEvent)
			{
				//e.nativeEvent.stopPropagation();
			}

			var point = this.maskContainer.globalToLocal(e.rawX, e.rawY);
			this.position.x = point.x
			this.position.y = point.y;


		});
	}

	public position:Point = new Point(0, 0);
	public positionTo:Point = new Point(0, 0);

	public onTick(delta:number)
	{
		super.onTick(delta);
		var x = (this.width/2);
		var y = (this.height/2);

		MathUtil.lerpVector2(this.flashLite, this.position, .1);

		//this.sequence.scaleX = this.sequence.scaleY = x - this.sequence.x, y - this.sequence.y);
		//console.log(x - (this.sequence.x/2), y - (this.sequence.y));

	}


}

export default KaleidopussPage;
