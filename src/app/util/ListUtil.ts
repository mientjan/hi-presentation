class ListUtil
{
	public static createList(from:number, to:number, fn:(index:number) => any):any[]
	{
		var list = [];
		for(var i = from; i < to; i++)
		{
			list.push(fn.call(this, i));
		}
		return list;
	}

	public static padLeft(value:string, length:number, fillChar:string = ' '):string
	{
		if(fillChar == null || fillChar.length == 0)
		{
			throw 'invalid value for fillChar: "' + fillChar + '"';
		}

		if(value.length < length)
		{
			var lim:number = length - value.length;
			for(var i:number = 0; i < lim; i++)
			{
				value = fillChar + value;
			}
		}
		return value;
	}
}

export default ListUtil;