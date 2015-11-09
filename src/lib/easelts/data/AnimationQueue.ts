import Queue from "./Queue";
import QueueList from "./QueueList";

class AnimationQueue extends QueueList
{
	protected _time:number = 0;
	public frame:number = 0;
	protected _fpms:number = 0;

	constructor(fps:number)
	{
		super();
		this._fpms = 1000/fps;
	}

	public onTick(delta:number):void
	{
		this._time += delta;

		if(this.current != null || this.next() != null)
		{
			var times = this.current.times;
			var from = this.current.from;
			var to = this.current.to;
			var duration = this.current.duration;
			var frame = duration * this._time / (duration * this._fpms);

			this.frame = frame;

			if(times > -1 && times - (frame / duration) < 0)
			{
				this.next();
			}
		}
	}

	public next():Queue
	{
		this._time = this._time % this._fpms;

		return super.next();
	}

	public getFrame():number
	{
		return this.frame|0
	}
}

export default AnimationQueue;
