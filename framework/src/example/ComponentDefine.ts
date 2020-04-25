module ecs.example {
	export enum Components {
		MoveComponent,
		Length
	}

	export interface IMoveComponent extends IComponent {
		x: number;
		y: number;
		rotation: number;
	}
}