module ecs {
	/**
	 * 每帧执行，在所有IpdateSystem系统执行完后
	 */
	export interface ILateUpdateSystem extends ISystem {
		lateUpdate();
	}
}