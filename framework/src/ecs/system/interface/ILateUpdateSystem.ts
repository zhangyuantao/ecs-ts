module ecs {
	/**
	 * 每帧执行，在所有IUpdateSystem系统执行完后
	 */
	export interface ILateUpdateSystem extends ISystem {
		lateUpdate();
	}
}