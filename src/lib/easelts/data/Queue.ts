class Queue
{

	public label:string;
	public from:number;
	public to:number;

	public times:number;
	public delay:number;
	private _complete:Function;

	constructor(label:string, from:number, to:number, times:number = 1, delay:number = 0)
	{

		this.label = label;
		this.from = from;
		this.to = to;
		this.times = times;
		this.delay = delay;
	}

	public then(complete:() => any):Queue
	{
		this._complete = complete;
		return this;
	}

	public finish():Queue
	{
		if(this._complete)
		{
			this._complete.call(this);
		}

		return this;
	}

	public destruct():void
	{
		this.label = null;
		this._complete = null;
	}
}

export default Queue;