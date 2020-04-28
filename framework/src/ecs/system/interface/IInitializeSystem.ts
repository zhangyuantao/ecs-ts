module ecs {
	/**
	 * 系统初始化工作
	 */
	export interface IInitializeSystem extends ISystem {
		awake();

		/**所有系统是awake执行完后执行 */
		start();
	}
}