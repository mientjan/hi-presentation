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
import KeyCode from "../../lib/keys/KeyCode";
import SpriteSheet from "../../lib/easelts/display/SpriteSheet";
import Sprite from "../../lib/easelts/display/Sprite";
import IHashMap from "../../lib/easelts/interface/IHashMap";

declare var $:any;

class KeydownPage extends Container<DisplayObject>
{
	sequence:ImageSequence;
	spriteSheet:SpriteSheet;
	loader:Loader = new Loader('50%', '50%');
	frames:number = 0;
	scrollPower:number = .1;
	framesPerBlock:number = 50;

	public keycode:IHashMap<any> = {};



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
			this.keycode[KeyCode['NUM_' + i]] = [frames*i, frames * (i+1) - 1];
		}

		this.spriteSheet = new SpriteSheet(data);
		this.sequence = new ImageSequence(this.spriteSheet, 24, 1280, 720);

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

			if(this.keycode[e.keyCode])
			{
				this.sequence.play(1, this.keycode[e.keyCode])
			}
		});
	}

}

export default KeydownPage;
