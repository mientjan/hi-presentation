import RGBA from "../data/RGBA";
export interface IStageOption
{
	/**
	 * Indicates whether onResize should be called when the window is resized.
	 * @property triggerResizeOnWindowResize
	 * @type {boolean}
	 * @default false
	 */
	autoResize?:boolean;
	pixelRatio?:number;
	autoClear?:boolean;
	autoClearColor?:string|RGBA;
}