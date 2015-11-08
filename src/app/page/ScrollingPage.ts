import Stage from "../lib/easelts/display/Stage";

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

class ScrollingPage extends Container<DisplayObject>
{
	sequence:ImageSequence;
	loader:Loader = new Loader('50%', '50%');
	frames:number = 0;
	scrollPower:number = .1;
	framesPerBlock:number = 50;

	constructor()
	{
		super('100%', '100%');

		this.hitArea = new RectangleColor('#000', '100%', '100%');
		this.addChild(this.hitArea);
		this.hitArea.visible = false;

		this.sequence = new ImageSequence(SpriteSheet.createFromString(ListUtil.createList(0, 499, (index) =>
		{
			return 'data/sequence/piday/image/sequence/' + ListUtil.padLeft('' + index, 4, '0') + '.png'
		}), 1280, 720), 24, 1280, 720);

		this.addChild(this.sequence);
		this.addChild(this.loader);

		this.sequence.load(this.loader.setProgress.bind(this.loader)).then(() =>
		{
			this.loader.visible = false;
			this.frames = this.sequence.getTotalFrames();
		});
		this.sequence.alpha = 1;

		this.sequence.setGeomTransform(1280, 720, '50%', '50%', '50%', '50%');
		this.sequence.addBehavior(new AutoScaleBehavior().setAlwaysCover(true));

		this.enableMouseInteraction();
		this.addBehavior(new ButtonBehavior());

		this.bindEvents();
	}

	public bindEvents()
	{
		var first = null;
		var dragging:boolean = false;
		var dx:number = 0;
		var dy:number = 0;

		this.addEventListener(DisplayObject.EVENT_MOUSE_DOWN, (e:MouseEvent) =>
		{
			if(e.nativeEvent)
			{
				e.nativeEvent.stopPropagation();
			}
			dragging = true;
		});

		this.addEventListener(DisplayObject.EVENT_PRESS_MOVE, (e:MouseEvent) =>
		{
			if(e.nativeEvent)
			{
				e.nativeEvent.stopPropagation();
			}

			var x = e.stageX;
			var y = e.stageY;

			if(!first)
			{
				first = new Point(x, y);
			}
			else
			{
				dx = x - first.x;
				dy = y - first.y;

				this.handleDragging(dx, dy, dragging);

				first.x = x;
				first.y = y;
			}
		});

		this.addEventListener(DisplayObject.EVENT_PRESS_UP, (e:MouseEvent) =>
		{
			dragging = false;
			first = null;
		})
	}

	public position:Point = new Point(0, 0);
	public positionTo:Point = new Point(0, 0);

	public handleDragging(dx:number, dy:number, dragging:boolean)
	{
		this.position.x += dx*this.scrollPower;
		this.position.y += dy*this.scrollPower;

		this.position.x = MathUtil.clamp(this.position.x, 0, this.frames - 1);
		this.position.y = MathUtil.clamp(this.position.y, 0, this.frames - 1);

		//var y = Math.ceil(this.position.y / this.framesPerBlock);
		//this.position.y = (this.position.y % this.framesPerBlock) * y;
	}

	public onTick(delta)
	{
		super.onTick(delta);

		if(this.sequence.isLoaded)
		{
			var framePerPosition = 2;


			this.positionTo.y = MathUtil.lerp(this.positionTo.y, this.position.y, 1);
			this.sequence.gotoAndStop(this.positionTo.y|0);

		}
	}
}

export default ScrollingPage;
