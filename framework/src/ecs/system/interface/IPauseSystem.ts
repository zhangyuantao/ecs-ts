module ecs {
	/**
	 * 生命周期暂停
	 */
	export interface IPauseSystem extends ISystem {
		pause();
	}
}