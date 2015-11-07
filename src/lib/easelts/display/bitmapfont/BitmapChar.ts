import Sprite from "../Sprite";

class BitmapChar
{
	mTexture:Sprite;
	mCharId:number;
	mXOffset;
	mYOffset;
	mXAdvance;
	mKernings;

	constructor(id:number, texture:Sprite, xOffset:number, yOffset:number, xAdvance)
	{
		this.mTexture = texture;
		this.mCharId = id;
		this.mXOffset = xOffset;
		this.mYOffset = yOffset;
		this.mXAdvance = xAdvance;
		this.mKernings = null;
	}


	public addKerning(charId, amount):void
	{
		if(this.mKernings == null)
		{
			this.mKernings = [];
		}

		this.mKernings[charId] = amount;
	}

	public getKerning(charId):any
	{
		return (this.mKernings == null || this.mKernings[charId] == null || this.mKernings[charId] == undefined) ? 0 : this.mKernings[charId];
	}

	public createImage():Sprite
	{
		return this.mTexture.clone();
	}

	public getCharId():number
	{
		return this.mCharId;
	}

	public getXOffset():number
	{
		return this.mXOffset;
	}

	public getYOffset():number
	{
		return this.mYOffset;
	}

	public getXAdvance():number
	{
		return this.mXAdvance;
	}

	public getTexture():Sprite
	{
		return this.mTexture;
	}

	public getWidth():number
	{
		return this.mTexture.spriteSheet.getFrame(this.mTexture.currentFrame).rect.width;
	}

	public getHeight():number
	{
		return this.mTexture.spriteSheet.getFrame(this.mTexture.currentFrame).rect.height;
	}
}

export default BitmapChar;
