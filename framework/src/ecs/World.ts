module ecs {
	/**
	 * ECS框架上下文，实体与系统的管理
	 * Created by zhangyt
	 */
	export class World {
		public static instances: { [key: string]: World };
		public static active: string;

		public name: string;
		private ctx: Context;
		private sys: Systems;
		private isPaused: boolean;
		private updatePauseEnable: boolean;
		private lastUpdateTime: number = 0;

		/**
		 * @param name 取个名字
		 * @param updatePauseEnable update是否开启暂停
		 * @param fixedUpdateTime fixedUpdat频率
		 * @param maxComponents 最大组件数
		 */
		public constructor(name: string, updatePauseEnable: boolean = false, fixedUpdateTime: number = 20, maxComponents: number = 1000) {
			let self = this;
			if (!World.instances)
				World.instances = {};
			if (!name || name == "")
				throw "invalid Context name:" + name;
			if (World.instances[name])
				throw "Context:" + name + " already existed.";
			World.instances[name] = self;

			self.name = name;
			self.updatePauseEnable = updatePauseEnable;
			self.ctx = new Context(maxComponents);
			self.sys = new Systems(fixedUpdateTime);
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

		public get context() {
			let self = this;
			return self.ctx;
		}

		public get systems() {
			let self = this;
			return self.sys;
		}

		public initialize() {
			let self = this;
			self.sys.init();
		}

		public update(timestamp: number) {
			let self = this;
			let dt = timestamp - (self.lastUpdateTime || timestamp);
			self.lastUpdateTime = timestamp;

			if (!self.isPaused || !self.updatePauseEnable) {
				self.sys.update(dt);
				self.sys.lateUpdate();
			}
		}

		public pause() {
			let self = this;
			self.isPaused = true;
			self.sys.pause();
		}

		public resume() {
			let self = this;
			self.isPaused = false;
			self.sys.resume();
		}

		public destroy() {
			let self = this;
			self.ctx.destroy();
			self.sys.destroy();
			self.ctx = null;
			self.sys = null;
			World.instances = null;
		}
	}
}