import ILoadable from "../interface/ILoadable";
import IPlayable from "../interface/IPlayable";

import DisplayObject from "../display/DisplayObject";
import SpriteSheet from "../display/SpriteSheet";
import DisplayType from "../enum/DisplayType";
import * as Methods from "../util/Methods";
import TimeEvent from "../../createts/event/TimeEvent";
import Signal from "../../createts/event/Signal";
import SignalConnection from "../../createts/event/SignalConnection";
import Promise from "../../createts/util/Promise";
import QueueList from "./QueueList";
import Queue from "../data/Queue";

/**
 * @class ImageSequence
 */
class ImageSequence extends DisplayObject implements ILoadable<ImageSequence>, IPlayable
{
	public type:DisplayType = DisplayType.BITMAP;

	protected _queueList:QueueList = new QueueList();

	//public _playing = false;
	//public _timeIndex:number = -1;
	//public _length:number = 0;
	//
	//private _times:number = 1;
	//private _loopInfinite:boolean = false;
	//
	//private _onComplete:Function = null;
	//
	public time:number = 0;
	public timeDuration:number = 0;
	public frames:number = 0;
	public paused:boolean = true;
	public fps:number;
	public spriteSheet:SpriteSheet = null;
	public frameTime:number = 0;
	public currentFrame:number = 0;
	//
	public isLoaded:boolean = false;

	/**
	 *
	 * @param {string[]} images
	 * @param {number} fps
	 * @param {string|number} width
	 * @param {string|number} height
	 * @param {string|number} x
	 * @param {string|number} y
	 * @param {string|number} regX
	 * @param {string|number} regY
	 */
	constructor(spriteSheet:SpriteSheet, fps:number, width:any, height:any, x:any = 0, y:any = 0, regX:any = 0, regY:any = 0)
	{
		super(width, height, x, y, regX, regY);

		this.spriteSheet = spriteSheet;
		this.fps = fps;
	}

	private parseLoad(){

		var animations = this.spriteSheet.getAnimations();

		if( animations.length > 1 )
		{
			throw new Error('SpriteSheet not compatible with ImageSequence, has multiple animations. Only supports one')
		}

		this.frames = this.spriteSheet.getNumFrames();
		this.frameTime = 1000 / this.fps;
		this.timeDuration = this.frames * this.frameTime;
	}

	public load( onProgress?:(progress:number) => any):Promise<ImageSequence>
	{
		if( this.isLoaded)
		{
			if(onProgress) onProgress(1);

			return new Promise<ImageSequence>((resolve:Function, reject:Function) => {
				resolve(this);
			});
		}

		return this.spriteSheet.load(onProgress).then(spriteSheet => {
			this.isLoaded = true;
			this.parseLoad();
			return this;
		}).catch(() => {
			throw new Error('could not load library');
		});
	}

	public draw(ctx:CanvasRenderingContext2D, ignoreCache:boolean):boolean
	{
		var frame = this.currentFrame;
		var width = this.width;
		var height = this.height;

		if( this.currentFrame > -1 && this.isLoaded )
		{
			var frameObject = this.spriteSheet.getFrame(frame);

			if(!frameObject)
			{
				return false;
			}

			var rect = frameObject.rect;

			if(rect.width && rect.height)
			{
				ctx.drawImage(frameObject.image, rect.x, rect.y, rect.width, rect.height, 0, 0, width, height);
			}
		}

		return true;
	}

	public play(times:number = 1, label:string|Array<number> = null, complete?:() => any):ImageSequence
	{
		if(this.spriteSheet.isLoaded && !this.isLoaded)
		{
			this.isLoaded = true;
			this.parseLoad();
		}

		this.visible = true;

		if(label instanceof Array)
		{
			if(label.length == 1)
			{
				var queue = new Queue(null, label[0], this.getTotalFrames(), times, 0);
			} else {
				var queue = new Queue(null, label[0], label[1], times, 0);
			}
		} else if( label == null)
		{
			var queue = new Queue(null, 0, this.getTotalFrames(), times, 0);
		}

		if(complete)
		{
			queue.then(complete);
		}

		this._queueList.add(queue);

		if(!this._queueList.current){
			this._queueList.next();
		}



		this.paused = false;

		return this;
	}

	public resume():ImageSequence
	{
		this.paused = false;
		return this;
	}

	public pause():ImageSequence
	{
		this.paused = true;
		return this;
	}

	public end(all:boolean = false):ImageSequence
	{
		this._queueList.end(all);
		return this;
	}

	public stop():ImageSequence
	{
		this.paused = true;

		this._queueList.kill();

		return this;
	}
3
	public next():Queue
	{
		this.time = this.time & this.frameTime;
		return this._queueList.next();
	}

	public onTick(delta:number):void
	{
		super.onTick(delta);

		if(this.paused == false)
		{
			this.time += delta;

			var label = this._queueList.current;
			var toFrame = this.currentFrame;

			if( label )
			{
				toFrame = this.frames * this.time / this.timeDuration;

				if( label.times != -1 )
				{
					if( label.times - Math.ceil(toFrame / (label.to - label.from)) < 0 )
					{
						if( !this.next() )
						{
							this.stop();
							return;
						}
					}
				}

				toFrame = label.from + ( toFrame % (label.to - label.from) );
			}

			this.currentFrame = toFrame|0;
		}
	}

	public getTotalFrames():number
	{
		return this.frames;
	}

}

export default ImageSequence;