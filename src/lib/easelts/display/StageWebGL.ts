/*
 * StageWebGL
 *
 * Copyright (c) 2010 gskinner.com, inc.
 * Copyright (c) 2015 Mient-jan Stelling.
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * @module EaselJS
 */


// Set which classes are compatible with StageWebGL.
// The order is important!!! If it's changed/appended, make sure that any logic that
// checks _StageWebGL_compatibility accounts for it!


// constructor:
import Stage from "./Stage";
import {StageOption} from "../data/StageOption";
import IContext2D from "../interface/IContext2D";
import DisplayType from "../enum/DisplayType";
import RGBA from "../data/RGBA";
import Container from "./Container";
import Bitmap from "./Bitmap";
import DOMElement from "./DOMElement";
/**
 * A sprite stage is the root level {{#crossLink "Container"}}{{/crossLink}} for an aggressively optimized display list. Each time its {{#crossLink "Stage/tick"}}{{/crossLink}}
 * method is called, it will render its display list to its target canvas. WebGL content is fully compatible with the existing Context2D renderer.
 * On devices or browsers that don't support WebGL, content will automatically be rendered via canvas 2D.
 *
 * Restrictions:
 *     - only Sprite, SpriteContainer, BitmapText, Bitmap and DOMElement are allowed to be added to the display list.
 *     - a child being added (with the exception of DOMElement) MUST have an image or spriteSheet defined on it.
 *     - a child's image/spriteSheet MUST never change while being on the display list.
 *
 * <h4>Example</h4>
 * This example creates a sprite stage, adds a child to it, then uses {{#crossLink "Ticker"}}{{/crossLink}} to update the child
 * and redraw the stage using {{#crossLink "StageWebGL/update"}}{{/crossLink}}.
 *
 *      var stage = new StageWebGL("canvasElementId", false, false);
 *      stage.updateViewport(800, 600);
 *      var image = new createjs.Bitmap("imagePath.png");
 *      stage.addChild(image);
 *      createjs.Ticker.addEventListener("tick", handleTick);
 *      function handleTick(event) {
 *          image.x += 10;
 *          stage.update();
 *      }
 *
 * <strong>Note:</strong> StageWebGL is not included in the minified version of EaselJS.
 *
 * @class StageWebGL
 * @extends Stage
 * @constructor
 * @param {HTMLCanvasElement | String | Object} canvas A canvas object that the StageWebGL will render to, or the string id
 * of a canvas object in the current document.
 * @param {Boolean} preserveDrawingBuffer If true, the canvas is NOT auto-cleared by WebGL (spec discourages true). Useful if you want to use p.autoClear = false.
 * @param {Boolean} antialias Specifies whether or not the browser's WebGL implementation should try to perform antialiasing.
 **/

//[Container, null, null, Bitmap, DOMElement].forEach(function(_class, index) {
//	if(_class) _class.prototype['_spritestage_compatibility'] = index + 1;
//});

class StageWebGL extends Stage
{
	public static COMPATIBLE = [
		DisplayType.CONTAINER,
		DisplayType.BITMAP,
		DisplayType.TEXTURE
	];

	// constants:
	/**
	 * The number of properties defined per vertex in p._verticesBuffer.
	 * x, y, textureU, textureV, alpha
	 * @property NUM_VERTEX_PROPERTIES
	 * @static
	 * @final
	 * @type {Number}
	 * @readonly
	 **/
	public static NUM_VERTEX_PROPERTIES = 5;

	/**
	 * The number of points in a box...obviously :)
	 * @property POINTS_PER_BOX
	 * @static
	 * @final
	 * @type {Number}
	 * @readonly
	 **/
	public static POINTS_PER_BOX = 4;

	/**
	 * The number of vertex properties per box.
	 * @property NUM_VERTEX_PROPERTIES_PER_BOX
	 * @static
	 * @final
	 * @type {Number}
	 * @readonly
	 **/
	public static NUM_VERTEX_PROPERTIES_PER_BOX = StageWebGL.POINTS_PER_BOX * StageWebGL.NUM_VERTEX_PROPERTIES;

	/**
	 * The number of indices needed to define a box using triangles.
	 * 6 indices = 2 triangles = 1 box
	 * @property INDICES_PER_BOX
	 * @static
	 * @final
	 * @type {Number}
	 * @readonly
	 **/
	public static INDICES_PER_BOX = 6;

