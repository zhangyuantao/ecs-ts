module ecs {
	/**
	 * 上下文
	 * 管理实体，组件, 组
	 */
	export class Context {
		// 自增实体id
		private entityID: number = 0;

		// 实体集合	
		private entities: number[];

		// 组件缓存池
		private componentPool: Array<Array<IComponent>>;

		// 实体拥有的组件，key:实体id value:组件列表		 
		private entityComponents: { [key: number]: Array<IComponent> };

		// 组件数量
		private totalComponents: number;

		public constructor(totalComponents: number) {
			let self = this;
			self.entityID = 0;
			self.totalComponents = totalComponents;
			self.componentPool = [];
			self.entities = [];
			self.entityComponents = {};
		}

		public destroy() {
			let self = this;
			self.entities = null;
			self.entityComponents = null;
			self.componentPool = null;
		}

		/** Entity */

		/**
		 * 创建一个实体
		 */
		public createEntity() {
			let self = this;
			let id = self.entityID++;
			self.entities.push(id);
			return id;
		}

		/**
		 * 移除某个实体
		 */
		public removeEntity(entity: number) {
			let self = this;
			let idx = self.entities.indexOf(entity);
			if (idx != -1) {
				self.entities.splice(entity, 1);
				self.removeComponents(entity); // 移除它的组件列表
			}
			return self;
		}

		/** Component */

		// 获取指定类型组件，返回第一个匹配组件
		public getComponent(entity: number, index: number): IComponent {
			let self = this;
			let coms = self.getComponentList(entity);
			return coms[index];
		}

		// 获取指定类型组件所有存在组件
		public getComponents(entity: number): IComponent[] {
			let self = this;
			let result = [];
			let coms = self.getComponentList(entity);
			for (let i = 0; i < coms.length; i++) {
				coms[i] && result.push(coms[i]);
			}
			return result;
		}

		// 获取组件列表
		public getComponentList(entity: number): IComponent[] {
			let self = this;
			return self.entityComponents[entity] || [];
		}

		// 获取组件列表
		public clearComponentList(entity: number) {
			let self = this;
			self.entityComponents[entity] = null;
		}

		/**
		 * 实体添加组件
		 * 每个实体都是唯一的index
		 */
		public addComponent(entity: number, index: number, newFunc: Function) {
			let self = this;
			if (!self.entityComponents[entity])
				self.entityComponents[entity] = new Array<IComponent>(self.totalComponents);
			let com = self.createComponent(index, newFunc);
			self.getComponentList(entity)[index] = com;
			return self;
		}

		private createComponent(index: number, newFunc: Function) {
			let self = this;
			let cache = self.getComponentPool(index).pop();
			if (cache) return cache;
			else return newFunc();
		}

		// 获取某组件的缓存池
		private getComponentPool(index: number) {
			let self = this;
			let pool = self.componentPool[index];
			if (!pool) {
				pool = new Array<IComponent>();
				self.componentPool[index] = pool;
			}
			return pool;
		}

		// 移除实体的指定组件
		public removeComponent(entity: number, index: number) {
			let self = this;
			let coms = self.getComponentList(entity);
			let existCom = coms[index];
			if (existCom) {
				coms[index] = null;
				self.getComponentPool(index).push(existCom);
			}
			return self;
		}

		// 移除实体上的所有组件
		public removeComponents(entity: number) {
			let self = this;
			let coms = self.getComponentList(entity);
			for (let i = 0; i < coms.length; i++) {
				self.removeComponent(entity, i);
			}
			self.clearComponentList(entity);
			return self;
		}

		/**
		 * 实体是否包含任一指定组件
		 */
		public hasAnyComponent(entity: number, indices: number[]) {
			let self = this;
			let coms = self.getComponentList(entity);
			for (let i = 0; i < indices.length; i++) {
				if (coms[indices[i]]) return true;
			}
			return false;
		}

		/**
		 * 实体是否拥有这些组件
		 */
		public hasComponents(entity: number, indices: number[]) {
			let self = this;
			let coms = self.getComponentList(entity);
			for (let i = 0; i < indices.length; i++) {
				if (!coms[indices[i]]) return false;
			}
			return true;
		}

		/**
		 * 实体是否拥有某个这些组件
		 */
		public hasComponent(entity: number, index: number) {
			let self = this;
			let coms = self.getComponentList(entity);
			if (coms[index]) return true;
			return false;
		}
	}
}