import Stage from "../lib/easelts/display/Stage";

import AutoScaleBehavior from "../../lib/easelts/behavior/AutoScaleBehavior";
import DisplayObject from "../../lib/easelts/display/DisplayObject";
import Point from "../../lib/easelts/geom/Point";
import Container from "../../lib/easelts/display/Container";
import MouseEvent from "lib/easelts/event/MouseEvent";
import ListUtil from "../util/ListUtil";
import ImageSequence from "../../lib/easelts/animation/ImageSequence";
import Loader from "../controls/Loader";

class FollowPointer extends Container<DisplayObject>
{
	sequence:ImageSequence;
	loader:Loader = new Loader('50%', '50%');
	frames:number = 0;

	constructor()
	{
		super('100%', '100%');

		this.sequence = ImageSequence.createFromString(ListUtil.createList(500, (index) =>
		{
			return 'data/sequence/piday/image/sequence/' + ListUtil.padLeft('' + index, 4, '0') + '.png'
		}), 24, 1280, 720);

		this.addChild(this.sequence);
		this.addChild(this.loader);

		this.sequence.load(this.loader.setProgress.bind(this.loader)).then(() =>
		{
			this.loader.visible = false;
			this.sequence.play(-1);

			this.frames = this.sequence.getTotalFrames();
		});
		this.sequence.alpha = 1;

		this.sequence.setGeomTransform(1280, 720, '50%', '50%', '50%', '50%');
		this.sequence.addBehavior(new AutoScaleBehavior().setAlwaysCover(true));

	}

	public bindEvents()
	{
		var first = null;
		var dragging:boolean = false;

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
				this.handleDragging(x - first.x, y - first.y, dragging);

				first.x = x;
				first.y = y;
			}
		});

		this.addEventListener(DisplayObject.EVENT_PRESS_UP, (e:MouseEvent) =>
		{
			first = null;
			dragging = false;
			this.handleDragging(first.x, first.y, dragging)
		})
	}

	public position:Point = new Point(0, 0);

	public handleDragging(dx:number, dy:number, dragging:boolean)
	{
		this.position.x += dx;
		this.position.y += dy;
	}

	public onTick(delta)
	{
		super.onTick(delta);

		var framePerPosition = 2;


	}
}

export default FollowPointer;
