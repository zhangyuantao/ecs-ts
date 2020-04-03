module ecs {
	/**
	 * 每帧执行，受每帧渲染时间影响
	 */
	export interface IUpdateSystem extends ISystem {
		// 每帧固定时间推进，在update之前执行
		// update一次fixedUpdate可能多次
		fixedUpdate(dt: number);
		update(dt: number);
	}
}