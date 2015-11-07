import Promise from "../../createts/util/Promise";

interface ILoadable<T>
{
	isLoaded:boolean;
	load(onProgress:(progress:number) => any):Promise<T>
}

export default ILoadable;