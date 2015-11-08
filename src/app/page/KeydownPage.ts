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
import KeyCode from "../../lib/keys/KeyCode";
import SpriteSheet from "../../lib/easelts/display/SpriteSheet";
import Sprite from "../../lib/easelts/display/Sprite";

declare var $:any;

class KeydownPage extends Container<DisplayObject>
{
	sequence:Sprite;
	spriteSheet:SpriteSheet;
	loader:Loader = new Loader('50%', '50%');
	frames:number = 0;
	scrollPower:number = .1;
	framesPerBlock:number = 50;

	public queue:Array<any> = [];

	constructor()
	{
		super('100%', '100%');

		this.hitArea = new RectangleColor('#000', '100%', '100%');
		this.addChild(this.hitArea);
		this.hitArea.visible = false;

		var data = SpriteSheet.getSequenceStructureByList(ListUtil.createList(0, 499, (index) =>
		{
			return 'data/sequence/piday/image/sequence/' + ListUtil.padLeft('' + index, 4, '0') + '.png'
		}), 1280, 720);

		var frames = 50;

		for(var i = 0; i < 10; i++)
		{
			data.animations['' + i] = [frames*i, frames * (i+1) - 1];
		}

		console.log(data.animations);
		

		this.spriteSheet = new SpriteSheet(data);
		this.sequence = new Sprite(this.spriteSheet);

		this.addChild(this.sequence);
		this.addChild(this.loader);

		this.spriteSheet.load(this.loader.setProgress.bind(this.loader)).then(() =>
		{
			this.loader.visible = false;
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
		$(document).on( "keypress", (e) => {
			switch(e.keyCode)
			{
				case KeyCode.NUMPAD_0:
				case KeyCode.NUM_0:{
					
					this.sequence.gotoAndPlay('0');
					break;
				}
				case KeyCode.NUMPAD_1:
				case KeyCode.NUM_1:{
					this.sequence.gotoAndPlay('1');
					break;
				}
				case KeyCode.NUMPAD_2:
				case KeyCode.NUM_2:{
					this.sequence.gotoAndPlay('2');
					break;
				}
				case KeyCode.NUMPAD_3:
				case KeyCode.NUM_3:{
					this.sequence.gotoAndPlay('3');
					break;
				}
				case KeyCode.NUMPAD_4:
				case KeyCode.NUM_4:{
					this.sequence.gotoAndPlay('4');
					break;
				}
				case KeyCode.NUMPAD_5:
				case KeyCode.NUM_5:{
					this.sequence.gotoAndPlay('5');
					break;
				}
				case KeyCode.NUMPAD_6:
				case KeyCode.NUM_6:{
					this.sequence.gotoAndPlay('6');
					break;
				}
				case KeyCode.NUMPAD_7:
				case KeyCode.NUM_7:{
					this.sequence.gotoAndPlay('7');
					break;
				}
				case KeyCode.NUMPAD_8:
				case KeyCode.NUM_8:{
					this.sequence.gotoAndPlay('8');
					break;
				}
				case KeyCode.NUMPAD_9:
				case KeyCode.NUM_9:{
					this.sequence.gotoAndPlay('9');
					break;
				}
			}
		});
	}

	public position:Point = new Point(0, 0);
	public positionTo:Point = new Point(0, 0);

	public handleDragging(dx:number, dy:number, dragging:boolean)
	{
		this.position.x += dx * this.scrollPower;
		this.position.y += dy * this.scrollPower;

		this.position.x = MathUtil.clamp(this.position.x, 0, this.frames - 1);
		this.position.y = MathUtil.clamp(this.position.y, 0, this.frames - 1);

		//var y = Math.ceil(this.position.y / this.framesPerBlock);
		//this.position.y = (this.position.y % this.framesPerBlock) * y;
	}

	//public onTick(delta)
	//{
	//	super.onTick(delta);
	//
	//	if(this.sequence.isLoaded)
	//	{
	//		var framePerPosition = 2;
	//
	//
	//		this.positionTo.y = MathUtil.lerp(this.positionTo.y, this.position.y, 1);
	//		this.sequence.gotoAndStop(this.positionTo.y|0);
	//
	//	}
	//}
}

export default KeydownPage;