	/**
	 * The maximum size WebGL allows for element index numbers: 16 bit unsigned integer
	 * @property MAX_INDEX_SIZE
	 * @static
	 * @final
	 * @type {Number}
	 * @readonly
	 **/
	public static MAX_INDEX_SIZE = Math.pow(2, 16);

	/**
	 * The amount used to increment p._maxBoxesPointsPerDraw when the maximum has been reached.
	 * If the maximum size of element index WebGL allows for (StageWebGL.MAX_INDEX_SIZE) was used,
	 * the array size for p._vertices would equal 1280kb and p._indices 192kb. But since mobile phones
	 * with less memory need to be accounted for, the maximum size is somewhat arbitrarily divided by 4,
	 * reducing the array sizes to 320kb and 48kb respectively.
	 * @property MAX_BOXES_POINTS_INCREMENT
	 * @static
	 * @final
	 * @type {Number}
	 * @readonly
	 **/
	public static MAX_BOXES_POINTS_INCREMENT = StageWebGL.MAX_INDEX_SIZE / 4;

	// private properties:
	/**
	 * Specifies whether or not the canvas is auto-cleared by WebGL. Spec discourages true.
	 * If true, the canvas is NOT auto-cleared by WebGL. Value is ignored if `_alphaEnabled` is false.
	 * Useful if you want to use `autoClear = false`.
	 * @property _preserveDrawingBuffer
	 * @protected
	 * @type {Boolean}
	 * @default false
	 **/
	_preserveDrawingBuffer = false;

	/**
	 * Specifies whether or not the browser's WebGL implementation should try to perform antialiasing.
	 * @property _antialias
	 * @protected
	 * @type {Boolean}
	 * @default false
	 **/
	_antialias = false;

	/**
	 * The width of the canvas element.
	 * @property _viewportWidth
	 * @protected
	 * @type {Number}
	 * @default 0
	 **/
	_viewportWidth = 0;

	/**
	 * The height of the canvas element.
	 * @property _viewportHeight
	 * @protected
	 * @type {Number}
	 * @default 0
	 **/
	_viewportHeight = 0;

	/**
	 * A 2D projection matrix used to convert WebGL's clipspace into normal pixels.
	 * @property _projectionMatrix
	 * @protected
	 * @type {Float32Array}
	 * @default null
	 **/
	_projectionMatrix = null;

	/**
	 * The current WebGL canvas context.
	 * @property _webGLContext
	 * @protected
	 * @type {WebGLRenderingContext}
	 * @default null
	 **/
	_webGLContext:WebGLRenderingContext = null;

	/**
	 * Indicates whether or not an error has been detected when dealing with WebGL.
	 * If the is true, the behavior should be to use Canvas 2D rendering instead.
	 * @property _webGLErrorDetected
	 * @protected
	 * @type {Boolean}
	 * @default false
	 **/
	_webGLErrorDetected = false;

	/**
	 * The color to use when the WebGL canvas has been cleared.
	 * @property _clearColor
	 * @protected
	 * @type {Object}
	 * @default null
	 **/
	_clearColor = null;

	/**
	 * The maximum number of textures WebGL can work with per draw call.
	 * @property _maxTexturesPerDraw
	 * @protected
	 * @type {Number}
	 * @default 1
	 **/
	_maxTexturesPerDraw = 1; // TODO: this is currently unused.

	/**
	 * The maximum total number of boxes points that can be defined per draw call.
	 * @property _maxBoxesPointsPerDraw
	 * @protected
	 * @type {Number}
	 * @default null
	 **/
	_maxBoxesPointsPerDraw = null;

	/**
	 * The maximum number of boxes (sprites) that can be drawn in one draw call.
	 * @property _maxBoxesPerDraw
	 * @protected
	 * @type {Number}
	 * @default null
	 **/
	_maxBoxesPerDraw = null;

	/**
	 * The maximum number of indices that can be drawn in one draw call.
	 * @property _maxIndicesPerDraw
	 * @protected
	 * @type {Number}
	 * @default null
	 **/
	_maxIndicesPerDraw = null;

	/**
	 * The shader program used to draw everything.
	 * @property _shaderProgram
	 * @protected
	 * @type {WebGLProgram}
	 * @default null
	 **/
	_shaderProgram = null;

	/**
	 * The vertices data for the current draw call.
	 * @property _vertices
	 * @protected
	 * @type {Float32Array}
	 * @default null
	 **/
	_vertices = null;

