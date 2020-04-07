module ecs {
	/**
	 * ECS框架上下文，实体与系统的管理
	 * Created by zhangyt
	 */
	export class World {
		public static instances: { [key: string]: World };
		public static active: string;

		public name: string;
		private entityMgr: EntityManager;
		private systemMgr: SystemManager;
		private isPaused: boolean;

		public constructor(name: string, maxComponents: number = 1000, fixedUpdateTime: number = 20) {
			let self = this;
			if (!World.instances)
				World.instances = {};
			if (!name || name == "")
				throw "invalid world name:" + name;
			if (World.instances[name])
				throw "World:" + name + " already existed.";
			World.instances[name] = self;

			self.name = name;
			self.entityMgr = new EntityManager(maxComponents);
			self.systemMgr = new SystemManager(fixedUpdateTime);
		}

		public static getInstance(name: string) {
			return World.instances[name];
		}

		public static getActive() {
			let name = World.active;
			if (!name) {
				for (let key in World.instances) {
					name = key;
					break;
				}
			}
			return World.getInstance(name);
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
			World.instances = null;
		}
	}
}