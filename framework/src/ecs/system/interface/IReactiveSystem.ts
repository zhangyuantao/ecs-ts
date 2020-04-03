module ecs {
	/**
	 * 响应式系统，收集感兴趣的entities
	 */
	export interface IReactiveSystem extends ISystem {
		activate();
		deactivate();
		clear();
		execute(entities:IEntity[]);
	}
}