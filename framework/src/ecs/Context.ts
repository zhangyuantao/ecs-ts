module ecs {
	/**
	 * ECS框架上下文，实体与系统的管理
	 * Created by zhangyt
	 */
	export class Context {
		public static instance: Context;
		private entityMgr: EntityManager;
		private systemMgr: SystemManager;
		private isPaused: boolean;

		public constructor(maxComponents: number = 1000, fixedUpdateTime: number = 20) {
			if (Context.instance)
				throw "Context already instanced.";
			let self = this;
			self.entityMgr = new EntityManager(maxComponents);
			self.systemMgr = new SystemManager(fixedUpdateTime);
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

		public update(timestamp: number) {
			let self = this;
			if (self.isPaused)
				return;

			self.systems.update(timestamp);
			self.systems.lateUpdate();
		}

		public pause() {
			let self = this;
			self.isPaused = true;
			self.systems.pause();
		}

		public resume() {
			let self = this;
			self.isPaused = false;
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