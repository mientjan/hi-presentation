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

class FollowPointer1 extends Container<DisplayObject>
{
	sequence:ImageSequence;
	loader:Loader = new Loader('50%', '50%');
	frames:number = 0;
	scrollPower:number = .1;

	framesPerBlock:number = 50;
	offset:number = 0; //25;
	buffer:HTMLCanvasElement = document.createElement('canvas'); //25;

	constructor()
	{
		super('100%', '100%');

		this.buffer.width = 100;
		this.buffer.height = 100;

		var bitmap = new Bitmap(this.buffer, '100%', '100%');
		this.hitArea = new RectangleColor('#000', '100%', '100%');
		this.addChild(this.hitArea);
		this.hitArea.compositeOperation = FollowPointer1.COMPOSITE_OPERATION_DARKER;
		//this.hitArea.alpha = 0.1;

		this.sequence = new ImageSequence(SpriteSheet.createFromString(ListUtil.createList(0, 96, (index) =>
		{
			return 'data/sequence/piday/image/preloader/preloader_' + ListUtil.padLeft('' + index, 2, '0') + '.png'
		}), 200, 200), 24, 200, 200);

		this.addChild(bitmap);
		this.addChild(this.sequence);
		this.addChild(this.loader);

		this.sequence.load(this.loader.setProgress.bind(this.loader)).then(() =>
		{
			this.loader.visible = false;
			this.frames = this.sequence.getTotalFrames();
			this.sequence.play(-1);
		});
		this.sequence.alpha = 1;

		this.sequence.setGeomTransform(200, 200, '50%', '50%', '50%', '50%');

		this.enableMouseInteraction();


		this.bindEvents();
	}

	public draw(ctx, ignore)
	{
		var canvas = ctx.canvas;

		var x = 0, y = 0, w = this.width * 1.05, h = this.height * 1.05;
		x = (this.width-w) / 2;
		y = (this.height-h) / 2;

		var bctx = this.buffer.getContext('2d');

		//bctx.fillStyle = '#000';



		//bctx.globalAlpha = .1;
		//bctx.fillRect(0, 0, this.width, this.height);
		bctx.globalAlpha = 1;
		bctx.drawImage(canvas, 0, 0, this.width, this.height, x, y, w, h);

		ctx.drawImage(this.buffer, 0, 0, this.width, this.height);

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

			this.position.x = e.getLocalX();
			this.position.y = e.getLocalY();

			console.log(this.position);
		});
	}

	public bindEvents()
	{
		var first = null;
		var dragging:boolean = false;
		var dx:number = 0;
		var dy:number = 0;



	}

	public position:Point = new Point(0, 0);
	public positionTo:Point = new Point(0, 0);



	public onTick(delta:number)
	{
		super.onTick(delta);
		var x = (this.width/2);
		var y = (this.height/2);

		MathUtil.lerpVector2(this.sequence, this.position, .1);
		this.sequence.rotation = Math.atan2(this.sequence.x, this.sequence.y) * 360;
		//this.sequence.scaleX = this.sequence.scaleY = x - this.sequence.x, y - this.sequence.y);
		//console.log(x - (this.sequence.x/2), y - (this.sequence.y));

	}

	public onResize(w, h)
	{
		super.onResize(w, h);

		this.buffer.width = w;
		this.buffer.height = h;
	}

}

export default FollowPointer1;
