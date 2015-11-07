import Bitmap from "../../display/Bitmap";
import Rectangle from "../../geom/Rectangle";
import NinePatchCoordinates from "./NinePatchCoordinates";

/**
 *
 */
class NinePatch {

	public bitmap:Bitmap;
	public rectangle:Rectangle;

	/**
	 *
	 * @param imageOrString
	 * @param rectangle
	 */
	constructor(imageOrString:HTMLImageElement|HTMLVideoElement|HTMLCanvasElement|string, rectangle:Rectangle|Array<number>)
	{
		this.bitmap = new Bitmap(imageOrString);

		if( !(rectangle instanceof Rectangle) ){

			this.rectangle = new Rectangle(rectangle[0], rectangle[1], rectangle[2], rectangle[3]);
		}
		else
		{
			this.rectangle = rectangle;
		}
	}

	/**
	 *
	 * @param width
	 * @param height
	 * @returns {NinePatchCoordinates}
	 */
	public getCoordinates(width:number, height:number):NinePatchCoordinates
	{
		var image = this.bitmap.getImageSize();
		var iw = image.width;
		var ih = image.height;
		var rx = this.rectangle.x;
		var ry = this.rectangle.y;
		var rw = this.rectangle.width;
		var rh = this.rectangle.height;

		var sourceRow = [
			0, ry, ry + rh, ih
		];

		var sourceColumn = [
			0, rx, rx + rw, iw
		];

		var destRow = [
			0, ry, height - ( sourceRow[3] - sourceRow[2] ), height
		];

		var destColumn = [
			0, rx, width - ( sourceColumn[3] - sourceColumn[2] ), width
		];

		return new NinePatchCoordinates(
			sourceRow, sourceColumn, destRow, destColumn
		);
	}
}

export default NinePatch;