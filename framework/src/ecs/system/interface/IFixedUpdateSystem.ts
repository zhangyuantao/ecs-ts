module ecs {
	/** 
	 * 每帧固定时间推进，在update之前执行
	 * update一次fixedUpdate可能多次
	 */
	export interface IFixedUpdateSystem extends ISystem {
		fixedUpdate(dt: number);
	}
}