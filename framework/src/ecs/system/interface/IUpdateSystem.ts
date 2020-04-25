module ecs {
	/**
	 * 每帧执行，受每帧渲染时间影响
	 */
	export interface IUpdateSystem extends ISystem {
		update(dt: number);
	}
}