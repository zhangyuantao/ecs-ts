module ecs {
	/**
	 * 系统管理
	 * Created by zhangyt
	 */
	export class Systems {
		private initSystems: Array<IInitializeSystem>;
		private updateSystems: Array<IUpdateSystem>;
		private lateUpdateSystems: Array<ILateUpdateSystem>;
		private pauseSystems: Array<IPauseSystem>;
		private destroySystems: Array<IDestroySystem>;
		private fixedUpdateTime: number = 0;
		private simulationTime: number = 0;
		private fixedSimulationTime: number = 0;

		public constructor(fixedUpdateTime: number) {
			let self = this;
			self.fixedUpdateTime = fixedUpdateTime;
			self.initSystems = new Array<IInitializeSystem>();
			self.updateSystems = new Array<IUpdateSystem>();
			self.lateUpdateSystems = new Array<ILateUpdateSystem>();
			self.pauseSystems = new Array<IPauseSystem>();
			self.destroySystems = new Array<IDestroySystem>();
		}

		public add(sys: ISystem) {
			let self = this;
			let initSys = isImplement(sys, "awake");
			if (initSys) self.initSystems.push(initSys);

			let updateSys = isImplement(sys, "update");
			if (updateSys) self.updateSystems.push(updateSys);

			let lateUpdateSys = isImplement(sys, "lateUpdate");
			if (lateUpdateSys) self.lateUpdateSystems.push(lateUpdateSys);

			let pauseSys = isImplement(sys, "pause");
			if (pauseSys) self.pauseSystems.push(pauseSys);

			let destroySys = isImplement(sys, "destroy");
			if (destroySys) self.destroySystems.push(destroySys);

			return self;
		}

		public init() {
			let self = this;
			for (let i = 0; i < self.initSystems.length; i++)
				self.initSystems[i].awake();

			// 所以awake执行完后执行start
			for (let i = 0; i < self.initSystems.length; i++)
				self.initSystems[i].start();
		}

		public update(dt: number) {
			let self = this;
			self.simulationTime += dt;

			for (let i = 0; i < self.updateSystems.length; i++) {
				let sys = self.updateSystems[i];

				// fixedUpdate
				while (self.fixedSimulationTime < self.simulationTime) {
					self.fixedSimulationTime += self.fixedUpdateTime;
					sys.fixedUpdate(self.fixedUpdateTime);
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
			for (let i = 0; i < self.pauseSystems.length; i++)
				self.pauseSystems[i].resume();
		}

		public destroy() {
			let self = this;
			for (let i = 0; i < self.destroySystems.length; i++)
				self.destroySystems[i].destroy();
		}
	}

	/**
	 * Retuns the object if it implements the interface, else null
	 */
	let isImplement = (object, method: string) => {
		return method in object ? object : null;
	}
}