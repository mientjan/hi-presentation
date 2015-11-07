import Vector3 from "../Vector3";
import Quaternion from "../Quaternion";
import Matrix4 from "../Matrix4";

export default class AbstractMath3D
{
	private _quaternion:{[index:string]:Quaternion} = {};
	private _vector3:{[index:string]:Vector3} = {};
	private _matrix4:{[index:string]:Matrix4} = {};

	protected getQuaternion(value:string):Quaternion
	{
		if(!this._quaternion[value])
		{
			this._quaternion[value] = new Quaternion();
		}
		return this._quaternion[value];
	}

	protected getVector3(value:string):Vector3
	{
		if(!this._vector3[value])
		{
			this._vector3[value] = new Vector3();
		}
		return this._vector3[value];
	}

	protected getMatrix4(value:string):Matrix4
	{
		if(!this._matrix4[value])
		{
			this._matrix4[value] = new Matrix4();
		}
		return this._matrix4[value];
	}
}