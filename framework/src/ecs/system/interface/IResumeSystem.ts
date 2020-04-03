module ecs {
	/**
	 * 生命周期恢复
	 */
	export interface IResumeSystem extends ISystem {
		resume();
	}
}