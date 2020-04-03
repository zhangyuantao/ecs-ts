module ecs {
	/**
	 * 系统销毁，最后生命周期
	 */
	export interface IDestroySystem extends ISystem {
		destroy();
	}
}