	/**
	 * The buffer that contains all the vertices data.
	 * @property _verticesBuffer
	 * @protected
	 * @type {WebGLBuffer}
	 * @default null
	 **/
	_verticesBuffer = null;

	/**
	 * The indices to the vertices defined in _vertices.
	 * @property _indices
	 * @protected
	 * @type {Uint16Array}
	 * @default null
	 **/
	_indices = null;

	/**
	 * The buffer that contains all the indices data.
	 * @property _indicesBuffer
	 * @protected
	 * @type {WebGLBuffer}
	 * @default null
	 **/
	_indicesBuffer = null;

	/**
	 * The current box index being defined for drawing.
	 * @property _currentBoxIndex
	 * @protected
	 * @type {Number}
	 * @default -1
	 **/
	_currentBoxIndex = -1;

	/**
	 * The current texture that will be used to draw into the GPU.
	 * @property _drawTexture
	 * @protected
	 * @type {WebGLTexture}
	 * @default null
	 **/
	_drawTexture = null;

	constructor(canvas:HTMLBlockElement, preserveDrawingBuffer:boolean, antialias:boolean = true)
	{
		super(canvas, new StageOption({}));

		this._antialias = antialias;
		this._preserveDrawingBuffer = preserveDrawingBuffer;

		// setup:
		this._initializeWebGL();


	}

	public getContext():CanvasRenderingContext2D
	{
		return this.canvas.getContext('2d');
	}

	/**
	 * Indicates whether WebGL is being used for rendering. For example, this would be false if WebGL is not
	 * supported in the browser.
	 * @readonly
	 * @property isWebGL
	 * @type {Boolean}
	 **/
	public get isWebGL():boolean
	{
		return !!this._webGLContext;
	}

	// public methods:
	/**
	 * Adds a child to the top of the display list.
	 * Only children of type SpriteContainer, Sprite, Bitmap, BitmapText, or DOMElement are allowed.
	 * Children also MUST have either an image or spriteSheet defined on them (unless it's a DOMElement).
	 *
	 * <h4>Example</h4>
	 *      container.addChild(bitmapInstance);
	 *
	 *  You can also add multiple children at once:
	 *
	 *      container.addChild(bitmapInstance, shapeInstance, textInstance);
	 *
	 * @method addChild
	 * @param {DisplayObject} child The display object to add.
	 * @return {DisplayObject} The child that was added, or the last child if multiple children were added.
	 **/
	public addChild(child)
	{
		if(child == null)
		{
			return child;
		}
		if(arguments.length > 1)
		{
			return this.addChildAt.apply(this, Array.prototype.slice.call(arguments).concat([this.children.length]));
		}
		else
		{
			return this.addChildAt(child, this.children.length);
		}
	};

	/**
	 * Adds a child to the display list at the specified index, bumping children at equal or greater indexes up one, and
	 * setting its parent to this Container.
	 * Only children of type SpriteContainer, Sprite, Bitmap, BitmapText, or DOMElement are allowed.
	 * Children also MUST have either an image or spriteSheet defined on them (unless it's a DOMElement).
	 *
	 * <h4>Example</h4>
	 *
	 *      addChildAt(child1, index);
	 *
	 * You can also add multiple children, such as:
	 *
	 *      addChildAt(child1, child2, ..., index);
	 *
	 * The index must be between 0 and numChildren. For example, to add myShape under otherShape in the display list,
	 * you could use:
	 *
	 *      container.addChildAt(myShape, container.getChildIndex(otherShape));
	 *
	 * This would also bump otherShape's index up by one. Fails silently if the index is out of range.
	 *
	 * @method addChildAt
	 * @param {DisplayObject} child The display object to add.
	 * @param {Number} index The index to add the child at.
	 * @return {DisplayObject} Returns the last child that was added, or the last child if multiple children were added.
	 **/
	public addChildAt(child, index)
	{
		var l = arguments.length;
		var indx = arguments[l - 1]; // can't use the same name as the index param or it replaces arguments[1]
		if(indx < 0 || indx > this.children.length)
		{
			return arguments[l - 2];
		}
		if(l > 2)
		{
			for(var i = 0; i < l - 1; i++)
			{
				this.addChildAt(arguments[i], indx + i);
			}
			return arguments[l - 2];
		}
		if (child.type != DisplayType.SHAPE) {
			// The child is compatible with SpriteStage.
		} else {
			console && console.log("Error: You can only add children of type SpriteContainer, Sprite, Bitmap, BitmapText, or DOMElement. [" + child.toString() + "]");
			return child;
		}

		if (!child.image && !child.spriteSheet && child.type != DisplayType.CONTAINER) {
			console && console.log("Error: You can only add children that have an image or spriteSheet defined on them. [" + child.toString() + "]");
			return child;
		}

		if(child.parent)
		{
			child.parent.removeChild(child);
		}
		child.parent = this;
		this.children.splice(index, 0, child);
		return child;
	};

