import Size from "../geom/Size";

class ArrayUtil
{
	public static getMaxSize(arr:Array<{width:number;height:number;}>):Size
	{
		var size = new Size(0, 0);
		for(var i = 0; i < arr.length; i++)
		{
			size.width = Math.max(arr[i].width, size.width);
			size.height = Math.max(arr[i].height, size.height);
		}

		return size;
	}

	public static getSize(arr:Array<{width:number;height:number;}>):Size
	{
		var size = new Size(0, 0);
		for(var i = 0; i < arr.length; i++)
		{
			size.width += arr[i].width;
			size.height += arr[i].height;
		}

		return size;
	}

	public static getRandom(arr:Array<any>):any
	{
		return arr[Math.random()*arr.length|0];
	}
}

export default ArrayUtil;