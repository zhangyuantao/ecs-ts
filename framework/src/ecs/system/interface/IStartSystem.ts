module ecs {
	/**
	 * 执行初始化工作
	 * 所有AwakeSystem执行完后执行
	 */
	export interface IStartSystem extends ISystem {
		start();
	}
}