import Stage from "../lib/easelts/display/Stage";
import ListUtil from "./util/ListUtil";
import ImageSequence from "../lib/easelts/animation/ImageSequence";
import Loader from "./controls/Loader";
import AutoScaleBehavior from "../lib/easelts/behavior/AutoScaleBehavior";

class main
{
	stage:Stage;
	sequence:ImageSequence;
	loader:Loader = new Loader('50%', '50%');

	constructor(){
		this.stage = new Stage(<HTMLBlockElement> document.body, {autoResize:true, autoClear:true});

		this.sequence = ImageSequence.createFromString(ListUtil.createList(500, (index) => {
			return 'data/sequence/piday/image/sequence/' + ListUtil.padLeft(''+index, 4, '0') + '.png'
		}), 24, 1280, 720);

		this.stage.addChild(this.sequence);
		this.stage.addChild(this.loader);

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

export default main;