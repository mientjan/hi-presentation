import Stage from "../lib/easelts/display/Stage";
import ListUtil from "./util/ListUtil";
import ImageSequence from "../lib/easelts/animation/ImageSequence";
import Loader from "./controls/Loader";
import AutoScaleBehavior from "../lib/easelts/behavior/AutoScaleBehavior";
import Container from "../../lib/easelts/display/Container";
import DisplayObject from "../../lib/easelts/display/DisplayObject";

class FollowPointer extends Container<DisplayObject>  {

	sequence:ImageSequence;
	loader:Loader = new Loader('50%', '50%');

	constructor(){
		// test
		super('100%', '100%');


		this.sequence = ImageSequence.createFromString(ListUtil.createList(500, (index) => {
			return 'data/sequence/piday/image/sequence/' + ListUtil.padLeft(''+index, 4, '0') + '.png'
		}), 24, 1280, 720);

		this.addChild(this.sequence);
		this.addChild(this.loader);

		this.sequence.load(this.loader.setProgress.bind(this.loader)).then(() => {
			this.loader.visible = false;
			this.sequence.play(-1);
		});
		this.sequence.alpha = 1;
		this.stage.start();

		this.sequence.setGeomTransform(1280, 720, '50%', '50%', '50%', '50%');
		this.sequence.addBehavior(new AutoScaleBehavior().setAlwaysCover(true));

	}
}

export default FollowPointer;
