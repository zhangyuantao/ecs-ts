module ecs {
	/**
	 * ECS框架上下文，实体与系统的管理
	 */
	export class Context {
		public static instance: Context;

		private entityMgr: EntityManager;
		private systemMgr: SystemManager;

		public constructor() {
			if (Context.instance)
				throw "Context already instanced.";
			let self = this;
			self.entityMgr = new EntityManager();
			self.systemMgr = new SystemManager();
			Context.instance = self;
		}

		public get entities() {
			let self = this;
			return self.entityMgr;
		}

		public get systems() {
			let self = this;
			return self.systemMgr;
		}

		public initialize() {
			let self = this;
			self.systems.awake();
			self.systems.start();
		}

		public update(timeStamp: number) {
			let self = this;
			self.systems.update(timeStamp);
			self.systems.lateUpdate();
		}

		public pause() {
			let self = this;
			self.systems.pause();
		}

		public resume() {
			let self = this;
			self.systems.resume();
		}

		public destroy() {
			let self = this;
			self.entityMgr.destroy();
			self.systemMgr.destroy();
			self.entityMgr = null;
			self.systemMgr = null;
			Context.instance = null;
		}
	}
}