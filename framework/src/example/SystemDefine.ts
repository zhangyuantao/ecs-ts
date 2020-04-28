module ecs.example {

	export class MoveSystem implements IInitializeSystem, IUpdateSystem {
		/**
		 * name
		 */
		public move() {


		}

		/** implements */

		public awake() {
			console.log("awake");
		}

		public start() {
			console.log("start");
		}

		public fixedUpdate(dt: number) {
			console.log("fixedUpdate:", dt);
		}

		public update(dt: number) {
			console.log("update:", dt);
		}
	}
}