	/** docced in super class **/
	public update(delta:number)
	{
		if(!this.canvas)
		{
			return;
		}
		if(this.tickOnUpdate)
		{
			this.onTick(delta);
		}
		this.dispatchEvent("drawstart"); // TODO: make cancellable?
		if(this._option.autoClear)
		{
			this.clear();
		}

		var ctx = this._setWebGLContext();
		if(ctx)
		{
			// Use WebGL.
			this.draw(ctx, false);
		}
		else
		{
			// Use 2D.
			var ctx2d = this.canvas.getContext("2d");
			ctx2d.save();
			this.updateContext(ctx2d);
			this.draw(ctx2d, false);
			ctx2d.restore();
		}
		this.dispatchEvent("drawend");
	};

	/**
	 * Clears the target canvas. Useful if {{#crossLink "Stage/autoClear:property"}}{{/crossLink}} is set to `false`.
	 * @method clear
	 **/
	public clear()
	{
		if(!this.canvas)
		{
			return;
		}
		var ctx = this._setWebGLContext();
		if(ctx)
		{
			// Use WebGL.
			ctx.clear(ctx.COLOR_BUFFER_BIT);
		}
		else
		{
			// Use 2D.
			var ctx2d = this.canvas.getContext("2d");
			ctx2d.setTransform(1, 0, 0, 1, 0, 0);
			ctx2d.clearRect(0, 0, this.canvas.width + 1, this.canvas.height + 1);
		}
	};

	/**
	 * Draws the stage into the specified context (using WebGL) ignoring its visible, alpha, shadow, and transform.
	 * If WebGL is not supported in the browser, it will default to a 2D context.
	 * Returns true if the draw was handled (useful for overriding functionality).
	 *
	 * NOTE: This method is mainly for internal use, though it may be useful for advanced uses.
	 * @method draw
	 * @param {CanvasRenderingContext2D} ctx The canvas 2D context object to draw into.
	 * @param {Boolean} [ignoreCache=false] Indicates whether the draw operation should ignore any current cache.
	 * For example, used for drawing the cache (to prevent it from simply drawing an existing cache back
	 * into itself).
	 **/
	public draw(ctx, ignoreCache)
	{

		if(typeof WebGLRenderingContext !== 'undefined' && (ctx === this._webGLContext || ctx instanceof WebGLRenderingContext))
		{
			this._drawWebGLKids(this.children, ctx);
			return true;
		}
		else
		{
			return super.draw(ctx, ignoreCache);
		}
	};

	/**
	 * Update the WebGL viewport. Note that this does NOT update the canvas element's width/height.
	 * @method updateViewport
	 * @param {Number} width
	 * @param {Number} height
	 **/
	public updateViewport(width, height)
	{
		this._viewportWidth = width;
		this._viewportHeight = height;

		if(this._webGLContext)
		{
			this._webGLContext.viewport(0, 0, this._viewportWidth, this._viewportHeight);

			if(!this._projectionMatrix)
			{
				this._projectionMatrix = new Float32Array([0, 0, 0, 0, 0, 1, -1, 1, 1]);
			}
			this._projectionMatrix[0] = 2 / width;
			this._projectionMatrix[4] = -2 / height;
		}
	};

	/**
	 * Clears an image's texture to free it up for garbage collection.
	 * @method clearImageTexture
	 * @param  {HTMLImageElement} image
	 **/
	public clearImageTexture(image)
	{
		image.__easeljs_texture = null;
	};

	/**
	 * Returns a string representation of this object.
	 * @method toString
	 * @return {String} a string representation of the instance.
	 **/
	public toString()
	{
		return "[StageWebGL (name=" + this.name + ")]";
	};

	// private methods:

	/**
	 * Initializes rendering with WebGL using the current canvas element.
	 * @method _initializeWebGL
	 * @protected
	 **/
	public _initializeWebGL()
	{
		this._option.autoClearColor = new RGBA();

		this._setWebGLContext();
	};

