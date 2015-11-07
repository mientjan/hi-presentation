import AbstractBehavior from "./AbstractBehavior";
import DisplayObject from "../display/DisplayObject";
import Stage from "../display/Stage";
import Container from "../display/Container";
import PointerEvent from "../event/PointerEvent";
import DisplayType from "../enum/DisplayType";
import MouseEvent from "../event/MouseEvent";
import Size from "../geom/Size";
import Scroller from "../../zynga/Scroller";
import Animate from "../../zynga/Animate";
import IScrollerOptions from "../../zynga/IScrollerOptions";
import IDisplayObject from "../interface/IDisplayObject";

class AutoAssetBehavior extends AbstractBehavior
{
	protected _elements:Array<DisplayObject> = [];

	public owner:Container<IDisplayObject>;

	constructor()
	{
		super();
	}

	public initialize(container:DisplayObject):void
	{
		super.initialize(container);
	}
}

export default AutoAssetBehavior;