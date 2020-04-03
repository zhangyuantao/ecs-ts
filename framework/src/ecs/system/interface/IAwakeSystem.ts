module ecs {
	/**
	 * 系统首次初始化工作
	 */
	export interface IAwakeSystem extends ISystem {
		awake();
	}
}