import Queue from "../data/Queue";

class QueueList
{
	protected _list:Array<Queue> = [];
	public current:Queue = null;

	public add(item:Queue):QueueList
	{
		this._list.push(item);

		return this;
	}

	public next():Queue
	{
		this.kill();

		if(this._list.length > 0)
		{
			this.current = this._list.shift();
		} else {
			this.current = null;
		}

		return this.current;
	}

	public end(all:boolean = false):QueueList
	{
		if(all)
		{
			this._list.length = 0;
		}

		if(this.current){
			this.current.times = 1;
		}

		return this;
	}

	public kill(all:boolean = false):QueueList
	{
		if(all)
		{
			this._list.length = 0;
		}

		if(this.current)
		{
			this.current.finish();
			this.current.destruct();
		}

		return this;
	}
}

export default QueueList;