	/**
	 * Sets the WebGL context to use for future draws.
	 * @method _setWebGLContext
	 * @return {WebGLRenderingContext}   The newly created context.
	 * @protected
	 **/
	public _setWebGLContext()
	{
		if(this.canvas)
		{
			if(!this._webGLContext || this._webGLContext.canvas !== this.canvas)
			{
				// A context hasn't been defined yet,
				// OR the defined context belongs to a different canvas, so reinitialize.
				this._initializeWebGLContext();
			}
		}
		else
		{
			this._webGLContext = null;
		}
		return this._webGLContext;
	};

	/**
	 * Sets up the WebGL context for rendering.
	 * @method _initializeWebGLContext
	 * @protected
	 **/
	public _initializeWebGLContext()
	{
		var options = {
			depth: false, // Disable the depth buffer as it isn't used.
			alpha: true, // Make the canvas background transparent.
			preserveDrawingBuffer: this._preserveDrawingBuffer,
			antialias: this._antialias,
			premultipliedAlpha: true // Assume the drawing buffer contains colors with premultiplied alpha.
		};
		var autoClearColor = this._option.autoClearColor;

		this._webGLContext = <WebGLRenderingContext> this.canvas.getContext("webgl", options) || <WebGLRenderingContext> this.canvas.getContext("experimental-webgl", options);

		var ctx = this._webGLContext;

		if(!ctx)
		{
			// WebGL is not supported in this browser.
			return;
		}

		// Enforcing 1 texture per draw for now until an optimized implementation for multiple textures is made:
		this._maxTexturesPerDraw = 1; // ctx.getParameter(ctx.MAX_TEXTURE_IMAGE_UNITS);


		// Set the default color the canvas should render when clearing:
		this._setClearColor(autoClearColor.r, autoClearColor.g, autoClearColor.b, autoClearColor.a);

		// Enable blending and set the blending functions that work with the premultiplied alpha settings:
		ctx.enable(ctx.BLEND);
		ctx.blendFuncSeparate(ctx.SRC_ALPHA, ctx.ONE_MINUS_SRC_ALPHA, ctx.ONE, ctx.ONE_MINUS_SRC_ALPHA);

		// Do not premultiply textures' alpha channels when loading them in:
		ctx.pixelStorei(ctx.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);

		// Create the shader program that will be used for drawing:
		this._createShaderProgram(ctx);

		if(this._webGLErrorDetected)
		{
			// Error detected during this._createShaderProgram().
			this._webGLContext = null;
			return;
		}

		// Create the vertices and indices buffers.
		this._createBuffers(ctx);

		// Update the viewport with the initial canvas dimensions:
		this.updateViewport(this._viewportWidth || this.canvas.width || 0, this._viewportHeight || this.canvas.height || 0);
	};

	/**
	 * Sets the color to use when the WebGL canvas has been cleared.
	 * @method _setClearColor
	 * @param {Number} r A number between 0 and 1.
	 * @param {Number} g A number between 0 and 1.
	 * @param {Number} b A number between 0 and 1.
	 * @param {Number} a A number between 0 and 1.
	 * @protected
	 **/
	public _setClearColor(r, g, b, a)
	{
		this._option.autoClearColor.r = r;
		this._option.autoClearColor.g = g;
		this._option.autoClearColor.b = b;
		this._option.autoClearColor.a = a;

		if(this._webGLContext)
		{
			this._webGLContext.clearColor(r, g, b, a);
		}
	};

