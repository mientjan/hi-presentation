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

/**
 * @class ImageSequence
 */
class ImageSequence extends DisplayObject implements ILoadable<ImageSequence>, IPlayable
{
	public type:DisplayType = DisplayType.BITMAP;

	public _playing = false;
	public _timeIndex:number = -1;
	public currentFrame:number = 0;
	public _frameTime:number = 0;
	public _length:number = 0;

	private _times:number = 1;
	private _loopInfinite:boolean = false;

	private _onComplete:Function = null;

	public paused:boolean = true;
	public fps:number;
	public spriteSheet:SpriteSheet = null;

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

		if(this.isLoaded)
		{
			this.parseLoad();
		}
	}

	private parseLoad(){

		var animations = this.spriteSheet.getAnimations();

		if( animations.length > 1 )
		{
			throw new Error('SpriteSheet not compatible with ImageSequence, has multiple animations. Only supports one')
		}

		this._length = this.spriteSheet.getNumFrames(animations[0]);

		this._frameTime = 1000 / this.fps;
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

	public play(times = 1, onComplete:Function = null):ImageSequence
	{
		this.currentFrame = 0;
		this._times = times;
		this._loopInfinite = times == -1 ? true : false;
		this._onComplete = onComplete;
		this._playing = true;

		return this;
	}

	public gotoAndStop(frame = 1):ImageSequence
	{
		this.currentFrame = frame;
		this._times = 1;
		this._loopInfinite = false;
		this._playing = false;

		return this;
	}

	public stop(triggerOnComplete:boolean = true):ImageSequence
	{
		this._playing = false;
		this._loopInfinite = false;
		this._timeIndex = -1;

		if(this._onComplete && triggerOnComplete)
		{
			this._onComplete.call(null);
		}

		this._onComplete = null;

		return this;
	}

	public onTick(delta:number):void
	{
		var playing = this._playing;

		if(playing)
		{
			if(this._timeIndex < 0)
			{
				this._timeIndex = 0;
			}

			var time = this._timeIndex += delta;
			var frameTime = this._frameTime;
			var length = this._length;
			var times = this._times;
			var frame = Math.floor(time / frameTime);
			var currentFrame = this.currentFrame;
			var playedLeft = times - Math.floor(frame / length);

			if(!this._loopInfinite && playedLeft <= 0)
			{
				this.stop();
			}
			else
			{
				frame %= length;

				if(currentFrame != frame)
				{
					this.currentFrame = frame;
				}
			}

		}
	}

	public getTotalFrames():number
	{
		return this._length;
	}

}

export default ImageSequence;