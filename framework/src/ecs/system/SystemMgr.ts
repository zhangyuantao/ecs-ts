module ecs {
	export class SystemManager {
		public readonly FixedUpdateTime: number = 20;

		private awakeSystems: Array<IAwakeSystem>;
		private startSystems: Array<IStartSystem>;
		private updateSystems: Array<IUpdateSystem>;
		private lateUpdateSystems: Array<ILateUpdateSystem>;
		private pauseSystems: Array<IPauseSystem>;
		private resumeSystems: Array<IResumeSystem>;
		private destroySystems: Array<IDestroySystem>;

		private lastUpdateTime: number = 0;
		private fixedSimulationTime: number = 0;

		public constructor() {
			let self = this;
			self.awakeSystems = new Array<IAwakeSystem>();
			self.startSystems = new Array<IStartSystem>();
			self.updateSystems = new Array<IUpdateSystem>();
			self.lateUpdateSystems = new Array<ILateUpdateSystem>();
			self.pauseSystems = new Array<IPauseSystem>();
			self.resumeSystems = new Array<IResumeSystem>();
			self.destroySystems = new Array<IDestroySystem>();
		}

		public add(sys: ISystem) {
			let self = this;
			let awakeSys = sys as IAwakeSystem;
			if (awakeSys) self.awakeSystems.push(awakeSys);

			let startSys = sys as IStartSystem;
			if (startSys) self.startSystems.push(startSys);

			let updateSys = sys as IUpdateSystem;
			if (updateSys) self.updateSystems.push(updateSys);

			let lateUpdateSys = sys as ILateUpdateSystem;
			if (lateUpdateSys) self.lateUpdateSystems.push(lateUpdateSys);

			let pauseSys = sys as IPauseSystem;
			if (pauseSys) self.pauseSystems.push(pauseSys);

			let resumeSys = sys as IResumeSystem;
			if (resumeSys) self.resumeSystems.push(resumeSys);

			let destroySys = sys as IDestroySystem;
			if (destroySys) self.destroySystems.push(destroySys);

			return self;
		}

		public awake() {
			let self = this;
			for (let i = 0; i < self.awakeSystems.length; i++)
				self.awakeSystems[i].awake();
		}

		public start() {
			let self = this;
			for (let i = 0; i < self.startSystems.length; i++)
				self.startSystems[i].start();
		}

		public update(timestamp: number) {
			let self = this;
			if (!self.lastUpdateTime)
				self.lastUpdateTime = timestamp;
			let dt = timestamp - self.lastUpdateTime;
			self.lastUpdateTime = timestamp;

			for (let i = 0; i < self.updateSystems.length; i++) {
				let sys = self.updateSystems[i];

				// fixedUpdate
				while (self.fixedSimulationTime < timestamp) {
					self.fixedSimulationTime += self.FixedUpdateTime;
					sys.fixedUpdate(dt);
				}

				sys.update(dt);
			}
		}

		public lateUpdate() {
			let self = this;
			for (let i = 0; i < self.lateUpdateSystems.length; i++)
				self.lateUpdateSystems[i].lateUpdate();
		}

		public pause() {
			let self = this;
			for (let i = 0; i < self.pauseSystems.length; i++)
				self.pauseSystems[i].pause();
		}

		public resume() {
			let self = this;
			for (let i = 0; i < self.resumeSystems.length; i++)
				self.resumeSystems[i].resume();
		}

		public destroy() {
			let self = this;
			for (let i = 0; i < self.destroySystems.length; i++)
				self.destroySystems[i].destroy();
		}
	}
}