	/**
	 * Creates the shader program that's going to be used to draw everything.
	 * @method _createShaderProgram
	 * @param {WebGLRenderingContext} ctx
	 * @protected
	 **/
	public _createShaderProgram(ctx)
	{


		var fragmentShader = this._createShader(ctx, ctx.FRAGMENT_SHADER,
			"precision mediump float;" +

			"uniform sampler2D uSampler0;" +

			"varying vec3 vTextureCoord;" +

			"void main(void) {" +
			"vec4 color = texture2D(uSampler0, vTextureCoord.st);" +
			"gl_FragColor = vec4(color.rgb, color.a * vTextureCoord.z);" +
			"}"
		);

		var vertexShader = this._createShader(ctx, ctx.VERTEX_SHADER,
			"attribute vec2 aVertexPosition;" +
			"attribute vec3 aTextureCoord;" +

			"uniform mat3 uPMatrix;" +

			"varying vec3 vTextureCoord;" +

			"void main(void) {" +
			"vTextureCoord = aTextureCoord;" +

			"gl_Position = vec4((uPMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);" +
			"}"
		);

		if(this._webGLErrorDetected || !fragmentShader || !vertexShader)
		{
			return;
		}

		var program = ctx.createProgram();
		ctx.attachShader(program, fragmentShader);
		ctx.attachShader(program, vertexShader);
		ctx.linkProgram(program);

		if(!ctx.getProgramParameter(program, ctx.LINK_STATUS))
		{
			// alert("Could not link program. " + ctx.getProgramInfoLog(program));
			this._webGLErrorDetected = true;
			return;
		}

		program.vertexPositionAttribute = ctx.getAttribLocation(program, "aVertexPosition");
		program.textureCoordAttribute = ctx.getAttribLocation(program, "aTextureCoord");

		program.sampler0uniform = ctx.getUniformLocation(program, "uSampler0");

		ctx.enableVertexAttribArray(program.vertexPositionAttribute);
		ctx.enableVertexAttribArray(program.textureCoordAttribute);

		program.pMatrixUniform = ctx.getUniformLocation(program, "uPMatrix");

		ctx.useProgram(program);

		this._shaderProgram = program;
	}

	/**
	 * Creates a shader from the specified string.
	 * @method _createShader
	 * @param  {WebGLRenderingContext} ctx
	 * @param  {Number} type               The type of shader to create.
	 * @param  {String} str                The definition for the shader.
	 * @return {WebGLShader}
	 * @protected
	 **/
	public _createShader(ctx, type, str)
	{
		var shader = ctx.createShader(type);
		ctx.shaderSource(shader, str);
		ctx.compileShader(shader);

		if(!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS))
		{
			// alert("Could not compile shader. " + ctx.getShaderInfoLog(shader));
			this._webGLErrorDetected = true;
			return null;
		}

