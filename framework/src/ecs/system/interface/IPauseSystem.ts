module ecs {
	/**
	 * 生命周期暂停/恢复
	 */
	export interface IPauseSystem extends ISystem {
		pause();
		resume();
	}
}