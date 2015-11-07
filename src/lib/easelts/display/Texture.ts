import Rectangle from "../geom/Rectangle";
import IDisplayObject from "../interface/IDisplayObject";
import IContext2D from "../interface/IContext2D";

/**
 * Base class For all bitmap type drawing.
 *
 * @class Texture
 */
export default class Texture
{
	constructor(bitmap:HTMLCanvasElement|HTMLVideoElement|HTMLImageElement, source:Rectangle)
	{
		var view = bitmap, x = source.x, y = source.y, width = source.width, height = source.height;

		this.draw = function(ctx:IContext2D):boolean
		{
			ctx.drawImage(<HTMLImageElement> view, x, y, width, height, 0, 0, width, height);
			return true;
		}
	}

	public draw:(ctx:IContext2D) => boolean;
}