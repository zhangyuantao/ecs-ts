module ecs {
	export interface IReactiveSystem extends ISystem {
		activate();
		deactivate();
		clear();
		execute(entities:IEntity[]);
	}
}