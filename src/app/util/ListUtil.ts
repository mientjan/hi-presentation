class ListUtil
{
	public static createList(amount:number, fn:(index:number) => string):string[]
	{
		var list = [];
		for(var i = 0; i < amount; i++)
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