		return shader;
	};

	/**
	 * Sets up the necessary vertices and indices buffers.
	 * @method _createBuffers
	 * @param {WebGLRenderingContext} ctx
	 * @protected
	 **/
	public _createBuffers(ctx)
	{
		this._verticesBuffer = ctx.createBuffer();
		ctx.bindBuffer(ctx.ARRAY_BUFFER, this._verticesBuffer);

		var byteCount = StageWebGL.NUM_VERTEX_PROPERTIES * 4; // ctx.FLOAT = 4 bytes
		ctx.vertexAttribPointer(this._shaderProgram.vertexPositionAttribute, 2, ctx.FLOAT, ctx.FALSE, byteCount, 0);
		ctx.vertexAttribPointer(this._shaderProgram.textureCoordAttribute, 3, ctx.FLOAT, ctx.FALSE, byteCount, 2 * 4);

		this._indicesBuffer = ctx.createBuffer();

		this._setMaxBoxesPoints(ctx, StageWebGL.MAX_BOXES_POINTS_INCREMENT);
	};

	/**
	 * Updates the maximum total number of boxes points that can be defined per draw call,
	 * and updates the buffers with the new array length sizes.
	 * @method _setMaxBoxesPoints
	 * @param {WebGLRenderingContext} ctx
	 * @param {Number} value              The new this._maxBoxesPointsPerDraw value.
	 * @protected
	 **/
	public _setMaxBoxesPoints(ctx, value)
	{
		this._maxBoxesPointsPerDraw = value;
		this._maxBoxesPerDraw = (this._maxBoxesPointsPerDraw / StageWebGL.POINTS_PER_BOX) | 0;
		this._maxIndicesPerDraw = this._maxBoxesPerDraw * StageWebGL.INDICES_PER_BOX;

		ctx.bindBuffer(ctx.ARRAY_BUFFER, this._verticesBuffer);
		this._vertices = new Float32Array(this._maxBoxesPerDraw * StageWebGL.NUM_VERTEX_PROPERTIES_PER_BOX);
		ctx.bufferData(ctx.ARRAY_BUFFER, this._vertices, ctx.DYNAMIC_DRAW);

		// Set up indices for multiple boxes:
		this._indices = new Uint16Array(this._maxIndicesPerDraw); // Indices are set once and reused.
		for(var i = 0, l = this._indices.length; i < l; i += StageWebGL.INDICES_PER_BOX)
		{
			var j = i * StageWebGL.POINTS_PER_BOX / StageWebGL.INDICES_PER_BOX;

			// Indices for the 2 triangles that make the box:
			this._indices[i] = j;
			this._indices[i + 1] = j + 1;
			this._indices[i + 2] = j + 2;
			this._indices[i + 3] = j;
			this._indices[i + 4] = j + 2;
			this._indices[i + 5] = j + 3;
		}
		ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
		ctx.bufferData(ctx.ELEMENT_ARRAY_BUFFER, this._indices, ctx.STATIC_DRAW);
	};

	/**
	 * Sets up an image's WebGL texture.
	 * @method _setupImageTexture
	 * @param {WebGLRenderingContext} ctx The canvas WebGL context object to draw into.
	 * @param {Object} image
	 * @return {WebGLTexture}
	 * @protected
	 **/
	public _setupImageTexture(ctx, image)
	{
		if(image && (image.naturalWidth || image.getContext || image.readyState >= 2))
		{
			// Create and use a new texture for this image if it doesn't already have one:
			var texture = image.__easeljs_texture;
			if(!texture)
			{
				texture = image.__easeljs_texture = ctx.createTexture();
				ctx.bindTexture(ctx.TEXTURE_2D, texture);
				ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, image);
				ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MIN_FILTER, ctx.NEAREST);
				ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_MAG_FILTER, ctx.LINEAR);
				ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_S, ctx.CLAMP_TO_EDGE);
				ctx.texParameteri(ctx.TEXTURE_2D, ctx.TEXTURE_WRAP_T, ctx.CLAMP_TO_EDGE);
			}
			return texture;
		}
	};

	/**
	 * Draw all the kids into the WebGL context.
	 * @method _drawWebGLKids
	 * @param {Array} kids                The list of kids to draw.
	 * @param {WebGLRenderingContext} ctx The canvas WebGL context object to draw into.
	 * @param {Matrix2D} parentMVMatrix   The parent's global transformation matrix.
	 * @protected
	 **/
	public _drawWebGLKids(kids, ctx, parentMVMatrix?)
	{

		var kid, mtx,
			snapToPixelEnabled = this.snapToPixelEnabled,
			image = null,
			leftSide = 0, topSide = 0, rightSide = 0, bottomSide = 0,
			vertices = this._vertices,
			numVertexPropertiesPerBox = StageWebGL.NUM_VERTEX_PROPERTIES_PER_BOX,
			maxIndexSize = StageWebGL.MAX_INDEX_SIZE,
			maxBoxIndex = this._maxBoxesPerDraw - 1;

		for(var i = 0, l = kids.length; i < l; i++)
		{
			kid = kids[i];
			if(!kid.isVisible())
			{
				continue;
			}

			// Get the texture for this display branch:
			var image = kid.image || (kid.spriteSheet && kid.spriteSheet._images[0]), texture = image.__easeljs_texture;
			if(!texture && !(texture = this._setupImageTexture(ctx, image)))
			{
				continue;
			} // no texture available (ex. may not be loaded yet).

			mtx = kid._matrix;

			// Get the kid's global matrix (relative to the stage):
			mtx = (parentMVMatrix ? mtx.copy(parentMVMatrix) : mtx.identity()).appendTransform(kid.x, kid.y, kid.scaleX, kid.scaleY, kid.rotation, kid.skewX, kid.skewY, kid.regX, kid.regY);

			// Set default texture coordinates:
			var uStart = 0, uEnd = 1,
				vStart = 0, vEnd = 1;

			// Define the untransformed bounding box sides and get the kid's image to use for textures:
			if(kid.type === DisplayType.BITMAP)
			{
				leftSide = 0;
				topSide = 0;
				rightSide = image.width;
				bottomSide = image.height;
			}
			else if(kid.type === DisplayType.SPRITESHEET)
			{
				var frame = kid.spriteSheet.getFrame(kid.currentFrame),
					rect = frame.rect;

				leftSide = -frame.regX;
				topSide = -frame.regY;
				rightSide = leftSide + rect.width;
				bottomSide = topSide + rect.height;

				uStart = rect.x / image.width;
				vStart = rect.y / image.height;
				uEnd = uStart + (rect.width / image.width);
				vEnd = vStart + (rect.height / image.height);
			}
			else
			{
				image = null;

				// Update BitmapText instances:
				if(kid.type === DisplayType.BITMAPTEXT)
				{
					// TODO: this might change in the future to use a more general approach.
					kid._updateText();
				}
			}

			// Detect if this kid is a new display branch:
			if(!parentMVMatrix && ( kid.type == DisplayType.BITMAP || kid.type == DisplayType.CONTAINER || kid.type == DisplayType.SPRITESHEET ) && texture !== this._drawTexture)
			{
				// Draw to the GPU if a texture is already in use:
				this._drawToGPU(ctx);
				this._drawTexture = texture;
			}

			if(image !== null)
			{
				// Set vertices' data:

				var offset = ++this._currentBoxIndex * numVertexPropertiesPerBox,
					a = mtx.a,
					b = mtx.b,
					c = mtx.c,
					d = mtx.d,
					tx = mtx.tx,
					ty = mtx.ty;

				if(snapToPixelEnabled && kid.snapToPixel)
				{
					tx = tx + (tx < 0 ? -0.5 : 0.5) | 0;
					ty = ty + (ty < 0 ? -0.5 : 0.5) | 0;
				}

				// Positions (calculations taken from Matrix2D.transformPoint):
				vertices[offset] = leftSide * a + topSide * c + tx;
				vertices[offset + 1] = leftSide * b + topSide * d + ty;
				vertices[offset + 5] = leftSide * a + bottomSide * c + tx;
				vertices[offset + 6] = leftSide * b + bottomSide * d + ty;
				vertices[offset + 10] = rightSide * a + bottomSide * c + tx;
				vertices[offset + 11] = rightSide * b + bottomSide * d + ty;
				vertices[offset + 15] = rightSide * a + topSide * c + tx;
				vertices[offset + 16] = rightSide * b + topSide * d + ty;

				// Texture coordinates:
				vertices[offset + 2] = vertices[offset + 7] = uStart;
				vertices[offset + 12] = vertices[offset + 17] = uEnd;
				vertices[offset + 3] = vertices[offset + 18] = vStart;
				vertices[offset + 8] = vertices[offset + 13] = vEnd;

				// Alphas:
				vertices[offset + 4] = vertices[offset + 9] = vertices[offset + 14] = vertices[offset + 19] = kid.alpha;

				// Draw to the GPU if the maximum number of boxes per a draw has been reached:
				if(this._currentBoxIndex === maxBoxIndex)
				{
					this._drawToGPU(ctx);
					this._drawTexture = texture;

					// If possible, increase the amount of boxes that can be used per draw call:
					if(this._maxBoxesPointsPerDraw < maxIndexSize)
					{
						this._setMaxBoxesPoints(ctx, this._maxBoxesPointsPerDraw + StageWebGL.MAX_BOXES_POINTS_INCREMENT);
						maxBoxIndex = this._maxBoxesPerDraw - 1;
					}
				}
			}

			// Draw children:
			if(kid.children)
			{
				this._drawWebGLKids(kid.children, ctx, mtx);
				maxBoxIndex = this._maxBoxesPerDraw - 1;
			}
		}

		// draw anything remaining, if this is the stage:
		if(!parentMVMatrix)
		{
			this._drawToGPU(ctx);
		}
	};

	/**
	 * Draws all the currently defined boxes to the GPU.
	 * @method _drawToGPU
	 * @param {WebGLRenderingContext} ctx The canvas WebGL context object to draw into.
	 * @protected
	 **/
	public _drawToGPU(ctx)
	{
		if(!this._drawTexture)
		{
			return;
		}
		var numBoxes = this._currentBoxIndex + 1;

		ctx.activeTexture(ctx.TEXTURE0);
		ctx.bindTexture(ctx.TEXTURE_2D, this._drawTexture);
		ctx.uniform1i(this._shaderProgram.sampler0uniform, 0);

		ctx.bindBuffer(ctx.ARRAY_BUFFER, this._verticesBuffer);

		ctx.bindBuffer(ctx.ELEMENT_ARRAY_BUFFER, this._indicesBuffer);
		ctx.uniformMatrix3fv(this._shaderProgram.pMatrixUniform, false, this._projectionMatrix);
		ctx.bufferSubData(ctx.ARRAY_BUFFER, 0, this._vertices);
		ctx.drawElements(ctx.TRIANGLES, numBoxes * StageWebGL.INDICES_PER_BOX, ctx.UNSIGNED_SHORT, 0);

		// Reset draw vars:
		this._currentBoxIndex = -1;
		this._drawTexture = null;
	}
}

export default StageWebGL;