module ecs.example {
	/**
	 * 管理所有上下文
	 */
	export class Contexts {
		public static instance: Contexts;
		public game: Context;

		public static getInstance() {
			if (!Contexts.instance)
				Contexts.instance = new Contexts();
			return Contexts.instance;
		}

		public constructor() {
			let self = this;
			self.game = new Context(Components.Length);
		}

		public destroy() {
			let self = this;
			self.game.destroy();
			self.game = null;
			Contexts.instance = null;
		}
	}
}