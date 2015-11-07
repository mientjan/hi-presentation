import BitmapChar from "./BitmapChar";

class CharLocation {

	public scale:number = 0;
	public x:number = 0;
	public y:number = 0;
	public char:BitmapChar;

	constructor(char:BitmapChar)
	{
		this.char = char;
	}
}

export default CharLocation;
