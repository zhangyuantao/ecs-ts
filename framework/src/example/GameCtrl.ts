module ecs.example {
	/**
	 * 创建、管理所有系统
	 * Created by zhangyt
	 */
	export class GameCtrl {
		private systems: Systems;
		private isPaused: boolean;
		private updatePauseEnable: boolean;
		private lastUpdateTime: number = 0;

		/**
		 * @param updatePauseEnable update是否开启暂停
		 * @param fixedUpdateTime fixedUpdat频率
		 */
		public constructor(ctxs: Contexts, updatePauseEnable: boolean = false, fixedUpdateTime: number = 20) {
			let self = this;
			self.updatePauseEnable = updatePauseEnable;
			self.systems = new Systems(fixedUpdateTime);
		}

		public addSystem(sys: ISystem) {
			let self = this;
			self.systems.add(sys);
		}

		public initialize() {
			let self = this;
			self.systems.init();
		}

		public update(timestamp: number) {
			let self = this;
			let dt = timestamp - (self.lastUpdateTime || timestamp);
			self.lastUpdateTime = timestamp;

			if (!self.isPaused || !self.updatePauseEnable) {
				self.systems.update(dt);
				self.systems.lateUpdate();
			}
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
			self.systems.destroy();
			self.systems = null;
		}
	}
}