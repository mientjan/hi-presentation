import Shape from "../../lib/easelts/display/Shape";
import Container from "../../lib/easelts/display/Container";
import Text from "../../lib/easelts/display/Text";

class Loader extends Container<any>
{
	shape:Shape = new Shape();
	text:Text = new Text('');

	constructor(x, y){
		super(100, 100, x, y);

		this.addChild(this.shape);
		this.addChild(this.text);

		this.text.y += 20;
	}

	public setProgress(progress:number)
	{
		var g = this.shape.graphics.clear();

		g.beginFill('#000')
		g.arc(0, 0, 10, 0, (progress * 2) * Math.PI, false);

		this.text.text = '' + progress + '%';
	}
}

export default Loader;