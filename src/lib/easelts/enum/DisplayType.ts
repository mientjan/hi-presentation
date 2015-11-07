/**
 * @enum ValueType
 */
const enum DisplayType {
	UNKNOWN = 1 << 0,
	STAGE = 1 << 1,
	DISPLAYOBJECT = 1 << 2,
	BITMAP = 1 << 3,
	BITMAPVIDEO = 1 << 4,
	TEXTURE = 1 << 5,
	SPRITESHEET = 1 << 6,
	BITMAPTEXT = 1 << 7,
	CONTAINER = 1 << 8,
	SHAPE = 1 << 9,
	GRAPHICS = 1 << 10,
	MOVIECLIP = 1 << 11
}

export default DisplayType;